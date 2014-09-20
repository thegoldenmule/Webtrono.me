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

        this.playbackController = new PlaybackView(this.metronome);

        return scope;
    };

    $(document).ready(main);

})(this);
