Ext.define("EmergencyCall.view.CountriesListContainer", {
    extend: "Ext.Container",   
    alias: "widget.countrieslistcontainer",
    countriesList: undefined,
    
    initialize: function () {

        this.callParent(arguments);
        
        var topToolbar = {
                xtype: "toolbar",
                docked: "top",
                items: [{
                    xtype: 'searchfield',
                    placeHolder: 'Search a country...',
                    width: '90%',
                    listeners: {
                        scope: this,
                        clearicontap: this.onSearchClearIconTap,
                        keyup: this.onSearchKeyUp
                    }
                }]
            };
        
        var backButton = new Ext.Button({
            xtype: "button",
            ui: 'action',
            text: 'Home',
            handler: this.onBackButton,
            scope: this
        });

        var bottomToolbar = {
                xtype: "toolbar",
                docked: "bottom",
                items: [backButton]
            };
        
        this.countriesList = new EmergencyCall.view.CountriesList({
                listeners:{
                    itemtap: { fn: this.onCountrySelected, scope: this }
                }
            });
        this.setListeners({
            show: {fn: function(){
                console.log('activateListCommand');
                this.fireEvent('activateListCommand', this);
            },scope: this}
        });
        
        this.add([topToolbar, this.countriesList, bottomToolbar]);
    },
    
    onBackButton: function () {
        console.log("onBackButton");
        this.fireEvent("homeCommand", this);
    },
    
    onCountrySelected: function (list, index, target, record, evt, options) {
        console.log("saveConfigCommand");
        this.fireEvent('saveConfigCommand', this, record);
        evt.stopEvent();
    },
    /**
     * Called when the search field has a keyup event.
     *
     * This will filter the store based on the fields content.
     */
    onSearchKeyUp: function(field) {
        //get the store and the value of the field
        var value = field.getValue(),
            store = this.countriesList.getStore();

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
        this.countriesList.getStore().clearFilter();
    },
    
    config: {
        fullscreen: true,
        layout: 'fit'
    }
});