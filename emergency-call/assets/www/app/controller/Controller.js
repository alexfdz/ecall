Ext.define("EmergencyCall.controller.Controller", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            callsListContainer: "callslistcontainer",
            countriesList: "countrieslist"
        },
        control: {
            callsListContainer: {
                // The commands fired by the calls list container.
                configCommand: "onConfigCommand",
                callCommand: "onCallCommand",
                countryChangedCommand: "onCountryChangedCommand"
            },
            countriesList: {
                // The commands fired by the config editor.
                saveConfigCommand: "onSaveConfigCommand",
                homeCommand: "onHomeCommand",
                activateCommand: "onActivateCommand"
            }

        }
    },
    
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    
    slideRightTransition: { type: 'slide', direction: 'right' },
    
    // Helper functions
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    activateCountriesList: function () {
        Ext.Viewport.setActiveItem(this.getCountriesList());
    },
    
    activateCallsList: function (country) {
        this.onCountryChangedCommand(this.getCallsListContainer(), country);
        Ext.Viewport.setActiveItem(this.getCallsListContainer());
    },

    // Commands.
    onConfigCommand: function () {
        console.log("onConfigCommand");
        this.activateCountriesList(); 
    },
    
    onActivateCommand: function (list) {
        console.log("onActivateCommand ");
        if(!list.getStore()){
            list.setStore(Ext.getStore("CountriesStore"));
            list.getStore().load();
        }
    },
    
    onCallCommand: function (list, record) {
        console.log("onCallCommand");
        window.location = "tel:"+ record.get('phone');
    },
    
    onSaveConfigCommand: function (list, record) {
        console.log("onSaveConfigCommand");
        var calls = record.raw.calls;
        var call;
        if(calls != undefined){
            var callsStore = Ext.getStore("CallsStore");
            callsStore.removeAll();
            for(index in calls){
            	call = calls[index];
            	callsStore.add({"type":call.type,"label":call.label,
            	    "phone":call.phone, "country_id": record.raw.id, 
            	    "country_label": record.raw.label});
            }
            callsStore.sync();
        }
        this.activateCallsList({"id": record.raw.id, 
            "label": record.raw.label});
    }, 
    
    onCountryChangedCommand: function (list, country) {
        console.log("onCountryChangedCommand");
        if(country){
            var label = country.label;
            if(label.length > 15){
                label = label.substr(0,14) + '...';
            }
            list.countryButton.setText(label);
            list.countryButton.setIcon('resources/images/flags/' + 
                    country.id + '.png');
            list.countryButton.show();
        }else{
            list.countryButton.hide();
        }
    },
    onHomeCommand: function () {
        console.log("onHomeCommand");
        this.activateCallsList();
    }, 

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        Ext.StoreManager.lookup('CallsStore').load();
        console.log("launch");
    },
    
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});