document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 5*1024*1024, onFSSuccess, fail);
    //window.requestFileSystem(LocalFileSystem.PERSISTENT, 5*1024*1024, gotFS, fail);
    //window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
}

function gotFS(fileSystem) {
   var root = new DirectoryEntry(fileSystem.root.fullPath);

   //Get a directory reader
   var directoryReader = root.createReader();
   directoryReader.readEntries(gotFiles,fail);	
}

//The directory path is without the prefix of the root directory!
function onFSSuccess(fileSystem) {
	fileSystem.root.getDirectory("EasyScore", {create: true, exclusive: false}, doDirectoryListing, fail);
}

//dirEntry needs to be a parameter of the function!
function doDirectoryListing(dirEntry) {
	var directoryReader = dirEntry.createReader();
	directoryReader.readEntries(gotFiles, FileError);
}

function gotFiles(entries) {
	for(var i=0,len=entries.length; i<len; i++) {
		if (entries[i].isDirectory) {
			alert("Directory: " + entries[i].name);
			$('ul').append($('<li/>', { //here appending `<li>`
				'data-role' : "list-divider"
			}).append($('<a/>', { //here appending `<a>` into `<li>`
				'href' : '#musica_info',
				'data-transition' : 'fade',
				'text' : entries[i].name
			})));
		} else if (entries[i].isFile) {
			alert("File: " + entries[i].name);
			document.getElementById('entry_path').textContent = "Entry: " + entries[i].fullPath;
			var file = new File(entries[i].name, entries[i].fullPath);
			
			document.getElementById('file_size').textContent = file.size;
			document.getElementById('file_path').textContent = "File: " + file.localURL;
			var reader = new FileReader();

		    // If we use onloadend, we need to check the readyState.
		    reader.onloadend = function(evt) {
		      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
		        document.getElementById('byte_content').textContent = evt.target.result;
		      }
		    };

		    var blob = file.slice(1, 4);
		    reader.readAsBinaryString(blob);
		}
	}
}
function fail() {
	alert("fail");
}

function success() {
	alert("success");
}
/*
 * 

http://www.raymondcamden.com/index.cfm/2014/2/17/Cordova-File-System--Important-Update
http://www.html5rocks.com/en/tutorials/file/filesystem/ --DOCUMENTAÇÃO HTML
https://gist.github.com/rosshanney/9060654 --'temp.wav'
https://gist.github.com/devgeeks/4982983 --example-download-and-open.js
http://stackoverflow.com/questions/20836040/window-requestfilesystem-is-undefined-in-ver-3-3-0

SOMENTE PARA LINKS: http://stackoverflow.com/questions/21941731/cordova-phonegap-open-downloaded-file-inappbrowser

http://docs.phonegap.com/en/1.4.1/phonegap_file_file.md.html
https://developer.mozilla.org/en-US/docs/Web/API/DirectoryEntry
https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md --PLUGIN
http://cordova.apache.org/docs/en/2.5.0/cordova_file_file.md.html --DOCUMENTAÇÃO PHONEGAP (ANTIGA)
https://cordova.apache.org/docs/en/3.0.0/cordova_file_file.md.html#DirectoryEntry

function onInitFs(fs) {

  fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
	//  fileEntry.toURL(opt_mimeType);
    // fileEntry.isFile === true
    // fileEntry.name == 'log.txt'
    // fileEntry.fullPath == '/log.txt'
	  fileEntry.file(function(file) {
	       var reader = new FileReader();

	       reader.onloadend = function(e) {
	         var txtArea = document.createElement('textarea');
	         txtArea.value = this.result + " oh yeah, I am updated";
	         document.body.appendChild(txtArea);
	       };

	       reader.readAsText(file);
	    }, errorHandler);

  }, errorHandler);

}

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
  };

  console.log('Error: ' + msg);
}

/*
 * http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/
 * https://groups.google.com/forum/#!topic/phonegap/jsMF9Qf4918
 * http://my.safaribooksonline.com/book/programming/mobile/9780132928373/18dot-file/ch18lev1sec3
 * function success(entries) {
    var i;
    for (i=0; i<entries.length; i++) {
        console.log(entries[i].name);
    }
}

function fail(error) {
    alert("Failed to list directory contents: " + error.code);
}

// Get a list of all the entries in the directory
function getFiles() {
	document.addEventListener("deviceready", onDeviceReady, false);
	var parent = document.getElementById('parent').value;
	parentEntry = new DirectoryEntry({fullPath: parent});
	
	//Get a directory reader
	var directoryReader = parentEntry.createReader();

	directoryReader.readEntries(success,fail);	
}

document.addEventListener("deviceready", onDeviceReady, false);

//function onDeviceReady() {

function getFiles() {
	alert("uhum");
	//window.resolveLocalFileSystemURL();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFileEntry(fileEntry) {
	var localpath = fileEntry.fullPath;
	alert(localpath);
}
function gotFS(fileSystem) {
	var reader = fileSystem.root.createReader();
	reader.readEntries(gotList, fail);
}
function gotList(entries) {
	var i;
	for (i = 0; i < entries.length; i++) {
		if (entries[i].name.indexOf(".svg") != -1) {
			alert(entries[i].fullPath);
		}
	}
}
function fail() {
	alert("fail");
}

/*javascript: (function(e) {
	e.setAttribute("src",
			"http://192.168.0.4:8080/target/target-script-min.js#anonymous");
	document.getElementsByTagName("body")[0].appendChild(e);
})(document.createElement("script"));
void (0);
// http://stackoverflow.com/questions/11062882/get-all-filenames-using-phonegap-file-api
*/