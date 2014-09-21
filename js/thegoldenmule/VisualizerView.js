/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.VisualizerView = function (metronome) {
        var color = '#FFFFFF';

        metronome.Ticked.add(function() {
            $('body')
                .animate(
                {
                    'backgroundColor':color
                },
                50,
                "swing",
                function() {
                    $('body')
                        .animate(
                        {
                            'backgroundColor':'#ffffff'
                        },
                        100);
                });
        });

        $('.vs-button').click(function(event) {
            // set color
            color = $(event.target).find('span').css('color');
        });
    };

    global.VisualizerView.prototype = {
        constructor: global.VisualizerView
    };
})(this);