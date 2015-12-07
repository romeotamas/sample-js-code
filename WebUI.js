//WebUI.js
    
    
    if (!Function.prototype.override)
    {
        Function.prototype.override = function(func)
        {
            var superFunction = this;
            return function()
            {
                this.superFunction = superFunction;
                return func.apply(this,arguments);
            };
        }
    }
    
    
    WebUI;
    WebUI.WebUIElements = [];
    WebUI.listeners = {};
    
    function WebUI(params)
    {
        var self        = this;
        var params      = params ? params : {};
        var container   = params.container ? params.container : undefined;
        
        this.WebUIInst      = [];
        
        this.getBaseWeb     = function()
        {
            return $('<div />', {id:"appElems", class:"appClass", html:self.getDOMElements()});
        }
        this.getDOMElement     = function(index)
        {
            return WebUI.WebUIElements[index];
        }
        this.getDOMElements     = function()
        {
            return WebUI.WebUIElements;
        }
        this.setDOMElements     = function(obj)
        {
            WebUI.WebUIElements.push(obj);
            //dispatch change
            this.dispatch("onCreate", obj);
        }
        this.updateDOMElements     = function(index, obj)
        {
            WebUI.WebUIElements[index] = obj;
            //dispatch change
            this.dispatch("onUpdate", obj);
        }
        this.removeDOMElements     = function(index)
        {
            var obj = WebUI.WebUIElements[index];
            delete WebUI.WebUIElements[index];
            //dispatch change
            this.dispatch("onRemove", obj);
        }
        var elementsCount      = function()
        {
            return WebUI.WebUIElements.length - 1;
        }
        this.alter  = function(index, newtitle)
        {
            obj = this.getDOMElement(index);
            obj.html(newtitle);
            this.update(index, obj);
        }
        this.getNextId          = function()
        {
            return elementsCount() + 1;
        }
        
        //WebUI Factory
        this.set    = function(obj)
        {
            this.setDOMElements(obj);
        }
        this.get                = function(id)
        {
            return this.getDOMElement(id);
        }
        this.update             = function(index, obj)
        {
            this.updateDOMElements(index, obj);
        }
        this.remove             = function(index)
        {
            this.removeDOMElements(index);
        }
        
        //WebUI Emiters/Listeners
        this.dispatch           = function(type, params)
        {
            var listeners = WebUI.listeners;
            if(!listeners[type])
            {
                return;
            }
            var methods = listeners[type];
            for(var i in methods)
            {
                if(methods[i])
                {
                    methods[i]({type:type, emitter:self, data:params});
                }
            }
        }
        this.addListener        = function(type, method)
        {
            var listeners = WebUI.listeners;
			if (!listeners[type])
			{
				listeners[type]	= [];
			}
            listeners[type].push(method);
        }
        this.getListeners       = function()
        {
            return WebUI.listeners;
        }
        
        /* Style */
        this.changeBgColor      = function(color)
        {
            container.css("background-color", color);
            container.css("padding", "30px");
            container.css("color", "#FFf");
        }
        
        
        var init                = function()
        {
            
        }
        
        this.create             = function()
        {
            //.... overided .....
        }
        
        init();
        
        WebUI.render        = function()
        {
            return self.getBaseWeb();
        }
    }
    
    function H3(title)
    {
        var self = this;
        WebUI.call(this);
        this.id = this.getNextId();
        
        this.create = this.create.override(function()
        {
            var obj = $("<h3 />", {class:"Elem" + this.id, html:title});
            this.set(obj);
        });
        this.getId      = function()
        {
            return self.id;
        }
        
        this.create();
        
    }
    
    function H1(title)
    {
        var self = this;
        WebUI.call(this);
        this.id = this.getNextId();
        
        this.create = this.create.override(function()
        {
            var obj = $("<h1 />", {class:"Elem" + this.id, html:title});
            this.set(obj);
        });
        this.getId      = function()
        {
            return self.id;
        }
        
        this.create();
        
    }
    
    function App(params)
    {
        var self        = this;
        var params      = params ? params : {};
        var container   = params.container ? params.container : undefined;
        var visitors      = {};
        
        WebUI.call(this, params);
        
        this.setVisitor         = function(visitor, key)
        {
            if(visitor && visitor.visit)
            {
                if(!visitors[key])
                {
                    visitors[key] = [];
                }
                visitors[key].push(visitor);
                visitor.visit(self);
            }
        }
        
        this.getContainer       = function()
        {
            return container;
        }
        
        var defineEvents        = function()
        {

        }
        
        /* prototype */
        H1.prototype.alterTitle = function(index, newtitle)
        {
            this.alter(index, newtitle);
        }
        H1.prototype.remove     = function(index)
        {
            this.remove(index);
        }
        H3.prototype.alterTitle = function(index, newtitle)
        {
            this.alter(index, newtitle);
        }
        
        var runApp        = function()
        {
            
            var h1_1 = new H1("Hello");
            setTimeout(function(){ h1_1.alterTitle(h1_1.getId(), "Hello World"); }, 2000);
            
            var h3 = new H3("See the world bellow ...");
            setTimeout(function(){ h3.alterTitle(h3.getId(), "See nothing ..."); }, 4000);
            
            var h1_2 = new H1("Hello!!!");
            var h1_3 = new H1("Word!!!");
            
            setTimeout(function(){
                h1_3.remove(h1_3.getId()); 
            }, 6000);
            
            defineEvents();

        }
        
        this.renderApp        = function(_container)
        {
            if(!container)
            {
                container = _container;
            }
            container.empty();
            return WebUI.render();
        }
        
        runApp();
    }
