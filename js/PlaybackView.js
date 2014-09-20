/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.PlaybackView = function (metronome) {
        var scope = this;

        this.metronome = metronome;

        $('#playback-play').click(function() {
            if ($('#playback-playicon').hasClass("paused")) {
                $('#playback-playicon').removeClass("paused").addClass("playing");

                metronome.pause();
            } else {
                $('#playback-playicon').removeClass("playing").addClass("paused");

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
    };

    global.PlaybackView.prototype = {
        constructor: global.PlaybackView,

        updateBPM:function(){
            $('#playback-bpm-label').text(this.metronome.bpm.toString())
        }
    };
})(this);
