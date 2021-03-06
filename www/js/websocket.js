﻿var wsUri = "ws://campeche.inf.furb.br:8094/easyscore/websocket/easy";
//var wsUri = "ws://campeche.inf.furb.br:8094/lotkaVolterraWeb/server"
var output;
var message;
var doc;

function init() {
	output = document.getElementById("af-footer");
	testWebSocket();
};

function testWebSocket() {
	try {
		websocket = new WebSocket(wsUri);
	} catch (err) {
		alert("Error" + err.message);
	}
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
	console.log("WebSocket open");
	listStudio();
};
function onClose(evt) {
	alert("Conexão com o servidor encerrada");
	writeToScreen("DISCONNECTED");
};
function onMessage(evt) {
	//alert("onMessage");
	writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data
			+ '</span>');
	message = evt.data;
	var obj = JSON.parse(evt.data);
	console.log(" ONMESSAGE --------------- ");
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) 
			console.log(key + " -> " + obj[key]);
	}
	if (obj.hasOwnProperty('studios')) {
		$("#listaEstudios").children("li").remove();
		if (obj.studios.length <= 0) { //VALIDAR ESSA PARTE
			$('<li>').text("Não há estúdios disponíveis").prependTo("#listaEstudios");
		}
		for (var i = 0; i<obj.studios.length; i++) {
			if (obj.studios[i].name != "") {
				var dstart = new Date(obj.studios[i].start);
				$('#listaEstudios').append($('<li/>', { // here appending `<li>`
					'id' : "studio" + obj.studios[i].id,
					'value' : obj.studios[i].name
				}).append($('<a/>', { // here appending `<a>` into `<li>`
					'href'  : '#selecionaPart',
					'class' : "ui-btn ui-btn-icon-right ui-icon-carat-r",
					'text'  : obj.studios[i].name + " - " + dstart.getHours() + ":" + dstart.getMinutes()
				})));
			}
		}
		$('#listaEstudios li').click(function() {
			studioid = this.id.substr(6,this.id.length);
			//alert($("#"+this.id).value);
			$('#selecionaPartH1').text(this.name);
			listScore(studioid);
		});
	} else if (obj.hasOwnProperty('scores')) {
		//alert("scores");
		var list = document.getElementById("listaPartEst");
		$("#listaPartEst").children("li").remove();
		$("#listaPart").children("li").remove();
		if (obj.scores.length <= 0) {
			$('#listaPartEst').append($('<li/>', {'text' : "Não há partituras disponíveis"}));
			$('#listaPart').append($('<li/>', {'text' : "Não há partituras disponíveis"}));
		} else {
			for (var i = 0; i<obj.scores.length; i++) {
				if (obj.scores[i].name != "") {
					$('#listaPart').append($('<li/>', { // here appending `<li>`
						'id' : "score" + obj.scores[i].id,
						'value' : obj.scores[i].name
					}).append($('<a/>', { // here appending `<a>` into `<li>`
						'href'  : '#mainpage',
						'class' : "ui-btn ui-icon-carat-r",
						'text'  : obj.scores[i].name
					})));
					$('#listaPartEst').append($('<li/>', { // here appending `<li>`
						'id' : "score" + obj.scores[i].id,
						'value' : obj.scores[i].name
					}).append($('<a/>', { // here appending `<a>` into `<li>`
						'href'  : '#',
						'class' : "ui-btn ui-icon-carat-r",
						'text'  : obj.scores[i].name
					})));
				}
			}
		}
		$('#listaPartEst li').click(function() {
			scoreid = this.id.substr(5,this.id.length);
			//alert(scoreid);
			$('#selecionaPartH1').text(this.name);
			addScore(studioid, scoreid);
			document.getElementById('btn_selec').style.display="block";
			listStudio();
		});
		$('#listaPart li').click(function() {
			scoreid = this.id.substr(5,this.id.length);
			//alert(scoreid);
			$('#selecionaPartH1').text(this.name);
			joinStudio(studioid, scoreid);
		});
	} else if (obj.hasOwnProperty('join')) {
		/*alert("join: studio_vel-" + obj.join[0].studio_vel + " obj.tempo-" +
			obj.join[0].tempo);*/
		timestartvar = setTimeout(function(){
			//alert("timeout - " + obj.join[0].score_content);
			document.location.href='#exibePart';
			velPart = obj.join[0].studio_vel;
			//setDoc(part_simples);
			
			/*if (obj.join[0].score_content === "echigo") {
				setDoc(ishigo);
				console.log("ishigo");
			} else */if (obj.join[0].score_content === "dupla") {
				setDoc(part_dupla);
				console.log("dupla");
			} else if (obj.join[0].score_content === "simples_sem_text") {
				setDoc(part_sem_text);
				console.log("simples_sem_text");
			} else if (obj.join[0].score_content === "simples") {
				setDoc(part_simples);
				console.log("simples");
			} else {
				partitura_lida = obj.join[0].score_content;
				setDoc(partitura_lida);
				console.log("partitura do servidor - " + obj.join[0].score_name);
			}
			
			drawLine();
			
			var nBlocks = doc.getNumberOfMeasures() * 100;
			console.log("WEBSOCKET: número de compassos da partitura: " + doc.getNumberOfMeasures() + "    " + nBlocks);
			document.getElementById('exibe_info').scrollLeft = -500;
			scrollBlocksIntoView(nBlocks, velPart);			
		}, obj.join[0].tempo);
		document.getElementById('btn_pause').style.display="block";
		document.getElementById('btn_continue').style.display="none";
		alert("Execução agendada");
	} else if (obj.hasOwnProperty('studio')) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) 
				console.log(key + " -> " + obj[key]);
		}
		//alert("obj.id: " + obj.studio.id);
		studioid = obj.studio.id;
		listScore(null);
	} 
	//document.getElementById('strRes').value = evt.data;
};
function onError(evt) {
	//alert("onError");
	alert("Erro: " + evt.data);
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
	//output.insertBefore(pre, output.firstChild);
};
function createStudio(name, start, speed) {
	var create = '{"type": "create","values": [{"name": "' + name + '","start": "' + start + '", "speed":' + speed+ '}]}';
	doSend(create);
	document.getElementById('criaEstStart').value = "";
	document.getElementById('criaEstName').value = "";
};
function listStudio() {
	var listGroup = '{"type": "list","values": []}';
	doSend(listGroup);
};
function joinStudio(idStudio, idScore) {
	var joinGroup = '{"type": "join","values": [{"studio_id": ' + idStudio	+ ',"score_id":'+ idScore + '}]}';
	//alert(joinGroup);
	doSend(joinGroup);
};
function sendScore(idStudio, nome, score) {
	if (idStudio === null || idStudio === undefined) {
		var vsendScore = '{"type": "send_score", "values": [{ \
	                    "name": "' + nome + '",\
	                    "content": "' + score + '"}]}';
	} else {
		var vsendScore = '{"type": "send_score", "values": [{ \
	                    "studio_id": ' + idStudio + ',\
	                    "name": "' + nome + '",\
	                    "content": "' + score + '"}]}';
	}
	console.log(vsendScore);
	//alert(vsendScore);
	doSend(vsendScore);
	document.getElementById("nome_part").value = "";
	document.getElementById("arquivo").value = "";
	alert("Partitura enviada");
};
function addScore(idStudio, idScore) {
	var addScore = '{"type": "add_score", "values": [{\
						"studio_id": ' + idStudio + ',\
						"score_id": ' + idScore + '}]}';
	//alert(addScore);
	doSend(addScore);
}
function getScore(idStudio, idScore) {
	var getScore = '{"type": "get_score", "values": [{\
						"studio_id": ' + idStudio + ',\
						"score_id": ' + idScore + '}]}';
	doSend(getScore);
};
function listScore(idStudio) {
	if (idStudio === null) {
		var getScore = '{"type": "list_all_scores"}';
	} else {
		var getScore = '{"type": "list_all_scores","values": [{\
				"studio_id": ' + idStudio + '}]}';
	}
	doSend(getScore);
};
function getTime() {
	var vgetTime = '{"type": "server_time"}';
	doSend(vgetTime);
}
function close() {
	websocket.close();
};
document.addEventListener("deviceready", init, false);