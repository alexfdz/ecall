Ext.define("EmergencyCall.view.CountriesList", {
    extend: "Ext.dataview.List",
    alias: "widget.countrieslist",
    config: {
        cls: "x-list-countries",
        itemTpl: "<div class=\"list-item-title\"><span class=\"icn flag-icon-class\" " + 
            "style=\"background-image: url(resources/images/flags/{id}.png);\">&nbsp;</span>{label}</div>",
        grouped: true,
        pinHeaders: false,
        disableSelection: true,
        listeners:{
            show: {fn: function(){
                console.log('CountriesList show');
            },scope: this},
            activate: {fn: function(){
                console.log('CountriesList activate');
            },scope: this},
            initialize: {fn: function(){
                console.log('CountriesList initialize');
            },scope: this},
            painted: {fn: function(){
                console.log('CountriesList painted');
            },scope: this}
        }
    }

});