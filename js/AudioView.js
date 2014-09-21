/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.AudioView = function (metronome) {
        var scope = this;

        this._tick = new Howl({
            urls:
                [
                    'audio/tick0.mp3',
                    'audio/tick0.ogg',
                    'audio/tick0.wav'
                ]});

        metronome.Ticked.add(function() {
            if (!$('#audio-switch').is(':checked')) {
                return;
            }

            scope._tick.stop();
            scope._tick.play();
        });
    };

    global.AudioView.prototype = {
        constructor: global.AudioView
    };
})(this);
