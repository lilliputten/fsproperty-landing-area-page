$(document).ready(function() {
    var filterForm = $('#realty-main-filter'),
        mainFilter = $('#main-filter'),
        advancedFilter = $('#advanced-filter');  
            
    function filter(form, onmain = false) {
        $.each($('input, select', advancedFilter), function( index, element ) {
            var name = $(element).attr('name'),
                sameElementInMainFilter = $('[name=\"' + name + '\"]', mainFilter);

            if(sameElementInMainFilter.length > 0 && !sameElementInMainFilter.val()) {
                sameElementInMainFilter.val($(element).val());
            }
        }); 
            
        $.each($('input, select, checkbox', $('#main-filter, #advanced-filter')), function( index, element ) {
            if(($(element).attr('type') == 'hidden' && $(element).val() == 0) || $(element).val() == '') {
                $(element).prop('disabled', true);
            }
        });
        
        if(advancedFilter.attr('display') == 'none') {
            $('input, select', advancedFilter).prop('disabled', true);
        }
        else {       
            $.each($('input, select', mainFilter), function( index, element ) {
                var name = $(element).attr('name');
                if(name != '') {
                    $('[name=\"' + name + '\"]', advancedFilter).prop('disabled', true);
                }
            });
        }

        if (onmain) {
            advancedFilter.slideUp(500);
            return;
        }

        $.fn.yiiListView.update('properties-list', {
            data: form.serialize()
        });
        
        $.each($('input, select, checkbox', $('#main-filter, #advanced-filter')), function( index, element ) {
            $(element).prop('disabled', false);
        });
        advancedFilter.slideUp(500);        
    }

    filterForm.submit(function(e){
        if (window.location.pathname == '/') {
            filter($(this), 1);
            return true;
        }
        filter($(this));
        return false;
    });


    $('#realty-filter-submit').click(function(e){
        e.preventDefault();
        filterForm.submit();
    });

    $('#filter-container').on('change', '#filter_type_id', function() {
        if(!$(this).val()) {
            return;
        }
        
        $(':input', advancedFilter).attr('disabled', 'disabled');
        $.get(
            '/realty/filter/' + $(this).val() + '/',
            {},
            function(data) {
                var advancedFilterHtml = $(data).filter('#ajax-advanced-filter').html();
                
                $(':input', advancedFilter).attr('disabled', false);                
                $('#advanced-filter').html(advancedFilterHtml);
                $('#temp-form').remove();
                $('select').selectpicker();
            }
        );
    });
    
    $('#show-advanced-filter').click(function(e){
        e.preventDefault();
        $('#advanced-filter').slideToggle(500);
    });

    $('.realty-list-view-switcher.active').click(function(e){
        e.preventDefault();
    });    
});