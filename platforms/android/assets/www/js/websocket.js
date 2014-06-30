var wsUri = "ws://54.207.48.208/easyscore/websocket/easy";
var output;
var message;
function init() {
	output = document.getElementById("testeWebSocket");
	testWebSocket();
};
function testWebSocket() {
	websocket = new WebSocket(wsUri);
	websocket.onopen = function(evt) {
		onOpen(evt)
	};
	websocket.onclose = function(evt) {
		onClose(evt)
	};
	websocket.onmessage = function(evt) {
		onMessage(evt)
	};
	websocket.onerror = function(evt) {
		onError(evt)
	};
};
function onOpen(evt) {
	writeToScreen("CONNECTED");
};
function onClose(evt) {
	writeToScreen("DISCONNECTED");
};
function onMessage(evt) {
	writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data
			+ '</span>');
	message = evt.data;
	document.getElementById('strRes').value = evt.data;
	websocket.close();
};
function onError(evt) {
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
};
function doSend(message) {
	writeToScreen("SENT: " + message);
	websocket.send(message);
};
function writeToScreen(message) {
	var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = message;
	output.appendChild(pre);
};
function createGroup(name) {
	var create = '{"type": "create","values": [{"name": "' + name + '"}]}';
	doSend(create);
};
function listGroup(name) {
	var create = '{"type": "list"}';
	doSend(create);
};
document.addEventListener("deviceready", init, false);