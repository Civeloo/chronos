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
        llenarSelect();
        temporizador();


        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function llenarSelect() {
        var t = [
         $("#second")[0],
         $("#minute")[0],
         $("#hour")[0]
        ];
        for (var j = 0; j < t.length ; j++) {
            t[j].clear;
            (j < t.length - 1) ? t[j].length = 60 : t[j].length = 24;
            for (var i = 0; i < (t[j].length) ; i++) {
                t[j][i].text = i;
                t[j][i].value = i;
            }
            t[j].selected = true;
        }
        $("#hour").selectmenu("refresh");
        $("#minute").selectmenu("refresh");
        $("#second").selectmenu("refresh");
    }

    function temporizador() {
        var tiempo = {
            hora: 0,
            minuto: 0,
            segundo: 0
        };
        var cron = false;
        var tiempo_corriendo = null;
        $("#btn-comenzar").click(function () {
            if ($(this).text() == 'Comenzar') {
                $(this).text('Detener');
                tiempo.hora = $("#hour")[0].value;
                tiempo.minuto = $("#minute")[0].value;
                tiempo.segundo = $("#second")[0].value;
                tiempo_corriendo = setInterval(
                function () {
                    if ((tiempo.hora == 0) & (tiempo.minuto == 0) & (tiempo.segundo == 0)) {
                        cron = true;
                    }
                    if (cron) {
                        //cronometro
                        // Segundos
                        tiempo.segundo++;
                        if (tiempo.segundo >= 60) {
                            tiempo.segundo = 0;
                            tiempo.minuto++;
                        }

                        // Minutos
                        if (tiempo.minuto >= 60) {
                            tiempo.minuto = 0;
                            tiempo.hora++;
                        }
                    }
                    else {
                        //temporizador
                        // Segundos
                        if (tiempo.segundo > 0) tiempo.segundo--;
                        if ((tiempo.segundo == 0) & (tiempo.minuto > 0)) {
                            tiempo.segundo = 59;
                            tiempo.minuto--;
                        }
                        // Minutos
                        if ((tiempo.minuto == 0) & (tiempo.hora > 0)) {
                            tiempo.minuto = 59;
                            tiempo.hora--;
                        }
                    }

                    $("#hour")[0].selectedIndex = tiempo.hora;
                    $("#hour").selectmenu("refresh");
                    $("#minute")[0].selectedIndex = tiempo.minuto;
                    $("#minute").selectmenu("refresh");
                    $("#second")[0].selectedIndex = tiempo.segundo;
                    $("#second").selectmenu("refresh");

                    if ((tiempo.hora == 0) & (tiempo.minuto == 0) & (tiempo.segundo == 0)) {
                        $("#btn-comenzar").text('Comenzar');
                        clearInterval(tiempo_corriendo);
                        return;
                    }

                }, 1000);
            } else {
                $(this).text('Comenzar');
                clearInterval(tiempo_corriendo);
                cron = false;
                $("#hour")[0].selectedIndex = 0;
                $("#hour").selectmenu("refresh");
                $("#minute")[0].selectedIndex = 0;
                $("#minute").selectmenu("refresh");
                $("#second")[0].selectedIndex = 0;
                $("#second").selectmenu("refresh");
            }
        })
    }
})();