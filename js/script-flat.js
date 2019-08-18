$(function(){
    var HeaderCurrentPos = $(".header-nav-layout").offset().top;
    var windowEl = $(window);
    var main = $(".header-nav-layout");
// var mainHeight = main.height();
// var mainWrap = $(".header-nav-layout");
    windowEl.on('scroll', function(){
        var scrollPos = windowEl.scrollTop();
        if (HeaderCurrentPos <= scrollPos) {
            main.addClass("header-nav-fixed");
            // mainWrap.css("height" , mainHeight);
            console.log('yes');
        } else {
            main.removeClass("header-nav-fixed");
            console.log('no');
        }
    });


    /*простые табы*/
    $(document).on('click', '.tabs-menu a', function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $('.tab').find(".tab-content").not(tab).css("display", "none");
        // $(this).parents('.tabs-menu').parent().siblings('.tab').find(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });

    $('.c-input, .c-textarea').focus(function(){
        $(this).parents('.c-form-card').addClass('is-focus');
    });
    $('.c-input, .c-textarea').blur(function(){
        if(!$(this).val().trim()){
            $(this).parents('.c-form-card').removeClass('is-focus');
        }

    });

    $('.c-select').SumoSelect();

    $('.header-mobile-menu').on('click', function(e){
        e.preventDefault();
        $('.header-mobile-popup').toggleClass('is-visible');
        $('.header-mobile-menu').toggleClass('active');
    });

    
});