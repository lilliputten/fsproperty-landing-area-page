$(document).ready(function() {
    var filterForm = $('#realty-main-filter');  
            
    function filter(form) {        
        $.fn.yiiListView.update('complexes-list', {
            data: form.serialize()
        });     
    }

    filterForm.submit(function(e){
        filter($(this));
        return false;
    });

    $('#realty-filter-submit').click(function(e){
        e.preventDefault();
        filterForm.submit();
    });
    
    $('#clear-filter').click(
        function(e) {
            e.preventDefault();
            var lnk = $(this);
                
            $('input, textarea', filterForm).val('');
            $('input[type=checkbox]', filterForm).attr('checked', false);
            $('select', filterForm).selectpicker('deselectAll');
            
            $.fn.yiiListView.update('complexes-list', {
                url: lnk.attr('href'),
                data: '',
            });
        }
    );    
});