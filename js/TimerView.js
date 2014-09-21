/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    function parseTwoDigit(digit) {
        if (digit < 10) {
            return "0" + digit;
        }

        return digit;
    }

    function parseThreeDigit(digit) {
        if (digit < 10) {
            return "00" + digit;
        }

        if (digit < 100) {
            return "0" + digit;
        }

        return digit;
    }

    function parseTime(milliseconds) {
        var minutes = Math.floor(milliseconds / 60000);
        milliseconds -= minutes * 60000;

        var seconds = Math.floor(milliseconds / 1000);
        milliseconds -= seconds * 1000;

        return parseTwoDigit(minutes) + ":" + parseTwoDigit(seconds) + ":" + parseThreeDigit(milliseconds);
    }

    global.TimerView = function (metronome) {
        var scope = this;

        $('#timer-1').click(function() {
            scope.start(1);
        });
        $('#timer-2').click(function() {
            scope.start(2);
        });
        $('#timer-3').click(function() {
            scope.start(3);
        });
        $('#timer-4').click(function() {
            scope.start(4);
        });
        $('#timer-5').click(function() {
            scope.start(5);
        });
        $('#timer-6').click(function() {
            scope.start(10);
        });

        metronome.Paused.add(function() {
            scope.pause();
        });

        metronome.Played.add(function() {
            scope.resume();
        });

        this._startTime = null;
        this._pausedTime = null;
        this._totalTime = null;

        this._daemon = new Daemon.safe(this, this._tick, 1);
        this._daemon.pause();

        this._timerBar = $("#timer-progress").progressbar();
    };

    global.TimerView.prototype = {
        constructor: global.TimerView,

        start:function(minutes) {
            this._pausedTime = null;
            this._startTime = Date.now();
            this._totalTime = minutes * 60000;

            this._daemon.play();
        },

        pause:function() {
            if (null !== this._pausedTime) {
                return;
            }

            if (null === this._startTime) {
                return;
            }

            this._daemon.pause();
            this._pausedTime = Date.now();
        },

        resume:function() {
            if (null === this._pausedTime || null === this._startTime) {
                return;
            }

            var duration = this._pausedTime - this._startTime;
            this._pausedTime = null;
            this._startTime = Date.now() - duration;

            this._daemon.play();
        },

        stop:function() {
            this._daemon.pause();
            this._startTime = null;
            this._pausedTime = null;
            this._totalTime = null;

            this._tick();
        },

        _tick:function() {
            if (this._startTime == null) {
                this._timerBar.progressbar('value', 0);
                $("#timer-label").text("00:00:000");
            } else {
                var timeElapsed = Date.now() - this._startTime;
                console.log(timeElapsed + ": " + this._totalTime);
                if (timeElapsed > this._totalTime) {
                    this.stop();
                } else {
                    this._timerBar.progressbar('value', timeElapsed / this._totalTime * 100);
                    $("#timer-label").text(parseTime(this._totalTime - timeElapsed));
                }
            }
        }
    };
})(this);
