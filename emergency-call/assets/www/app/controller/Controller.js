Ext.define("EmergencyCall.controller.Controller", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            callsListContainer: "callslistcontainer",
            countriesListContainer: "countrieslistcontainer",
            countriesList: "countrieslist"
        },
        control: {
            callsListContainer: {
                configCommand: "onConfigCommand",
                callCommand: "onCallCommand",
                countryChangedCommand: "onCountryChangedCommand"
            },
            countriesListContainer: {
                saveConfigCommand: "onSaveConfigCommand",
                homeCommand: "onHomeCommand",
                activateListCommand: "activateListCommand"
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
        Ext.Viewport.setActiveItem(this.getCountriesListContainer());
    },
    
    activateCallsList: function (country) {
        console.log("activateCallsList");
        this.onCountryChangedCommand(this.getCallsListContainer(), country);
        Ext.Viewport.setActiveItem(this.getCallsListContainer());
    },

    // Commands.
    onConfigCommand: function () {
        console.log("onConfigCommand");
        this.activateListCommand();
        this.activateCountriesList(); 
    },
    
    activateListCommand: function () {
        console.log("activateListCommand ");
        var list = this.getCountriesList();
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
            list.countryButton.setText('Options');
            list.countryButton.setIcon('resources/images/cog.png');
        }
    },
    onHomeCommand: function () {
        console.log("onHomeCommand");
        Ext.Viewport.setActiveItem(this.getCallsListContainer());
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