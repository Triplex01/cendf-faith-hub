/**
 * CENDF Admin Scripts
 */

(function($) {
    'use strict';
    
    $(document).ready(function() {
        
        // Ticker message management
        initTickerManager();
        
        // Media uploader for logo
        initMediaUploader();
        
        // Confirm dangerous actions
        initConfirmations();
        
    });
    
    /**
     * Ticker message manager
     */
    function initTickerManager() {
        var $container = $('#ticker-messages');
        var messageIndex = $container.find('.ticker-message-row').length;
        
        // Add message
        $('#add-ticker-message').on('click', function() {
            var html = '<div class="ticker-message-row">' +
                '<label class="ticker-active">' +
                '<input type="checkbox" name="ticker_messages[' + messageIndex + '][active]" checked /> Actif' +
                '</label>' +
                '<input type="text" name="ticker_messages[' + messageIndex + '][text]" class="regular-text ticker-text" placeholder="Entrez votre message..." />' +
                '<button type="button" class="button ticker-remove" title="Supprimer"><span class="dashicons dashicons-trash"></span></button>' +
                '</div>';
            $container.append(html);
            messageIndex++;
            updatePreview();
        });
        
        // Remove message
        $(document).on('click', '.ticker-remove', function() {
            if ($('.ticker-message-row').length > 1) {
                $(this).closest('.ticker-message-row').fadeOut(200, function() {
                    $(this).remove();
                    updatePreview();
                });
            } else {
                $(this).closest('.ticker-message-row').find('.ticker-text').val('');
                updatePreview();
            }
        });
        
        // Update preview on change
        $(document).on('change keyup', '.ticker-text, .ticker-active input', function() {
            updatePreview();
        });
        
        function updatePreview() {
            var messages = [];
            $('.ticker-message-row').each(function() {
                var $row = $(this);
                if ($row.find('.ticker-active input').is(':checked')) {
                    var text = $row.find('.ticker-text').val();
                    if (text) {
                        messages.push(text);
                    }
                }
            });
            
            $('#ticker-preview').text(messages.join(' • ') || 'Aucun message actif');
        }
    }
    
    /**
     * Media uploader
     */
    function initMediaUploader() {
        $(document).on('click', '.cendf-upload-button', function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var $input = $button.siblings('input[type="hidden"]');
            var $preview = $button.siblings('.cendf-image-preview');
            
            var frame = wp.media({
                title: 'Sélectionner une image',
                button: { text: 'Utiliser cette image' },
                multiple: false
            });
            
            frame.on('select', function() {
                var attachment = frame.state().get('selection').first().toJSON();
                $input.val(attachment.url);
                $preview.html('<img src="' + attachment.url + '" style="max-width:200px;" />');
            });
            
            frame.open();
        });
    }
    
    /**
     * Confirmation dialogs
     */
    function initConfirmations() {
        $(document).on('click', '.cendf-confirm', function(e) {
            var message = $(this).data('confirm') || 'Êtes-vous sûr ?';
            if (!confirm(message)) {
                e.preventDefault();
            }
        });
    }
    
})(jQuery);
