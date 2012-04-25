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
    }
});