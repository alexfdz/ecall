Ext.define("EmergencyCall.view.CallsList", {
    extend: "Ext.dataview.List",
    alias: "widget.callslist",
    config: {
        loadingText: "Loading emergency calls...",
        emptyText: "<div class=\"notes-list-empty-text\">No calls found.</div>",
        cls: "x-list-calls",
        itemTpl: "<div class=\"list-item-calls-title {type}\" onclick=\"window.location = 'tel:{phone}'\"/>",
        singleSelect: true
    }
});