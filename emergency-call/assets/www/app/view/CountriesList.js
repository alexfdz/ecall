Ext.define("EmergencyCall.view.CountriesList", {
    extend: "Ext.dataview.List",
    alias: "widget.countrieslist",
    config: {
        cls: "x-list-countries",
        itemTpl: "<div class=\"list-item-title\"><span class=\"icn flag-icon-class\" " + 
            "style=\"background-image: url(resources/images/flags/{id}.png);\">&nbsp;</span>{label}</div>",
        pinHeaders: false,
        disableSelection: true,
       loadingText: 'Loading countries ...'
    },
    onBeforeLoad: function() {
        var scrollable = this.getScrollable();
        if (scrollable) {
            scrollable.getScroller().stopAnimation();
        }

        var loadingText = this.getLoadingText();
        if (loadingText) {
            this.setMasked({
                xtype: 'loadmask',
                message: loadingText,
                indicator: false,
            });

            //disable scorlling while it is masked
            if (scrollable) {
                scrollable.getScroller().setDisabled(true);
            }
        }

        this.hideEmptyText();
    }

});