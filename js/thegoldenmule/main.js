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
        var timerCurve = new TimerCurveView(this.metronome, timer);
        var visualizer = new VisualizerView(this.metronome);
        var audio = new AudioView(this.metronome, timer);

        return scope;
    };

    $(document).ready(main);

})(this);
