Package.describe({
    summary: "Minimal modal / pop-up module for Meteor"
});

Package.on_use(function(api) {
    
    api.use('standard-app-packages');
    
    api.export('Modal','client');
    
    api.add_files([
        'client/views/modal.html',
        'client/views/modal.js'
        
    ],'client');
    
});