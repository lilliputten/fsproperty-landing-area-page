$(document).ready(function() {
    $('.fancybox').fancybox({
        margin: 0,
        padding: 0,  
        maxHeight: 768,
        helpers : {
            title : null,
            overlay : {
                css : {
                    'background' : 'rgba(0, 0, 0, 0.9)'
                }
            }            
        }         
    });
});