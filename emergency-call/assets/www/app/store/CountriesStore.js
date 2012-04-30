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
            timeout: 60000,
            reader: {
            	type:'json'
            }
        }
    },
    
    doDataRefresh: function(store, data, operation) {
        var records = operation.getRecords(),
            me = this,
            ln = records.length,
            i;

        // We are joining the records we are going to add to a temp fake store so that
        // when we call removeAll they are not being destroyed.
        for (i = 0; i < ln; i++) {
            if(records[i]){
                records[i].join('_temp');
            }
        }

        if (operation.getAddRecords() !== true) {
            this.removeAll(true);
            // This means we have to fire a clear event though
            me.fireEvent('clear', this);
        }

        if (records && records.length) {
            // Now lets add the records without firing an addrecords event
            me.suspendEvents();
            me.add(records);
            me.resumeEvents();
        }

        for (i = 0; i < ln; i++) {
            if(records[i]){
                records[i].unjoin('_temp');
            }
        }

        this.fireEvent('refresh', this, this.data);
    }
});

