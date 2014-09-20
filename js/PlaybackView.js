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
                $('#playback-toggle')
                    .toggleClass('icon-play')
                    .toggleClass('icon-pause');

                metronome.pause();
            } else {
                $('#playback-toggle')
                    .toggleClass('icon-play')
                    .toggleClass('icon-pause');

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
