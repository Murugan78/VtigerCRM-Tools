var VtigerTools = {
    'initLayoutEditor': function() {
        var container = jQuery('#layoutEditorContainer');

        jQuery('.editFields', container).on('dblclick', function(e) {
            e.stopPropagation();
            var params = {
                module: 'SwVtTools',
                action: 'LayoutEditorFieldGet',
                parent: 'Settings',
                fieldid: jQuery(this).data('field-id')
            };

            this.fieldID = jQuery(this).data('field-id');
            AppConnector.request(params).then(jQuery.proxy(function(data) {
                var newLabel = prompt('Please enter new Fieldlabel.\n\nYou must create the translations manually in the corresponding files!', data.fieldLabel);

                if(newLabel !== null) {
                    var params = {
                        module: 'SwVtTools',
                        action: 'LayoutEditorFieldSet',
                        parent: 'Settings',
                        fieldid: this.fieldID,
                        fieldLabel: newLabel
                    };

                    AppConnector.request(params);

                    var fieldLabel = jQuery(jQuery('.fieldLabel', jQuery(this))[0]);
                    if(jQuery('.redColor', fieldLabel).length > 0) {
                        newLabel = '<span class="redColor">*</span>' + newLabel;
                    }
                    fieldLabel.html(newLabel + '&nbsp;');

                }
            }, this));
        });

        jQuery('.editFieldsTable', container).on('dblclick', function(e) {
            e.stopPropagation();
            var params = {
                module: 'SwVtTools',
                action: 'LayoutEditorBlockGet',
                parent: 'Settings',
                blockid: jQuery(this).data('block-id')
            };

            this.blockID = jQuery(this).data('block-id');
            AppConnector.request(params).then(jQuery.proxy(function(data) {
                var newLabel = prompt('Please enter new Blocklabel.\n\nYou must create the translations manually in the corresponding files!', data.blockLabel);

                if(newLabel !== null) {
                    var params = {
                        module: 'SwVtTools',
                        action: 'LayoutEditorBlockSet',
                        parent: 'Settings',
                        blockid: this.blockID,
                        blockLabel: newLabel
                    };

                    AppConnector.request(params);

                    var fieldLabel = jQuery(jQuery('.blockLabel strong', jQuery(this))[0]);
                    fieldLabel.html(newLabel);

                }
            }, this));
        });
    }
};

jQuery(function() {

    if(jQuery('#layoutEditorContainer').length > 0) {
        VtigerTools.initLayoutEditor();
        var container = jQuery('#layoutEditorContainer');
        container.on('change', '[name="layoutEditorModules"]', function(e) {
            window.setTimeout('VtigerTools.initLayoutEditor();', 2000);
        });
    }
});