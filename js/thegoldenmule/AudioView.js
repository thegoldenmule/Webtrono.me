/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.AudioView = function (metronome, timer) {
        var scope = this;
        var volume = 80;
        var beatsPerMeasure = 4;
        var beatCount = 0;
        var audioEnabled = true;

        this._tick = this.load('audio/tick0');
        this._tock = this.load('audio/tock3');
        this._timerEnd = this.load('audio/timerEnd');

        // play sound when timer ends
        timer.Ended.add(function() {
            scope._timerEnd.volume(volume / 100);
            scope._timerEnd.play();
        });

        metronome.Ticked.add(function() {
            if (null === scope._tick || !audioEnabled) {
                return;
            }

            var tick = scope._tick;

            beatCount = (beatCount + 1) % beatsPerMeasure;
            if (beatCount % beatsPerMeasure == 1) {
                tick = scope._tock;
            }

            tick.volume(volume / 100);
            tick.play();
        });

        $('#audio-enabled').click(function(event) {
            audioEnabled = event.target.checked;
        });

        $('#audio-volume').on('changed', function(event) {
            var value = $('#audio-volume').slider('value');
            volume = value / 100;

            $('#audio-label').text(value);
        });

        $('.audio-tick-button').click(function(event) {
            var attributes = event.target.attributes;
            for (var i = 0, len = attributes.length; i < len; i++) {
                var name = attributes[i].name;
                var value = attributes[i].value;
                if (name === 'sound-name') {
                    scope._tick = scope.load(value);
                    break;
                }
            }
        });

        $('.audio-tock-button').click(function(event) {
            var attributes = event.target.attributes;
            for (var i = 0, len = attributes.length; i < len; i++) {
                var name = attributes[i].name;
                var value = attributes[i].value;
                if (name === 'sound-name') {
                    scope._tock = scope.load(value);
                    break;
                }
            }
        });

        $('.sig-button').click(function(event) {
            var attributes = event.target.attributes;
            for (var i = 0, len = attributes.length; i < len; i++) {
                var name = attributes[i].name;
                var value = attributes[i].value;
                if (name === 'sig-value') {
                    var timeSig = value.split('/');
                    if (2 === timeSig.length)
                    {
                        beatsPerMeasure = parseInt(timeSig[0], 10);
                        metronome.noteValue = parseInt(timeSig[1], 10);

                        return;
                    }
                }
            }
        });
    };

    global.AudioView.prototype = {
        constructor: global.AudioView,

        load:function(soundName) {
            return new Howl({
                urls:
                    [
                        soundName + '.mp3',
                        soundName + '.ogg',
                        soundName + '.wav'
                    ]});
        }
    };
})(this);
