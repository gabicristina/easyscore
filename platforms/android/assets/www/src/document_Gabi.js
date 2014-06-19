/**
 * VexFlow - Document Tests (JSON and MusicXML)
 * @author Daniel Ringwalt (ringw)
 */

Vex.Flow.Test.Document = {};

Vex.Flow.Test.Document.Start = function() {
  module("Document");
  Vex.Flow.Test.runTest("Basic MusicXML Test", Vex.Flow.Test.Document.xmlSimple);
  Vex.Flow.Test.runTest("MusicXML Document Test", Vex.Flow.Test.Document.xmlDoc);
};
Vex.Flow.Test.Document.xmlSimple = function(options, contextBuilder) {
  expect(2);

  var docString = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\
<!DOCTYPE score-partwise PUBLIC\
    "-//Recordare//DTD MusicXML 3.0 Partwise//EN"\
    "http://www.musicxml.org/dtds/partwise.dtd">\
<score-partwise version="3.0">\
  <part-list>\
    <score-part id="P1">\
      <part-name>Music</part-name>\
    </score-part>\
  </part-list>\
  <part id="P1">\
    <measure number="1">\
      <attributes>\
        <divisions>1</divisions>\
        <key>\
          <fifths>0</fifths>\
        </key>\
        <time>\
          <beats>4</beats>\
          <beat-type>4</beat-type>\
        </time>\
        <clef>\
          <sign>G</sign>\
          <line>2</line>\
        </clef>\
      </attributes>\
      <note>\
        <pitch>\
          <step>C</step>\
          <octave>4</octave>\
        </pitch>\
        <duration>4</duration>\
        <type>whole</type>\
      </note>\
    </measure>\
  </part>\
</score-partwise>';
  var doc = new Vex.Flow.Document(docString);
  ok(true, "created document");

  var ctx = new contextBuilder(options.canvas_sel, 300, 120);
  doc.getFormatter().setWidth(300).drawBlock(0, ctx);
  ok(true, "drew document");
};

function fetch() {
	var i = 1;
/*  var req = new XMLHttpRequest();
  //req.setRequestHeader("Access-Control-Allow-Origin", "*");
  //req.setRequestHeader("allow-file-access-from-files");
  req.open('GET', uri, false);
  req.send(null);
  if (req.readyState != 4) return undefined;
  return req.responseText;*/
	fs.root.getFile("EasyScore/chant.xml", {
			create : false,
			exclusive : false
	}, function(fileEntry) {
		// onSuccess
		var fe = fileEntry;
		var reader = new FileReader();
		alert("conseguiu entrar no fileentry " + fe.localURL);
		reader.onloadend = function(e) {
			document.getElementById('read_text').textContent = this.result;
			document.getElementById('read_text').value = this.result;
			document.getElementById('read_text_p').textContent = file.size;
			alert("onloadend");
		};
		reader.onerror = errorReaderHandler;
		reader.onload = function(e) {
	      document.getElementById('read_text_p').textContent = i++;
	    }
		reader.onloadstart = function(e) {
			alert("começou onloadstart");
	      document.getElementById('read_text_p').textContent = 'oops, comecei!';
	    };
	   reader.readAsText(fe);
	},errorHandler);
};

function errorReaderHandler(evt) {
	alert("ocorreu um erro no reader");
	switch(evt.target.error.code) {
	  case evt.target.error.NOT_FOUND_ERR:
	    alert('File Not Found!');
	    break;
	  case evt.target.error.NOT_READABLE_ERR:
	    alert('File is not readable');
	    break;
	  case evt.target.error.ABORT_ERR:
	    break; // noop
	  default:
	    alert('An error occurred reading this file.');
    };
};

Vex.Flow.Test.Document.xmlDoc = function(options, contextBuilder) {
  var docString;
  try {
//    docString = Vex.Flow.Test.Document.Fetch("https://github.com/ringw/vexflow/blob/musicxml/docs/samples/chant.xml");
    docString = fetch();
  }
  catch (e) {
    ok(true, "Skipping test; browser does not support local file:// AJAX");
    $("#" + options.canvas_sel).replaceWith("Skip: Make sure your browser supports file:// AJAX requests." + e.code);
    return;
  }
  if (! docString) {
    ok(false, "Document does not exist");
    return;
  }
  expect(2);
  var doc = new Vex.Flow.Document(docString);
  ok(true, "created document");

  var formatter = doc.getFormatter();
  formatter.setWidth(800);
  var ctx = new contextBuilder(options.canvas_sel, 480, 120);
  ctx.scale(0.6, 0.6);
  formatter.drawBlock(0, ctx);
  ok(true, "drew document");
};