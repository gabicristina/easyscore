
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    alert("ready");
    window.requestFileSystem(window.TEMPORARY, 5*1024*1024, gotFS, fail);
    //window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024*1024, onInitFs, errorHandler);
}

function gotFS(fileSystem) {
   alert("got fs");
   alert(fileSystem.root.fullPath);
}

function fail() {
	alert("fail");
}
/*
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
}*/

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