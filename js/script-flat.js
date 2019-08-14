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
});