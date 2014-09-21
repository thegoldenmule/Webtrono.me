/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    var main = function () {
        var scope = this;

        this.metronome = new Metronome();

        var playback = new PlaybackView(this.metronome);
        var timer = new TimerView(this.metronome);
        var visualizer = new VisualizerView(this.metronome);

        return scope;
    };

    $(document).ready(main);

})(this);
