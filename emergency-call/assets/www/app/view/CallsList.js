Ext.define("EmergencyCall.view.CallsList", {
    extend: "Ext.dataview.List",
    alias: "widget.callslist",
    config: {
        loadingText: "Loading emergency calls...",
        emptyText: "<div class=\"x-mask\"> No emergency calls found, please select a country.</div>",
        cls: "x-list-calls",
        itemTpl: "<div class=\"list-item-calls-title {type}\"/>",
        singleSelect: true
    }
});