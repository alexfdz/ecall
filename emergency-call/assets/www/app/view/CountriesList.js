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
    },
    
    initialize: function () {
       this.add([
             { xtype: 'spacer' },
             {
                 xtype: 'searchfield',
                 placeHolder: 'Search a country...',
                 listeners: {
                     scope: this,
                     clearicontap: this.onSearchClearIconTap,
                     keyup: this.onSearchKeyUp
                 }
             },
             { xtype: 'spacer' }
         ]);
       this.callParent(arguments);
       this.setListeners({
           itemtap: { fn: this.onCountrySelected, scope: this },
           show: { fn: this.onShow, scope: this },
           updatedata: { fn: this.onupdatedata, scope: this }
       });
    },
    
    onupdatedata: function (list, index, target, record, evt, options) {
        console.log("onupdatedata");
    },
    
    onCountrySelected: function (list, index, target, record, evt, options) {
        console.log("saveConfigCommand");
        this.fireEvent('saveConfigCommand', this, record);
    },
    
    onShow: function(list, newActiveItem, oldActiveItem, options) {
        console.log("onShow");
        this.fireEvent('activateCommand', this);
    },
    
    /**
     * Called when the search field has a keyup event.
     *
     * This will filter the store based on the fields content.
     */
    onSearchKeyUp: function(field) {
        //get the store and the value of the field
        var value = field.getValue(),
            store = this.getStore();

        //first clear any current filters on thes tore
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(' '),
                regexps = [],
                i;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(searches[i], 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('label').match(search) || record.get('id').match(search);

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                //if nothing was found, return false (dont so in the store)
                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    //else true true (show in the store)
                    return matched[0];
                }
            });
        }
    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        this.getStore().clearFilter();
    }
});