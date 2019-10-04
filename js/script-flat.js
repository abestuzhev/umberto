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
            // console.log('yes');
        } else {
            main.removeClass("header-nav-fixed");
            // console.log('no');
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

    // $('.c-input, .c-textarea').focus(function(){
    //     $(this).parents('.c-form-card').addClass('is-focus');
    // });
    // $('.c-input, .c-textarea').blur(function(){
    //     if(!$(this).val().trim()){
    //         $(this).parents('.c-form-card').removeClass('is-focus');
    //     }
    //
    // });

    $('.c-select').SumoSelect();

    $('.header-mobile-menu').on('click', function(e){
        e.preventDefault();
        $('.header-mobile-popup').toggleClass('is-visible');
        $('.header-mobile-menu').toggleClass('active');
    });

    /*range slider*/
    function rangeSlider(slide, minValue){
        $(slide).slider({
            // min: 0,
            // max: 700,
            range: 'min',
            stop: function(event, ui) {
                $(minValue).val($(slide).slider("values",0));

            },
            slide: function(event, ui){
                $(minValue).val($(slide).slider("values",0));
            }
        });

        $(minValue).on('change', function(){

            var value1=$(minValue).val();

            // if(parseInt(value1) > parseInt(value2)){
            //     value1 = value2;
            //     $(minValue).val(value1);
            // }
            console.log('value1: ' + value1);
            $(slide).slider("values",value1);
        });




        // $(maxValue).on('change', function(){
        //
        //     var value1=$(minValue).val();
        //     var value2=$(maxValue).val();
        //
        //     if (value2 > maxDefault) {
        //         value2 = maxDefault;
        //         $(maxValue).val(maxDefault)
        //     }
        //
        //     if(parseInt(value1) > parseInt(value2)){
        //         value2 = value1;
        //         $(maxValue).val(value2);
        //     }
        //     $(slide).slider("values",1,value2);
        // });



// фильтрация ввода в поля
        $('input').keypress(function(event){
            var key, keyChar;
            if(!event) var event = window.event;

            if (event.keyCode) key = event.keyCode;
            else if(event.which) key = event.which;

            if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
            keyChar=String.fromCharCode(key);

            if(!/\d/.test(keyChar))	return false;

        });
    }

    rangeSlider('#slider-price', '#minCost-price');


    $().on('change', function(){

    })

    $('.c-radio-payment__input').on('click', function(e) {
      // e.preventDefault();
       if($('#type_delivery_1').is(':checked')) {
          $('.order-delivery-courier').slideDown(300);
       }else {
         $('.order-delivery-courier').slideUp(300);
       }
    });


    if($('body').hasClass('modal-open')){
        $('html').ad
    }
});
