
function initMap() {
    var coordinates = {lat: 54.53276, lng: 36.30299},
        markerImage = '/local/templates/umberto/img/meta.png';

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 54.53276, lng: 36.30299},
        zoom: 14,
        styles:[
            {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#2c2e33"
                    },
                    {
                        "saturation": 7
                    },
                    {
                        "lightness": 19
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-3"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#fd901b"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f39247"
                    },
                    {
                        "saturation": "0"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ff6f00"
                    },
                    {
                        "saturation": "100"
                    },
                    {
                        "lightness": 31
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#f39247"
                    },
                    {
                        "saturation": "0"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#008eff"
                    },
                    {
                        "saturation": -93
                    },
                    {
                        "lightness": 31
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fd901b"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f3dbc8"
                    },
                    {
                        "saturation": "0"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#bbc0c4"
                    },
                    {
                        "saturation": -93
                    },
                    {
                        "lightness": -2
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#e9ebed"
                    },
                    {
                        "saturation": -90
                    },
                    {
                        "lightness": -8
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#e9ebed"
                    },
                    {
                        "saturation": 10
                    },
                    {
                        "lightness": 69
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#e9ebed"
                    },
                    {
                        "saturation": -78
                    },
                    {
                        "lightness": 67
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    }
                ]
            }
        ]
    });
    image = '/local/templates/umberto/img/meta.png',
        marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: image
        });
}




var RangeSlider = function(containerID) {
    var self = this,
        $RangeSlider = $('#'+containerID),
        $SliderThumnb = $RangeSlider.find('.RangeSlider_Thumb'),
        $SliderTrack = $RangeSlider.find('.RangeSlider_Track'),
        $SliderTrackFill = $RangeSlider.find('.RangeSlider_TrackFill'),
        $ClickArea = $RangeSlider.find('.RangeSlider_ClickArea'),
        $SliderPoints = $RangeSlider.find('.RangeSlider_Point');

    this.value = 0;

    /* helper to find slider value based on filled track width */
    var findValueFromTrackFill = function(trackFillWidth) {
        var totalWidth = $SliderTrack.width(),
            onePercentWidth = totalWidth / 100,
            value = Math.round((trackFillWidth / onePercentWidth) / 10);
        return value;
    }

    /* change highlighted number based on new value */
    var updateSelectedValue = function(newValue) {
        $SliderPoints.removeClass('RangeSlider_PointActive');
        $SliderPoints.eq( newValue ).addClass('RangeSlider_PointActive');
    }

    /* highlight track based on new value (and move thumb) */
    var updateHighlightedTrack = function(newPosition) {
        newPosition = newPosition + '0%';
        $SliderTrackFill.css('width', newPosition);
    }

    /* set up drag funcationality for thumbnail */
    var setupDrag = function($element, initialXPosition) {
        $SliderTrackFill.addClass('RangeSlider_TrackFill-stopAnimation');
        var trackWidth = $SliderTrackFill.width();

        var newValue = findValueFromTrackFill( trackWidth );
        updateSelectedValue(newValue);

        $element.on('mousemove', function(e){
            var newPosition = trackWidth + e.clientX - initialXPosition;
            self.imitateNewValue( newPosition );

            newValue = findValueFromTrackFill( $SliderTrackFill.width() );
            updateSelectedValue(newValue);
        });
    }
    /* remove drag functionality for thumbnail */
    var finishDrag = function($element) {
        $SliderTrackFill.removeClass('RangeSlider_TrackFill-stopAnimation');
        $element.off('mousemove');
        var newValue = findValueFromTrackFill( $SliderTrackFill.width() );
        self.updateSliderValue( newValue );
    }

    /* method to update all things required when slider value updates */
    this.updateSliderValue = function(newValue) {
        updateSelectedValue( newValue );
        updateHighlightedTrack( newValue );
        self.value = newValue;
        console.log('this.value = ', self.value);
    }

    /* method to imitate new value without animation */
    this.imitateNewValue = function(XPosition) {
        $SliderTrackFill.addClass('RangeSlider_TrackFill-stopAnimation');
        if ( XPosition > $SliderTrack.width() ) {
            XPosition = $SliderTrack.width();
        }
        $SliderTrackFill.css('width', XPosition + 'px');
    }

    /*
     * bind events when instance created
     */
    $ClickArea.on('mousedown', function(e){
        /* if a number or thumbnail has been clicked, use their event instead */
        var $target = $(e.target);
        if ( $target.hasClass('RangeSlider_Thumb') ) {
            return false;
        }
        /* now we can continue based on where the clickable area was clicked */
        self.imitateNewValue( e.offsetX );
        setupDrag( $(this), e.clientX );
    });

    $ClickArea.on('mouseup', function(e){
        console.log('"$ClickArea" calling "finishDrag"');
        finishDrag( $(this) );
    });

    // update value when markers are clicked
    $SliderPoints.on('mousedown', function(e){
        e.stopPropagation();
        var XPos = $(this).position().left + ($(this).width()/2);
        self.imitateNewValue( XPos );
        setupDrag( $ClickArea, e.clientX );
    });

    // when thumbnail is clicked down, init the drag stuff
    $SliderThumnb.on('mousedown', function(e){
        e.stopPropagation();
        setupDrag( $(this), e.clientX );
    });

    // when the thumbnail is released, remove the drag stuff
    $SliderThumnb.on('mouseup', function(e){
        console.log('"$SliderThumnb" calling "finishDrag"');
        finishDrag( $(this) );
    });
}

var rangeSlider = new RangeSlider('RangeSlider');
var rangeSlider2 = new RangeSlider('RangeSlider2');









var timer;

// var compareDate = new Date();
if (typeof(compareDate) !== "undefined" ) {
    compareDate.setDate(compareDate.getDate()); //just for this demo today + 7 days

    timer = setInterval(function () {
        timeBetweenDates(compareDate);
    }, 1000);

    function timeBetweenDates(toDate) {
        var dateEntered = toDate;
        var now = new Date();
        var difference = dateEntered.getTime() - now.getTime();

        if (difference <= 0) {

            // Timer done
            clearInterval(timer);

        } else {

            var seconds = Math.floor(difference / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);

            hours %= 24;
            minutes %= 60;
            seconds %= 60;

            $("#days").text(days);
            $("#hours").text(hours);
            $("#minutes").text(minutes);
            $("#seconds").text(seconds);
        }
    }
}


$(".button1").click(function() {
    $('#transform1').toggleClass('transform-active');
});
$(".button2").click(function() {
    $('#transform2').toggleClass('transform-active');
});
$(".button3").click(function() {
    $('#transform3').toggleClass('transform-active');
});
$(".button4").click(function() {
    $('#transform4').toggleClass('transform-active');
});



// $(function() {
//     var action;
//     $(".number-spinner button").mousedown(function () {
//         btn = $(this);
//         input = btn.closest('.number-spinner').find('input');
//         btn.closest('.number-spinner').find('button').prop("disabled", false);
//
//         if (btn.attr('data-dir') == 'up') {
//             action = setInterval(function(){
//                 if ( input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max')) ) {
//                     input.val(parseInt(input.val())+1);
//                 }else{
//                     btn.prop("disabled", true);
//                     clearInterval(action);
//                 }
//             }, 50);
//         } else {
//             action = setInterval(function(){
//                 if ( input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min')) ) {
//                     input.val(parseInt(input.val())-1);
//                 }else{
//                     btn.prop("disabled", true);
//                     clearInterval(action);
//                 }
//             }, 50);
//         }
//     }).mouseup(function(){
//         clearInterval(action);
//     });
// });


$(function() {
    var action;
    if (window.innerWidth >= 1024) {
        $(document).on("mousedown", ".number-spinner button", function () {
            btn = $(this);
            input = btn.closest('.number-spinner').find('input');
            btn.closest('.number-spinner').find('button').prop("disabled", false);

            if (btn.attr('data-dir') == 'up') {
                action = setInterval(function () {
                    if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
                        input.val(parseInt(input.val()) + 1);
                    } else {
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }
                }, 60);
            } else {
                action = setInterval(function () {
                    if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
                        input.val(parseInt(input.val()) - 1);
                    } else {
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }
                }, 60);
            }
        }).mouseup(function () {
            clearInterval(action);
        });
    }
    if (window.innerWidth < 1024) {
        $(document).on("click", ".number-spinner button", function () {
            btn = $(this);
            input = btn.closest('.number-spinner').find('input');
            btn.closest('.number-spinner').find('button').prop("disabled", false);

            if (btn.attr('data-dir') == 'up') {

                    if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
                        input.val(parseInt(input.val()) + 1);
                    } else {
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }

            } else {

                    if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
                        input.val(parseInt(input.val()) - 1);
                    } else {
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }

            }
        }).mouseup(function () {
            clearInterval(action);
        });
    }
});



