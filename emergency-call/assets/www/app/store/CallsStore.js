Ext.define('EmergencyCall.store.CallsStore', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    config: {
        model: 'EmergencyCall.model.Call',
        storeId:'CallsStore',
        proxy: {
            type: 'localstorage',
            id: 'CallsStoreProxy'
        },
        autoLoad: true
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
            }else{
                console.log('Found null record')
                return;
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
            records[i].unjoin('_temp');
        }

        this.fireEvent('refresh', this, this.data);
    }
});