var fs;
var partitura_lida;
//document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 5 * 1024 * 1024,
			onFSSuccess, fail);
};

function iniciaGetFiles() {
	//alert("entrou no Device Ready");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 5 * 1024 * 1024,
			onFSSuccess, fail);
	//alert("passou");
};

// The directory path is without the prefix of the root directory!
function onFSSuccess(fileSystem) {
	this.fs = fileSystem;
};

function readFile(path) {
	//alert("entrei " + path + fs);
	fs.root.getFile(path, {
			create : false,
			exclusive : false
	}, function(fileEntry) {
		//alert("entrei function: " + path);
		// onSuccess
		fileEntry.file(function(file) {
			//alert("entrei fileentry: " + path);
			var reader = new FileReader();
			reader.onloadend = function(e) {
				if (e.target.readyState == FileReader.DONE) { // DONE == 2
					//alert("entrei iiiif: " + path);
					//document.getElementById('res_botao').value = this.result;
					//alert("mata tempo");
					var resultadoGet = this.result;
					resultadoGet = resultadoGet.replace(/"/g, "'");
					resultadoGet = resultadoGet.replace(/(?:\r\n|\r|\n)/g, "");
					
					//document.getElementById('res_botao').value = resultadoGet;
					partitura_lida = resultadoGet;
					var nomePart = document.getElementById("nome_part").value;			
					sendScore(studioid, nomePart, partitura_lida);
				}
			};
			reader.onerror = errorReaderHandler;
			reader.readAsText(file);
		},errorHandlerR);
	},errorHandlerR);
	//partitura_lida = part_simples;
};

function fail() {
	alert("Ocorreu um erro ao iniciar a aplicação");
};

function errorHandlerR(e) {
	alert("Ocorreu um erro ao acessar o arquivo");
	document.location.href='#upload';
	var msg = '';

	switch (e.code) {
	case FileError.QUOTA_EXCEEDED_ERR:
		msg = 'QUOTA_EXCEEDED_ERR';
		break;
	case FileError.NOT_FOUND_ERR:
		msg = 'NOT_FOUND_ERR';
		break;
	case FileError.SECURITY_ERR:
		msg = 'SECURITY_ERR';
		break;
	case FileError.INVALID_MODIFICATION_ERR:
		msg = 'INVALID_MODIFICATION_ERR';
		break;
	case FileError.INVALID_STATE_ERR:
		msg = 'INVALID_STATE_ERR';
		break;
	default:
		msg = 'Unknown Error';
		break;
	};
	console.log('Error: ' + msg);
};

function errorReaderHandler(evt) {
	alert("Ocorreu um erro ao ler o arquivo");
	switch(evt.target.error.code) {
	  case evt.target.error.NOT_FOUND_ERR:
		msg = 'File Not Found!';
	    break;
	  case evt.target.error.NOT_READABLE_ERR:
		 msg = 'File is not readable';
	    break;
	  case evt.target.error.ABORT_ERR:
		 msg = 'ABORT, ABORT!';
		break; // noop
	  default:
		 msg = 'Unkown Error';
	  	break;
    };
    console.log('Erro ao ler arquivo: ' + msg);
};