var fs;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 5 * 1024 * 1024,
			onFSSuccess, fail);
};

// The directory path is without the prefix of the root directory!
function onFSSuccess(fileSystem) {
	this.fs = fileSystem;
	fileSystem.root.getDirectory("EasyScore", {
		create : true,
		exclusive : false
	}, doDirectoryListing, fail);
};

// dirEntry needs to be a parameter of the function!
function doDirectoryListing(dirEntry) {
	var directoryReader = dirEntry.createReader();
	directoryReader.readEntries(gotFiles, FileError);
};

function gotFiles(entries) {
	for (var i = 0, len = entries.length; i < len; i++) {
		if (entries[i].isDirectory) {
			alert("Directory: " + entries[i].name);
			$('ul').append($('<li/>', { // here appending `<li>`
				'data-role' : "list-divider"
			}).append($('<a/>', { // here appending `<a>` into `<li>`
				'href' : '#musica_info',
				'data-transition' : 'fade',
				'text' : entries[i].name
			})));
		} else if (entries[i].isFile) {
			alert("File: " + entries[i].toURL());
			alert("Type of entries[i]: " + typeof entries[i]);
			document.getElementById('entry_path').textContent = "Entry: "
					+ entries[i].fullPath;
			var file = new File(entries[i].name, entries[i].fullPath);

			document.getElementById('file_size').textContent = file.size;
			document.getElementById('file_path').textContent = "File: "
					+ file.localURL;
			var reader = new FileReader();

			// fs.root.getFile("EasyScore", {create: true, exclusive: false},
			// doDirectoryListing, fail);
			entries[i].file(function(file) {
				var reader = new FileReader();

				reader.onloadend = function(e) {
					var txtArea = document.createElement('textarea');
					txtArea.value = this.result;
					document.body.appendChild(txtArea);
				};

				reader.readAsText(file);
			}, errorHandler);
			/*
			 * / If we use onloadend, we need to check the readyState.
			 * reader.onloadend = function(evt) { if (evt.target.readyState ==
			 * FileReader.DONE) { // DONE == 2
			 * document.getElementById('byte_content').textContent =
			 * evt.target.result; } };
			 * 
			 * var blob = file.slice(1, 4); reader.readAsBinaryString(blob);
			 */
//			readXML();
		}
	}
};
function fail() {
	alert("fail");
};

function success() {
	alert("success");
};
function errorHandler(e) {
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
	}
	;

	console.log('Error: ' + msg);
};
function readXML() {
	var variavel = "EasyScore/teste.txt";
	$.ajax({
		type : "GET",
		url : variavel,
		dataType : "text",
		success : function(xml) {
			alert(xml);
			// $('#meuXML').html(xml)
			// caso for necessário pode usar assim para converter xml em texto
			// $('#meuXML').html($(xml).text());
			// caso Jquery não suporte a function .text()
			// caso for necessário pode usar assim para converter xml em texto
			// $('#meuXML').html((new XMLSerializer()).serializeToString(xml));
		}
	});
};

/*
 * 
 * 
 * http://www.raymondcamden.com/index.cfm/2014/2/17/Cordova-File-System--Important-Update
 * http://www.html5rocks.com/en/tutorials/file/filesystem/ --DOCUMENTAÇÃO HTML
 * https://gist.github.com/rosshanney/9060654 --'temp.wav'
 * https://gist.github.com/devgeeks/4982983 --example-download-and-open.js
 * http://stackoverflow.com/questions/20836040/window-requestfilesystem-is-undefined-in-ver-3-3-0
 * 
 * SOMENTE PARA LINKS:
 * http://stackoverflow.com/questions/21941731/cordova-phonegap-open-downloaded-file-inappbrowser
 * 
 * http://docs.phonegap.com/en/1.4.1/phonegap_file_file.md.html
 * https://developer.mozilla.org/en-US/docs/Web/API/DirectoryEntry
 * https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md
 * --PLUGIN http://cordova.apache.org/docs/en/2.5.0/cordova_file_file.md.html
 * --DOCUMENTAÇÃO PHONEGAP (ANTIGA)
 * https://cordova.apache.org/docs/en/3.0.0/cordova_file_file.md.html#DirectoryEntry //
 * http://stackoverflow.com/questions/11062882/get-all-filenames-using-phonegap-file-api
 */