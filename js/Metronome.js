/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.Metronome = function () {
        this.bpm = 120;

        this.Ticked = new signals.Signal();

        this._playing = false;

        this._daemon = new Daemon.safe(this, this._tick, 1);
        this._daemon.pause();

        this._lastTime = null;
    };

    global.Metronome.prototype = {
        constructor: global.Metronome,

        isPlaying:function() {
            return this._playing;
        },

        play:function() {
            if (this._playing) {
                return;
            }

            this.Ticked.dispatch();
            this._lastTime = Date.now();
            this._daemon.play();

            this._playing = true;
        },

        pause:function() {
            if (!this._playing) {
                return;
            }

            this._daemon.pause();
            this._playing = false;
        },

        _tick:function() {
            var msPerTick = (1000 * 60) / this.bpm;
            var currentTime = Date.now();
            var diff = currentTime - this._lastTime;

            if (diff > msPerTick) {
                this._lastTime = currentTime + diff - msPerTick;

                this.Ticked.dispatch();
            }
        }
    };
})(this);
