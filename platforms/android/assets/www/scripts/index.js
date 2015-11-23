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

    function count() {
        var time = {
            hour: 0,
            minute: 0,
            second: 0,
            centisecond: 0
        }
        var chr = false;
        var time_running = undefined;
        function resetT() {
            $("#btn-start").text('start');
            chr = false;
            time.hour = 0;
            time.minute = 0;
            time.second = 0;
            time.centisecond = 0;
            update();
        }
        function update() {
            $("#centisecond")[0].selectedIndex = time.centisecond;
            $("#second")[0].selectedIndex = time.second;
            $("#minute")[0].selectedIndex = time.minute;
            $("#hour")[0].selectedIndex = time.hour;          
        }
        function chronometer() {
            // centiseconds
            time.centisecond++;
            if (time.centisecond >= 100) {
                time.centisecond = 0;
                time.second++;
            }
            // seconds
            if (time.second >= 60) {
                time.second = 0;
                time.minute++;
            }
            // minutes
            if (time.minute >= 60) {
                time.minute = 0;
                time.hour++;
            }
        }
        function countdown() {
            // centiseconds
            if (time.centisecond > 0) time.centisecond--;
            if ((time.centisecond == 0) & (time.second > 0)) {
                time.centisecond = 100;
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
            createList();
            resetT();            
        }
        function isZero() {
            return ((time.hour == 0) & (time.minute == 0) & (time.second == 0) & (time.centisecond == 0)) ? true : false;
        }
        function run() {
            (chr) ? chronometer() : countdown();
            update();
            if (isZero()) stop();
        }        
        function play() {           
            time.hour = $("#hour")[0].value;
            time.minute = $("#minute")[0].value;
            time.second = $("#second")[0].value;
            time.centisecond = $("#centisecond")[0].value;
            if (isZero())  chr = true;
            $("#btn-start").text('stop');
            time_running = setInterval(run, 10);
        }
        function createList() {
            var ol = document.getElementById("lap");
            var li = document.createElement("li");              
            li.innerHTML = 
            $("#hour")[0].value +
            ":" + $("#minute")[0].value +
            ":" + $("#second")[0].value +
            ":" + $("#centisecond")[0].value;
            ol.appendChild(li);
        }
      
        $("#btn-start").click( 
            function(){
                ($(this).text() == 'start') ? play() : stop(); 
            }
        );
   }

    function fillSelect() {
        var t = [
         $("#centisecond")[0],
         $("#second")[0],
         $("#minute")[0],
         $("#hour")[0]
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
    }

})();