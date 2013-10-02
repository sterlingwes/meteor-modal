Modal = (function() {
    
    var modalBg,
        wrapped = [],
        options = {
            clickClass: 'showModal'
        };
    
    function modalClose() {
        Session.set('modal',undefined);
    }
    
    function modalClickHandler(evt) {
        var el;
        if(evt.currentTarget)   el = $(evt.currentTarget);
        else {
            el = $(evt.target);
            if(!el.hasClass(options.clickClass))
                el = el.closest(options.clickClass);
        }
        
        var tpl = el.data('modal');
        if(tpl) Session.set('modal',tpl);
        else    console.warn('Modal click handler had no template data', evt);
    }
    
    function setupModalBg() {
        modalBg = $('#modal-fade');
        if(!modalBg.length) {
            modalBg = $('<div/>').attr('id','modal-fade').appendTo('body');
        }
        modalBg.on('click', modalClose);
    }
    
    function wrapTemplate(name,helpers) {
        if(!Template[name]) return console.error('No template found named '+name);
        if(wrapped.indexOf(name)!==-1) return;
        if(!helpers)    helpers = {};
        
        Template[name].created = function() {
            if(!modalBg || (modalBg.length && !jQuery.contains(document.documentElement, modalBg[0]))) {
                setupModalBg();
            }
                
            modalBg.addClass('open');
            
            if(typeof helpers.created === "function")
                helpers.created.apply(this, arguments);
        };
        
        Template[name].destroyed = function() {
            if(modalBg) {
                modalBg.removeClass('open');
            }
        };
    }
    
    return {
        template:   wrapTemplate,
        
        showModal:  modalClickHandler,
        
        close:      modalClose
    };
    
})();

Modal.template('modal');