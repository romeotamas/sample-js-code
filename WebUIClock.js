//WebUIClock.js

    function WebUIClock(params)
    {
        var self            = this;
        var params          = params ? params : {};
        var webUIInst;
        
        var container;
        var clock;
        
        var millisec = 0;
        var seconds = 0;
        var timer;
        
        this.visit          = function(_inst)
        {
            webUIInst = _inst;
            container = webUIInst.getContainer();
            clock = $('<div />', {id:"clock"});
            container.append(clock);
        }
        
        var display         = function()
        {
            if (millisec>=9)
            {
                millisec=0
                seconds+=1
            }
            else
            {
                millisec+=1
            }
            clock.html(seconds + "." + millisec);
            timer = setTimeout(display, 100);
        }
        
        var starttimer          = function()
        {
            if (timer > 0) {
                return;
            }
            display();	
        }
        
        var stoptimer           = function()
        {
            clearTimeout(timer);
            timer = 0;
        }
        
        this.startstoptimer      = function()
        {
            if (timer > 0) {
                clearTimeout(timer);
                timer = 0;
            } else {
                display();
            }
        }
        
        var resettimer          = function()
        {
            stoptimer();
            millisec = 0;
            seconds = 0;
        }
        
        var init                = function()
        {
        }
        
        init();
    }
