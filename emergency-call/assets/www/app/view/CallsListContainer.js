Ext.define("EmergencyCall.view.CallsListContainer", {
    extend: "Ext.Container",   
    alias: "widget.callslistcontainer",
    countryButton: undefined,
    
    initialize: function () {

        this.callParent(arguments);
        
        var countryIcon;
        var countryLabel;

        this.countryButton = new Ext.Button({
            xtype: "button",
            ui: 'action',
            autoHeight : false,
            height : 32,
            iconCls : 'country-flag',
            handler: this.onConfig,
            scope: this
        });
        
        var topToolbar = {
            xtype: "toolbar",
            title: 'eCall',
            docked: "top"
        };
        
        var bottomToolbar = {
                xtype: "toolbar",
                docked: "bottom",
                items: [{ xtype: "spacer" },
                        this.countryButton]
            };
        
        var callsList = {
            xtype: "callslist",
            store: Ext.getStore("CallsStore"),
            listeners: {
                itemtap: { fn: this.onCallSelected, scope: this },
            }
        };
        
        this.fireEvent('countryChangedCommand', this, this.config.country);
        this.add([topToolbar, callsList, bottomToolbar]);
    },
    onConfig: function () {
        console.log("configCommand");
        this.fireEvent("configCommand", this);
    },
    onCallSelected: function (list, index, target, record, evt, options) {
        console.log("callCommand");
        this.fireEvent('callCommand', this, record);
        list.deselect(record);
    },
    config: {
        fullscreen: true,
        layout: 'fit'
    }
});