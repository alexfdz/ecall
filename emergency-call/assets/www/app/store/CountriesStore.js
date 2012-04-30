Ext.define("EmergencyCall.store.CountriesStore", {
    extend: "Ext.data.Store",
    config: {
        model: "EmergencyCall.model.Country",
        storeId:'CountriesStore',
        sorters: 'label',
        autoLoad: false,
        noCache: false,
        proxy: {
            type: 'ajax',
            url: 'app/store/countries.json',
            noCache: false,
            enablePagingParams: false,
            reader: {
            	type:'json'
            },
            masked: {
                xtype: 'loadmask',
                message: 'My message',
                indicator: false
            }
        },
        masked: {
            xtype: 'loadmask',
            message: 'My message',
            indicator: false
        }
    }
});

