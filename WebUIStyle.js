//WebUIStyle.js

    function WebUIStyle(params)
    {
        var self                = this;
        var params              = params ? params : {};
        var _init               = params.init ? true : false;
        var _color              = params.color ? params.color : false;
        var webUIInst;
        
        
        
        this.visit              = function(_inst)
        {
            webUIInst = _inst;
        }
        
        this.changeStyle        = function(color)
        {
            webUIInst.changeBgColor(color);
        }
        
        var init                = function()
        {
            if(_init)
            {
                this.changeStyle(_color);
            }
        }
        
        init();
    }
