var wsTime = "ws://campeche.inf.furb.br:8094/lotkaVolterraWeb/server";
//var wsTime = "ws://echo.websocket.org";
var output;
var message;
var websocketTime;
function initTime() {
	testTimeWebSocket();
};
function testTimeWebSocket() {
	websocketTime = new WebSocket(wsTime);
	websocketTime.onopen = function(evt) {
		onOpen(evt)
	};
	websocketTime.onclose = function(evt) {
		onClose(evt)
	};
	websocketTime.onmessage = function(evt) {
		onMessage(evt)
	};
	websocketTime.onerror = function(evt) {
		onError(evt)
	};
};
function onOpen(evt) {
	alert("CONNECTED");
};
function onClose(evt) {
	alert("DISCONNECTED");
};
function onMessage(evt) {
	d.setTime();
	alert('RESPONSE: ' + evt.data);
	alert('Date: ' + d);
};
function onError(evt) {
	alert('ERROR: ' + evt.data);
};
function doSend(message) {
	alert("SENT: " + message);
	websocketTime.send(message);
};
function getTime() {
	var create = 'time';
	doSend(create);
};
function close() {
	websocketTime.close();
};
document.addEventListener("load", initTime, false);