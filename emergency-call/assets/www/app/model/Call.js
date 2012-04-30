Ext.define("EmergencyCall.model.Call", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'type',
        fields: [
            { name: 'type', type: 'string' },
            { name: 'label', type: 'string' },
            { name: 'phone', type: 'string' },
            { name: 'country_id', type: 'string' },
            { name: 'country_label', type: 'string' }
        ]
    }
});