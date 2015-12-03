// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {

    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        fillSelect();
        count();
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.                
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function fillSelect() {
        var t = [
             document.getElementById("centisecond"),
             document.getElementById("second"),
             document.getElementById("minute"),
             document.getElementById("hour")
        ];

        for (var j = 0; j < t.length ; j++) {
            t[j].clear;
            t[j].length = (j == 0) ? 100 :
                          (j == 3) ? 24 :
                          60;
            for (var i = 0; i < (t[j].length) ; i++) {
                t[j][i].text = (i < 10) ? "0" + i : i;
            }
            t[j].selected = true;
        }
    };

    function count() {
        var time = new timeO(0, 0, 0, 0);
        var cd = undefined;
        var time_running = undefined;
        var c = 1.6;//calibrate
        var myMedia = new Media("sounds/bellbox.mp3")
        document.getElementById("btn-start").onclick = function () {
            ((this).innerText == 'start') ? play() : stop();
        };
        function timeO(hour, minute, second, centisecond) {
            this.hour = hour;
            this.minute = minute;
            this.second = second;
            this.centisecond = centisecond;
        }
        function play() {
            time = new timeO(
            document.getElementById("hour").value,
            document.getElementById("minute").value,
            document.getElementById("second").value,
            document.getElementById("centisecond").value
            );
            (isZero()) ? cd = undefined : cd = new timeO(time.hour, time.minute, time.second, time.centisecond);
            document.getElementById("btn-start").innerHTML = "stop";
            time_running = setInterval(run, 10);
        }
        function isZero() {
            return ((time.hour < 1) & (time.minute < 1) & (time.second < 1) & (time.centisecond < 1));
        }
        function run() {
            (isCountdown()) ? countdown() : chronometer();
            update();
            if (isZero()) stop();
        }
        function isCountdown() {
            return (cd != undefined);
        }
        function chronometer() {
            // centiseconds  
            time.centisecond = parseFloat(time.centisecond) + c;
            if (time.centisecond > 99) {
                time.centisecond = 0;
                time.second++;
                // seconds
                if (time.second > 59) {
                    time.second = 0;
                    time.minute++;
                    // minutes
                    if (time.minute > 59) {
                        time.minute = 0;
                        time.hour++;
                    }
                }
            }
        }
        function countdown() {
            // centiseconds
            if (time.centisecond > 0) time.centisecond = parseFloat(time.centisecond) - c;
            if ((time.centisecond < 1) & (time.second > 0)) {
                time.centisecond = 99;
                if (time.second > 0) time.second--;
            }
            // seconds                       
            if ((time.second == 0) & (time.minute > 0)) {
                time.second = 59;
                time.minute--;
            }
            // minutes
            if ((time.minute == 0) & (time.hour > 0)) {
                time.minute = 59;
                time.hour--;
            }
        }
        function stop() {
            clearInterval(time_running);
            time_running = undefined;
            (isCountdown()) ? myMedia.play() : createList();
            reset();
        }
        function createList() {
            var ol = document.getElementById("lap");
            var li = document.createElement("li");
            li.innerHTML =
            document.getElementById("hour").value +
            ":" + document.getElementById("minute").value +
            ":" + document.getElementById("second").value +
            ":" + document.getElementById("centisecond").value;
            ol.appendChild(li);
        }
        function reset() {
            document.getElementById("btn-start").innerHTML = "start";
            time = (isCountdown()) ? new timeO(cd.hour, cd.minute, cd.second, cd.centisecond) : new timeO(0, 0, 0, 0);
            update();
        }
        function update() {
            document.getElementById("centisecond").selectedIndex = (parseFloat(time.centisecond)).toFixed();
            document.getElementById("second").selectedIndex = time.second;
            document.getElementById("minute").selectedIndex = time.minute;
            document.getElementById("hour").selectedIndex = time.hour;
        }
    };
        
})();