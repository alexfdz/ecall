Ext.define("EmergencyCall.view.CountriesList", {
    extend: "Ext.dataview.List",
    alias: "widget.countrieslist",
    config: {
        cls: "x-list-countries",
        itemTpl: "<div class=\"list-item-title\"><span class=\"icn flag-icon-class\" " + 
            "style=\"background-image: url(resources/images/flags/{id}.png);\">&nbsp;</span>{label}</div>",
        grouped: true,
        pinHeaders: false,
        disableSelection: true
    }
});