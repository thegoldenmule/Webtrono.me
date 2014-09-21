/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.AudioView = function (metronome) {
        var scope = this;

        this.load('audio/tick0');

        metronome.Ticked.add(function() {
            if (!$('#audio-switch').is(':checked')) {
                return;
            }

            scope._tick.stop();
            scope._tick.play();
        });

        $('.audio-button').click(function(event) {
            var attributes = event.target.attributes;
            for (var i = 0, len = attributes.length; i < len; i++) {
                var name = attributes[i].name;
                var value = attributes[i].value;
                if (name === 'sound-name') {
                    scope.load(value);
                    break;
                }
            }
        });
    };

    global.AudioView.prototype = {
        constructor: global.AudioView,

        load:function(soundName) {
            this._tick = new Howl({
                urls:
                    [
                        soundName + '.mp3',
                        soundName + '.ogg',
                        soundName + '.wav'
                    ]});
        }
    };
})(this);
