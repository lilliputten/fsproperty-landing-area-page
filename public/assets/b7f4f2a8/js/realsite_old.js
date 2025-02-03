$(window).load(function() {
    'use strict';

    /**
     * Isotope
     */
    var isotope_properties = $('.properties-isotope');
    isotope_properties.isotope({
        'itemSelector': '.item'
    });

    $('.properties-filter a').click(function() {
        $(this).parent().parent().find('li').removeClass('selected');
        $(this).parent().addClass('selected');

        var selector = $(this).attr('data-filter');
        isotope_properties.isotope({ filter: selector });
        return false;
    });
});

$(function(){
    var ink, d, x, y;

    $(".btn, .btn-secondary, .header-action").click(function(e){
        if($(this).find(".ink").length === 0){
            $(this).prepend("<span class='ink'></span>");
        }
             
        ink = $(this).find(".ink");
        ink.removeClass("animate");
         
        if(!ink.height() && !ink.width()){
            d = Math.max($(this).outerWidth(), $(this).outerHeight());
            ink.css({height: d, width: d});
        }
         
        x = e.pageX - $(this).offset().left - ink.width()/2;
        y = e.pageY - $(this).offset().top - ink.height()/2;
         
        ink.css({top: y+'px', left: x+'px'}).addClass("animate");
    });
});

$(document).ready(function() {
    'use strict';

    /**
     * Input file
     */
    $('#input-file').fileinput({
        initialPreview: [
            "<img src='assets/img/tmp/medium/1.jpg' class='file-preview-image' alt='The Moon' title='Property 1'>",
            "<img src='assets/img/tmp/medium/2.jpg' class='file-preview-image' alt='The Earth' title='Property 2'>",
        ],
        overwriteInitial: true,
        initialCaption: "Your Uploaded Properties"
    });

    /**
     * Input Group
     */
     $('.input-group .form-control').on('focus', function() {
         $(this).closest('.input-group').find('.input-group-addon').addClass('active');
     }).on('blur', function() {
         $(this).closest('.input-group').find('.input-group-addon').removeClass('active');
     });

    /**
     * Scroll top
     */
    var scroll_top = $('.scroll-top');
    if(scroll_top.length != 0) {
        scroll_top.on('click', function() {
            $.scrollTo('.header', 800);
        });
    }

    /**
     * Property gallery
     */
    if ($('.property-gallery-list').length != 0) {
        $('.property-gallery-list').owlCarousel({
            items: 6,
            itemsDesktop : [1199, 5],
            itemsDesktopSmall : [979, 5],
            itemsTablet : [768, 3],
            itemsTabletSmall : [1, 3],
            itemsMobile : false,
            navigation: true,
            navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
        });
    }

    /**
    * Property carousel
    */
    if ($('.property-carousel').length != 0) {
        $('.property-carousel').owlCarousel({
            items: 4,
            itemsDesktop : [1199, 5],
            itemsDesktopSmall : [979, 3],
            itemsTablet : [768, 2],
            itemsTabletSmall : [1, 2],
            itemsMobile : false,
            navigation: true,
            navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
        });
    }

    $('.property-gallery-list-item a').on('click', function(e) {
        e.preventDefault();

        $('.property-gallery-list-item').each(function() {
            $(this).removeClass('active');
        });

        $(this).closest('li').addClass('active');

        var link = $(this).attr('href');
        $('.property-gallery-preview img').attr('src', link);
        $('.property-gallery-preview a').attr('href', $(this).data('original-image'));
    });

    /**
     * Autosize textarea
     */
    $('textarea').autosize();
    
    /**
     * Bootstrap select
     */
    $('select').selectpicker();    

    /**
     * Background image
     */
    $('*[data-background-image]').each(function() {
        $(this).css({
            'background-image': 'url(' + $(this).data('background-image') + ')'
        });
    });

    /**
     * Dropdown
     */
    $('div.dropdown-menu').on('focusin', function() {
        $(this).transition({
            height: 'auto',
            duration: 150,
            width: 'auto'
        });
    });

    $('div.dropdown-menu').on('focusout', function() {
        $(this).transition({
            height: 0,
            duration: 250,
            width: 0
        });
    });

    /**
     * Header animation
     */
     /**
      * Header animation
      */
     $('#nav-main > li.has-children').hover(function() {
         var el = $('> div', this);

         el.transition({
             height: 'auto',
             duration: 250,
             width: 'auto'
         });
     }, function() {
         var el = $('> div', this);

         el.transition({
             height: 0,
             duration: 150,
             width: 0
         });
     });

     // Second level
     $('#nav-main > li.has-children > div > ul > li.has-children').hover(function() {
         var el = $('> div', this);

         $(this).closest('div').css('overflow', 'visible');

         el.transition({
             height: 'auto',
             duration: 250,
             width: 'auto'
         });
     }, function() {
         var el = $('> div', this);

         $(this).closest('div').css('overflow', 'hidden');

         el.transition({
             height: 0,
             duration: 150,
             width: 0
         });
     });

    $('.navbar-toggle').on('click', function() {
        $('.nav-main-wrapper').toggleClass('open');
    });

    $('.nav-main-wrapper').on('click', function(e) {
        if (e.offsetX > 240) {
            $('.nav-main-wrapper').removeClass('open');
        }
    });
    
    $('.currency-selector a').on('click', function(e) {
        e.preventDefault();
        var currencyId = $(this).data('currency'),
            currencyCode = $(this).data('currency-code');
            
        setCookie('currency', currencyId, {
            expires: 60 * 60 * 24 * 30
        });
        
        $('.currency-selector li').removeClass('active');
        $('a[data-currency=' + currencyId + ']').parent('li').addClass('active');
        
        
        $('.property_price').hide();
        $('.property_price.currency_' + currencyCode).show();
        
        $('span.currency-icon i').attr('class', 'fa fa-' + currencyCode);
        //location.reload();
    });
});

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}