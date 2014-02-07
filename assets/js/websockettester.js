// assets/js/websockettester.js

// initialize global variables
var Handler;
var WebSocketClient;

var KEY_SERVER_URI = "ws://localhost:8888";

/**
 * set up the actions and global variables on the page
 */


$(document).ready(function() {
    // initialize the console and the Handler
    Console = new Console($("#console"));
    Handler = new WebSocketTestHandler(Console);

    // load the saved serverURI into the serveruri input
    var server = localStorage.getItem(KEY_SERVER_URI);
    $("#serveruri").val(server);




    // assign event handler to the connect button
    $("#connect").click(function(e) {
        var server = $("#serveruri").val();
        var connection = new WebSocket(server);
        console.log("conected");
        // save the current serveruri so we don't have to type it all the time
        localStorage.setItem(KEY_SERVER_URI, server);
        window.connection;
        e.preventDefault();
    });



    // assign event handler to the send button
    $("#wariorAttack").click(function(e) {
        console.log("probando boton");
        var playerAttack = $("#playerAttack").val();
        var playerCrit = $("#playerCrit").val();
        var minionDefense = $("#minionDefense").val();
        var minionHealth = $("#minionHealth").val();
        var minionEvade = $("#minionEvade").val();
        message = {
            'type': 'warriorAttack',
            'attack': playerAttack,
            'crit': playerCrit,
            'defense': minionDefense,
            'health': minionHealth,
            'evade': minionEvade,
        }
        window.WebSocketClient.send(message);
        e.preventDefault();
        console.log(message);
    });

    $("#minionAttack").click(function(e) {
        var numero = $("#prompt").val();
        message = {
            'type': 'add',
            'number': numero,
        }
        window.WebSocketClient.send(message);
        $("#prompt").val('');
        e.preventDefault();
    });
});