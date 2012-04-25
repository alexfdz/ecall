Ext.define("EmergencyCall.store.CountriesStore", {
    extend: "Ext.data.Store",
    config: {
        model: "EmergencyCall.model.Country",
        storeId:'CountriesStore',
        sorters: 'label',
        autoLoad: false,
        grouper: {
           groupFn: function(record) {
               return record.get('label')[0];
           }
        },
        proxy: {
            type: 'ajax',
            url: 'app/store/countries.json'
        }
    }
});

