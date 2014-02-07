// assets/js/WebSocketTestHandler.js

/**
 *  This event handler responds to the WebSocketClient, customizing the actions we take
 *  when it issues events such as onOpen or onMessage.
 *
 *  We implement this separately so that we can perform layout-specific changes while
 *  keeping the WebSocketClient abstracted from UI
 */
function WebSocketTestHandler(console) {
    this.con = console;
}



/**
 *  when the user tries to send a message,
 *  publish your message into the console
 */

WebSocketTestHandler.prototype.send = function(message) {
    /*hacer una funcion con nombre real el cliente agrega el texto pero el server no lo recive*/

    this.con.appendFromClient(message);
    console.log(message); //estomuestra que se envió
}

/**
 * upon connection,
 *   - exchange the Connect button for a Disconnect button,
 *   - allow user to send messages to the server,
 *   - notify user of the connection
 */
WebSocketTestHandler.prototype.onOpen = function() {
    $("#connected").html('<i class="icon-check"></i>');
    $("#connect").hide();
    $("#disconnect").show();
    $("#send").removeClass("disabled");
    $("#suma").removeClass("disabled");
};
/**
 *  when a message is recieved from the server,
 *  publish the server's message into the console
 */
WebSocketTestHandler.prototype.onMessage = function(e) {
    var message = e.data;
    this.con.appendFromServer(message);
    console.log("recibi: " + message);
};

/**
 * upon connection,
 *   - exchange the Connect button for a Disconnect button,
 *   - allow user to send messages to the server,
 *   - notify user of the connection
 */
WebSocketTestHandler.prototype.onClose = function() {
    $("#connected").html('<i class="icon-check-empty"></i>');
    $("#disconnect").hide();
    $("#connect").show();
    $("#send").addClass("disabled");
};

/**
 * if there was an error,
 * print the error into the console
 */
WebSocketTestHandler.prototype.onError = function(e) {
    var message = e.data;
    this.con.appendError(message);
};