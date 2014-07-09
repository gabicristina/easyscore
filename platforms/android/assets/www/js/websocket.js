var wsUri = "ws://54.207.48.208/easyscore/websocket/easy";
var output;
var message;
function init() {
	output = document.getElementById("af-footer");
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
	listStudio();
};
function onClose(evt) {
	writeToScreen("DISCONNECTED");
};
function onMessage(evt) {
	writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data
			+ '</span>');
	message = evt.data;
	var obj = JSON.parse(evt.data);
	if (obj.hasOwnProperty('studios')) {
		$("#listaEstudios").children("li").remove();
		for (var i = 0; i<obj.studios.length; i++) {
			alert(obj.studios[i]);
			$('#listaEstudios').append($('<li/>', { // here appending `<li>`
				'data-role' : "list-divider"
			}).append($('<a/>', { // here appending `<a>` into `<li>`
				'href' : '#selecionaPart',
				'data-transition' : 'fade',
				'text' : obj.studios[i].name
			})));
		}
	}
	//document.getElementById('strRes').value = evt.data;
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
	output.insertBefore(pre, output.firstChild);
};
function createStudio(name) {
	var create = '{"type": "create","values": [{"name": "' + name + '"}]}';
	doSend(create);
};
function listStudio() {
	var listGroup = '{"type": "list","values": []}';
	doSend(listGroup);
};
function joinStudio(idStudio) {
	var joinGroup = '{"type": "join","values": [{"studio_id": "' + idStudio
			+ '",}]}';
	doSend(joinGroup);
};
function sendScore(idStudio, nome, score) {
	var sendScore = '{"type": "send_score", "values": [{ \
	                    "studio_id": "' + idStudio + '",\
	                    "name": "' + nome + '",\
	                    "content": "' + score + '"}]}';
	doSend(sendScore);
};
function getScore(idStudio, idScore) {
	var getScore = '{"type": "get_score", "values": [{\
						"studio_id": "'
			+ idStudio + '",\
						"score_id": "' + idScore + '"}]}';
	doSend(getScore);
};
function notify(idStudio) {
	var notify = '{"type": "notify", "values": [{"studio_id": "' + idStudio
			+ '"}]}';
	doSend(notify);
};
function close() {
	websocket.close();
};
document.addEventListener("deviceready", init, false);