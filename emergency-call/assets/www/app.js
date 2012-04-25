Ext.application({
    name: "EmergencyCall",
    models: ["Call", "Country"],
    stores: ["CallsStore", "CountriesStore"],
    controllers: ["Controller"],
    views: ["CallsList", "CallsListContainer", "CountriesList"],

    launch: function () {
        //Get the stored country
        var country;
        var storedCall = Ext.getStore("CallsStore").getAt(0);
        
        if(storedCall && storedCall.data){
            country = {"id": storedCall.data.country_id, 
                        "label": storedCall.data.country_label};
        }
        console.log("init country " + country);
        var callsListContainer = {
            xtype: "callslistcontainer",
            country: country
        };
       
        var countriesList = {
            xtype: "countrieslist",
        };
        
        Ext.Viewport.add([callsListContainer, countriesList]);
        
        if(!country){
            Ext.Viewport.setActiveItem(1);
        }
    }
});