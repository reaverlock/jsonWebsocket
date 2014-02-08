// assets/js/websockettester.js

// initialize global variables

var KEY_SERVER_URI = "ws://localhost:8888";
var connection;
/**
 * set up the actions and global variables on the page
 */


$(document).ready(function() {

    // load the saved serverURI into the serveruri input
    var server = localStorage.getItem(KEY_SERVER_URI);
    $("#serveruri").val(server);




    // assign event handler to the connect button
    $("#connect").click(function(e) {
        var server = $("#serveruri").val();
        // crear conexion
        connection = new WebSocket(server);
        console.log("clicked connect");
        // save the current serveruri so we don't have to type it all the time
        localStorage.setItem(KEY_SERVER_URI, server);
        window.connection;
        connection.onopen = function() {
            /*Send a small message to the console once the connection is established */
            console.log('Connection open!');
        }
        e.preventDefault();
    });





    // assign event handler to the send button
    $("#warriorAttack").click(function(e) {
        var playerAttack = $("#playerAttack").text();
        var playerCrit = $("#playerCrit").text();
        var minionDefense = $("#minionDefense").text();
        var minionHealth = $("#minionHealth").text();
        var minionEvade = $("#minionEvade").text();
        message = {
            'type': 'warriorAttack',
            'attack': playerAttack,
            'defense': minionDefense,
            'health': minionHealth,
            'evade': minionEvade,
        }
        connection.send(JSON.stringify(message));
        console.log(message);

        // mensaje regresado x el server
        connection.onmessage = function(e) {
            var server_message = e.data;
            console.log('button2 ' + server_message);

            //convierto a int

            $('#minionHealth').text(server_message);
            if (server_message < '1') {
                $('#minionHealth').text("R.I.P");
            }
        }
        e.preventDefault();

    });


});