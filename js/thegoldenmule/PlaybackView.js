/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.PlaybackView = function (metronome) {
        var scope = this;

        this.metronome = metronome;

        $('#playback-toggle').click(function() {
            if (metronome.isPlaying()){
                metronome.pause();
            } else {
                metronome.play();
            }
        });

        $('#playback-up').click(function() {
            metronome.bpm += 1;

            scope.updateBPM();
        });

        $('#playback-down').click(function() {
            metronome.bpm -= 1;

            scope.updateBPM();
        });

        metronome.Paused.add(function() {
            var selector = $('#playback-toggle');
            if (selector.hasClass('icon-pause')) {
                selector.removeClass('icon-pause');
            }

            if (!selector.hasClass('icon-play')) {
                selector.addClass('icon-play');
            }
        });

        metronome.Played.add(function() {
            var selector = $('#playback-toggle');
            if (selector.hasClass('icon-play')) {
                selector.removeClass('icon-play');
            }

            if (!selector.hasClass('icon-pause')) {
                selector.addClass('icon-pause');
            }
        });

        metronome.Ticked.add(function() {
            // tock icon
            $('#playback-icon').toggleClass('icon-thermometer');

            setTimeout(function() {
                $('#playback-icon').toggleClass('icon-thermometer');
            }, 100);

            scope.updateBPM();
        });
    };

    global.PlaybackView.prototype = {
        constructor: global.PlaybackView,

        updateBPM:function(){
            $('#playback-bpm-label').text(Math.ceil(this.metronome.bpm).toString());
        }
    };
})(this);
