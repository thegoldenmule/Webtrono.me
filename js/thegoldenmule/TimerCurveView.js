/**
 * Author: thegoldenmule
 * Date: 9/21/14
 */

(function (global) {
    "use strict";

    global.TimerCurveView = function (metronome, timer) {
        var scope = this;

        var container = document.getElementById('timer-canvas-container');
        var paper = Raphael(container, '100%', '100%');

        // draws background
        var width = container.offsetWidth;
        var height = container.offsetHeight;
        this._bg = paper.rect(0, 0, width, height);
        this._bg.attr('fill', '#CCCCCC');
        this._bg.attr('stroke', '#AAAAAA');
        this._bg.attr('stroke-width', 3);

        // draw playhead
        var playhead = paper.path('m0,0l0,' + height);
        playhead.attr('stroke-width', 5);
        playhead.attr('stroke', '#DD1111');

        // draw curve
        this._curve = paper.path(
            'M0,0' + height
            + 'Q' + width / 2 + ',' + height + ',' + width + ',' + height);
        this._curve.attr('stroke', '#000000');

        // buttons
        $('.timer-curve-button').click(function(event) {
            var attributes = event.target.attributes;
            for (var i = 0, len = attributes.length; i < len; i++) {
                var name = attributes[i].name;
                var value = attributes[i].value;
                if (name === 'timer-value') {
                    var percentile = parseInt(value);
                    if (0 === percentile) {
                        scope._curve.remove();
                        scope._curve = paper.path(
                            'M0,0' + height
                                + 'Q' + width / 2 + ',' + height + ',' + width + ',' + height);
                    } else {
                        scope._curve.remove();
                        scope._curve = paper.path(
                            'M0,0' + height
                            + 'Q' + width / 2 + ',-' + (percentile / 50 * 40) + ',' + width + ',' + height);
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
