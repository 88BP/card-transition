var flippedCard;
var targetCard;

$('.card').on('click', function (e) {

    targetCard = $(e.target).parent();
    var cardWidth = $(targetCard).width();
    var cardHeight = $(targetCard).height();
    var cardPositionX = $(targetCard).offset().left;
    var cardPositionY = $(targetCard).offset().top;
    var screenSize = $(window).width();
    var $overlay = $('.overlay');

    //make a new card
    flippedCard = $(targetCard).clone()
        .appendTo('body')
        .css({
            width: cardWidth,
            height: cardHeight,
            left: cardPositionX,
            top: cardPositionY,
            position: 'absolute'
        })
        .attr({
            'data-w': $(this).width(),
            'data-h': $(this).height()
        });

    $(targetCard).hide();
    $overlay.velocity({opacity: 1}, {duration: 250, display: 'block'});

    $(flippedCard).velocity({
        'translateX': '50%',
        'translateY': '10%'
    }, {
        duration: 300,
        complete: function () {
            $(flippedCard).velocity({
                'rotateY': 180
            }, {
                duration: 450,
                complete: function () {
                    cardPositionY = $(targetCard).position().top;
                    $(flippedCard).velocity({
                        width: '600',
                        height: '600'
                    }, {
                        duration: 450
                    });
                }
            });

        }
    }).removeClass('no-flip').removeClass('flip-0').addClass('flip-180');
});

$('.overlay').on('click', function (e) {

    var width = $(flippedCard).attr('data-w');
    var height = $(flippedCard).attr('data-h');
    $(this).velocity({opacity: 0}, {duration: 250, display: 'none'});


    $(flippedCard).velocity({
        rotateY: 0
    }, {
        duration: 400,
        complete: function () {
            $(this).velocity({
                width: width,
                height: height,
                translateX: 0,
                translateY: 0
            }, {
                duration: 400,
                display: 'none',
                complete: function(){
                	 $(targetCard).show();
                	 $(flippedCard).remove();
                }
            });

        }
    });


});
