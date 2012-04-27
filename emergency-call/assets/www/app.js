Ext.Loader.setConfig('disableCaching',false);

Ext.application({
    name: "EmergencyCall",
    models: ["Call", "Country"],
    stores: ["CallsStore", "CountriesStore"],
    controllers: ["Controller"],
    views: ["CallsList", "CallsListContainer", "CountriesList", "CountriesListContainer"],
    
    
    launch: function () {
        var country;
        var storedCall = Ext.getStore("CallsStore").getAt(0);
        
        if(storedCall && storedCall.data){
            country = {"id": storedCall.data.country_id, 
                        "label": storedCall.data.country_label};
        }

        var callsListContainer = {
            xtype: "callslistcontainer",
            country: country
        };
       
        var countriesListContainer = {
            xtype: "countrieslistcontainer",
        };
        
        Ext.Viewport.add([callsListContainer, countriesListContainer]);
        
        if(!country){
            Ext.Viewport.setActiveItem(1);
        }
    }
});