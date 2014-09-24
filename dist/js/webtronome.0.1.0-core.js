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

/**
 * Author: thegoldenmule
 * Date: 8/9/13
 */

(function (global) {
    "use strict";

    /**
     @class Easing

     @desc
     The MIT License

     Copyright (c) 2010-2012 Tween.js authors.

     Easing equations Copyright (c) 2001 Robert Penner http://robertpenner.com/easing/

     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:

     The above copyright notice and this permission notice shall be included in
     all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     THE SOFTWARE.

     */
    global.Easing = {

        Linear: {

            None: function ( k ) {

                return k;

            }

        },

        Quadratic: {

            In: function ( k ) {

                return k * k;

            },

            Out: function ( k ) {

                return k * ( 2 - k );

            },

            InOut: function ( k ) {

                if ( ( k *= 2 ) < 1 ) {
                    return 0.5 * k * k;
                }

                return - 0.5 * ( --k * ( k - 2 ) - 1 );

            }

        },

        Cubic: {

            In: function ( k ) {

                return k * k * k;

            },

            Out: function ( k ) {

                return --k * k * k + 1;

            },

            InOut: function ( k ) {

                if ( ( k *= 2 ) < 1 ) {
                    return 0.5 * k * k * k;
                }

                return 0.5 * ( ( k -= 2 ) * k * k + 2 );

            }

        },

        Quartic: {

            In: function ( k ) {

                return k * k * k * k;

            },

            Out: function ( k ) {

                return 1 - ( --k * k * k * k );

            },

            InOut: function ( k ) {

                if ( ( k *= 2 ) < 1) {
                    return 0.5 * k * k * k * k;
                }

                return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

            }

        },

        Quintic: {

            In: function ( k ) {

                return k * k * k * k * k;

            },

            Out: function ( k ) {

                return --k * k * k * k * k + 1;

            },

            InOut: function ( k ) {

                if ( ( k *= 2 ) < 1 ) {
                    return 0.5 * k * k * k * k * k;
                }

                return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

            }

        },

        Sinusoidal: {

            In: function ( k ) {

                return 1 - Math.cos( k * Math.PI / 2 );

            },

            Out: function ( k ) {

                return Math.sin( k * Math.PI / 2 );

            },

            InOut: function ( k ) {

                return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

            }

        },

        Exponential: {

            In: function ( k ) {

                return k === 0 ? 0 : Math.pow( 1024, k - 1 );

            },

            Out: function ( k ) {

                return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

            },

            InOut: function ( k ) {

                if ( k === 0 ) {
                    return 0;
                }

                if ( k === 1 ) {
                    return 1;
                }

                if ( ( k *= 2 ) < 1 ) {
                    return 0.5 * Math.pow( 1024, k - 1 );
                }

                return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

            }

        },

        Circular: {

            In: function ( k ) {

                return 1 - Math.sqrt( 1 - k * k );

            },

            Out: function ( k ) {

                return Math.sqrt( 1 - ( --k * k ) );

            },

            InOut: function ( k ) {

                if ( ( k *= 2 ) < 1) {
                    return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
                }

                return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

            }

        },

        Elastic: {

            In: function ( k ) {

                var s, a = 0.1, p = 0.4;
                if ( k === 0 ) {
                    return 0;
                }

                if ( k === 1 ) {
                    return 1;
                }

                if ( !a || a < 1 )
                {
                    a = 1; s = p / 4;
                }
                else {
                    s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
                }

                return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

            },

            Out: function ( k ) {

                var s, a = 0.1, p = 0.4;
                if ( k === 0 ) {
                    return 0;
                }

                if ( k === 1 ) {
                    return 1;
                }

                if ( !a || a < 1 )
                {
                    a = 1; s = p / 4;
                }
                else {
                    s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
                }

                return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

            },

            InOut: function ( k ) {

                var s, a = 0.1, p = 0.4;
                if ( k === 0 ) {
                    return 0;
                }

                if ( k === 1 ) {
                    return 1;
                }

                if ( !a || a < 1 )
                {
                    a = 1; s = p / 4;
                }
                else {
                    s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
                }

                if ( ( k *= 2 ) < 1 ) {
                    return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
                }

                return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

            }

        },

        Back: {

            In: function ( k ) {

                var s = 1.70158;
                return k * k * ( ( s + 1 ) * k - s );

            },

            Out: function ( k ) {

                var s = 1.70158;
                return --k * k * ( ( s + 1 ) * k + s ) + 1;

            },

            InOut: function ( k ) {

                var s = 1.70158 * 1.525;
                if ( ( k *= 2 ) < 1 ) {
                    return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
                }

                return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

            }

        },

        Bounce: {

            In: function ( k ) {

                return 1 - TWEEN.Easing.Bounce.Out( 1 - k );

            },

            Out: function ( k ) {

                if ( k < ( 1 / 2.75 ) ) {

                    return 7.5625 * k * k;

                } else if ( k < ( 2 / 2.75 ) ) {

                    return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

                } else if ( k < ( 2.5 / 2.75 ) ) {

                    return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

                } else {

                    return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

                }

            },

            InOut: function ( k ) {

                if ( k < 0.5 ) {
                    return TWEEN.Easing.Bounce.In( k * 2 ) * 0.5;
                }

                return TWEEN.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

            }

        }

    };
})(this);

/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.Metronome = function () {
        this.bpm = 120;
        this.noteValue = 4;

        this.Paused = new signals.Signal();
        this.Played = new signals.Signal();
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

            this.Played.dispatch();
        },

        pause:function() {
            if (!this._playing) {
                return;
            }

            this._daemon.pause();
            this._playing = false;

            this.Paused.dispatch();
        },

        _tick:function() {
            // doesn't support unusual meters...
            if (this.noteValue % 4 !== 0) {
                this.noteValue = 4;
            }

            var msPerTick = (1000 * 60) / (this.bpm * this.noteValue / 4);
            var currentTime = Date.now();
            var diff = currentTime - this._lastTime;

            if (diff >= msPerTick) {
                this._lastTime = this._lastTime + msPerTick;

                this.Ticked.dispatch();
            }
        }
    };
})(this);

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

/**
 * Author: thegoldenmule
 * Date: 9/21/14
 */

(function (global) {
    "use strict";

    global.TimerCurveView = function (metronome, timer) {
        var scope = this;

        var container = document.getElementById('timer-canvas-container');
        var paper = new Raphael(container, '100%', '100%');

        // draws background
        var width = container.offsetWidth;
        var height = container.offsetHeight;
        var bg = paper.rect(0, 0, width, height);
        bg.attr('fill', '#CCCCCC');
        bg.attr('stroke', '#AAAAAA');
        bg.attr('stroke-width', 3);

        // draw playhead
        var playhead = paper.path('m0,0l0,' + height);
        playhead.attr('stroke-width', 5);
        playhead.attr('stroke', '#DD1111');

        // draw curve
        var curve = paper.path('M0,0' + height + 'Q' + width / 2 + ',' + height + ',' + width + ',' + height);
        curve.attr('stroke', '#000000');

        var percentage = 0;
        var intervalId = 0;
        var originalBPM = 0;
        timer.Started.add(function() {
            originalBPM = metronome.bpm;

            intervalId = setInterval(function() {
                var t = timer.getProgress();
                playhead.transform('T' + t * width + ',0');

                // affect bpm
                var k = 1 - 2 * Math.abs(t - 0.5);
                var diff = originalBPM * percentage / 100;
                metronome.bpm = originalBPM + k * diff;
            }, 1);
        });

        timer.Stopped.add(function() {
            clearInterval(intervalId);
        });

        // buttons
        $('.timer-curve-button').click(function(event) {
            var attributes = event.target.attributes;
            for (var i = 0, len = attributes.length; i < len; i++) {
                var name = attributes[i].name;
                var value = attributes[i].value;
                if (name === 'timer-value') {
                    percentage = parseInt(value, 10);
                    if (0 === percentage) {
                        curve.remove();
                        curve = paper.path('M0,0' + height + 'Q' + width / 2 + ',' + height + ',' + width + ',' + height);
                    } else {
                        curve.remove();
                        curve = paper.path('M0,0' + height + 'Q' + width / 2 + ',-' + (percentage / 50 * 40) + ',' + width + ',' + height);
                    }
                    break;
                }
            }
        });
    };

    global.TimerCurveView.prototype = {
        constructor: global.TimerCurveView
    };
})(this);

/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    'use strict';

    function parseTwoDigit(digit) {
        if (digit < 10) {
            return '0' + digit;
        }

        return digit;
    }

    function parseThreeDigit(digit) {
        if (digit < 10) {
            return '00' + digit;
        }

        if (digit < 100) {
            return '0' + digit;
        }

        return digit;
    }

    function parseTime(milliseconds) {
        var minutes = Math.floor(milliseconds / 60000);
        milliseconds -= minutes * 60000;

        var seconds = Math.floor(milliseconds / 1000);
        milliseconds -= seconds * 1000;

        return parseTwoDigit(minutes) + ':' + parseTwoDigit(seconds) + ':' + parseThreeDigit(milliseconds);
    }

    global.TimerView = function (metronome) {
        var scope = this;

        this.Started = new signals.Signal();
        this.Stopped = new signals.Signal();
        this.Ended = new signals.Signal();

        this._metronome = metronome;

        $('.timer-button').click(function(event) {
            var attributes = event.target.attributes;
            for (var i = 0, len = attributes.length; i < len; i++) {
                var name = attributes[i].name;
                var value = attributes[i].value;
                if (name === 'timer-value') {
                    var minutes = parseFloat(value);
                    if (0 === minutes) {
                        scope.stop();
                    } else {
                        scope.start(minutes);
                    }
                    break;
                }
            }
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

        this._timerBar = $('#timer-progress').progressbar();
    };

    global.TimerView.prototype = {
        constructor: global.TimerView,

        getProgress:function() {
            if (null === this._startTime) {
                return 0;
            }

            if (null === this._pausedTime) {
                return (Date.now() - this._startTime) / this._totalTime;
            }

            return (this._pausedTime - this._startTime) / this._totalTime;
        },

        start:function(minutes) {
            this._pausedTime = null;
            this._startTime = Date.now();
            this._totalTime = minutes * 60000;

            this._daemon.play();
            this._metronome.play();

            this.Started.dispatch();
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

            this.Stopped.dispatch();
        },

        _tick:function() {
            if (null === this._startTime) {
                this._timerBar.progressbar('value', 0);
                $('#timer-label').text('00:00:000');
            } else {
                var timeElapsed = Date.now() - this._startTime;

                if (timeElapsed > this._totalTime) {
                    this.stop();
                    this._metronome.pause();
                    this.Ended.dispatch();
                } else {
                    this._timerBar.progressbar('value', timeElapsed / this._totalTime * 100);
                    $('#timer-label').text(parseTime(this._totalTime - timeElapsed));
                }
            }
        }
    };
})(this);

/**
 * Author: thegoldenmule
 * Date: 9/20/14
 */

(function (global) {
    "use strict";

    global.VisualizerView = function (metronome) {
        var color = '#FFFFFF';

        metronome.Ticked.add(function() {
            $('body')
                .animate(
                {
                    'backgroundColor':color
                },
                50,
                "swing",
                function() {
                    $('body')
                        .animate(
                        {
                            'backgroundColor':'#ffffff'
                        },
                        100);
                });
        });

        $('.vs-button').click(function(event) {
            // set color
            color = $(event.target).css('background-color');
        });
    };

    global.VisualizerView.prototype = {
        constructor: global.VisualizerView
    };
})(this);
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

