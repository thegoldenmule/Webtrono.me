/**
 * Author: thegoldenmule
 * Date: 9/21/14
 */

(function (global) {
    "use strict";

    global.TimerCurveView = function (metronome, timer) {
        var scope = this;

        var container = document.getElementById('timer-canvas-container');
        var paper = new Raphael(container, '100%', '100%');

        // draws background
        var width = container.offsetWidth;
        var height = container.offsetHeight;
        var bg = paper.rect(0, 0, width, height);
        bg.attr('fill', '#CCCCCC');
        bg.attr('stroke', '#AAAAAA');
        bg.attr('stroke-width', 3);

        // draw playhead
        var playhead = paper.path('m0,0l0,' + height);
        playhead.attr('stroke-width', 5);
        playhead.attr('stroke', '#DD1111');

        // draw curve
        var curve = paper.path('M0,0' + height + 'Q' + width / 2 + ',' + height + ',' + width + ',' + height);
        curve.attr('stroke', '#000000');

        var percentage = 0;
        var intervalId = 0;
        var originalBPM = 0;
        timer.Started.add(function() {
            originalBPM = metronome.bpm;

            intervalId = setInterval(function() {
                var t = timer.getProgress();
                playhead.transform('T' + t * width + ',0');

                // affect bpm
                var k = 1 - 2 * Math.abs(t - 0.5);
                var diff = originalBPM * percentage / 100;
                metronome.bpm = originalBPM + k * diff;
            }, 1);
        });

        timer.Stopped.add(function() {
            clearInterval(intervalId);
        });

        // buttons
        $('.timer-curve-button').click(function(event) {
            var attributes = event.target.attributes;
            for (var i = 0, len = attributes.length; i < len; i++) {
                var name = attributes[i].name;
                var value = attributes[i].value;
                if (name === 'timer-value') {
                    percentage = parseInt(value, 10);
                    if (0 === percentage) {
                        curve.remove();
                        curve = paper.path('M0,0' + height + 'Q' + width / 2 + ',' + height + ',' + width + ',' + height);
                    } else {
                        curve.remove();
                        curve = paper.path('M0,0' + height + 'Q' + width / 2 + ',-' + (percentage / 50 * 40) + ',' + width + ',' + height);
                    }
                    break;
                }
            }
        });
    };

    global.TimerCurveView.prototype = {
        constructor: global.TimerCurveView
    };
})(this);
