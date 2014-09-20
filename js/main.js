/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    var main = function () {
        var scope = this;

        this.metronome = new Metronome();
        this.metronome.Ticked.add(function() {
            console.log("t");
        });

        $('#playback').click(
            function() {
                if ($('#playicon').hasClass("paused")) {
                    $('#playicon').removeClass("paused").addClass("playing");

                    scope.metronome.pause();
                } else {
                    $('#playicon').removeClass("playing").addClass("paused");

                    scope.metronome.play();
                }
            }
        );

        return scope;
    };

    $(document).ready(main);

})(this);
