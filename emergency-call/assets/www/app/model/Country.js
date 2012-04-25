Ext.define("EmergencyCall.model.Country", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'string' },
            { name: 'label', type: 'string' }
        ],
        associations: [
           {type: 'hasMany', model: 'EmergencyCall.model.Call', name: 'calls'}
        ]
    }
});