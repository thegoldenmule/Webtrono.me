/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.AudioView = function (metronome) {
        var scope = this;
        var volume = 80;

        this._tick = null;
        this.load('audio/tick0');

        metronome.Ticked.add(function() {
            if (null === scope._tick) {
                return;
            }

            scope._tick.volume(volume);
            scope._tick.stop();
            scope._tick.play();
        });

        $('#audio-volume').on('changed', function(event) {
            var value = $('#audio-volume').slider('value');
            volume = value / 100;

            $('#audio-label').text(value)
        });

        $('.audio-button').click(function(event) {
            scope._tick = null;

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
