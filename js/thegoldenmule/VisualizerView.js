/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.VisualizerView = function (metronome, timer) {
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

        timer.Ended.add(function() {
            $('body')
                .animate(
                {
                    'backgroundColor':'#000000'
                },
                50,
                "swing",
                function() {
                    $('body')
                        .animate(
                        {
                            'backgroundColor':'#ffffff'
                        },
                        1000);
                });
        });

        $('.vs-button').click(function(event) {
            // set color
            color = $(event.target).css('background-color');
        });
    };

    global.VisualizerView.prototype = {
        constructor: global.VisualizerView
    };
})(this);