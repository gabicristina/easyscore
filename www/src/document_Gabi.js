/**
 * VexFlow - Document Tests (JSON and MusicXML)
 * 
 * @author Daniel Ringwalt (ringw)
 */
var fe;

Vex.Flow.Test.Document = {};

function doc_Gabi() {
	return "oi";
};

Vex.Flow.Test.Document.Start = function() {
	alert("não?");
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

function _fetch() {
	alert("oi fetch");
	fs.root.getFile("/EasyScore/chant.xml", {
			create : false,
			exclusive : false
	}, function(fileEntry) {
		// onSuccess
		fe = fileEntry;
		var reader = new FileReader();
		alert("123");
       reader.onloadend = function(e) {
    	   document.getElementById('read_text').textContent = this.result;
    	   document.getElementById('read_text').value = this.result;
    	   document.getElementById('read_text_p').textContent = file.size;
    	   alert("oioi");
       };
	   reader.readAsText(fe);
	};
};

function errorHandler(e) {
	alert("erro");
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
    	alert("erro default");
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
};

Vex.Flow.Test.Document.xmlDoc = function(options, contextBuilder) {
  var docString;
  try {
// docString =
// Vex.Flow.Test.Document.Fetch("https://github.com/ringw/vexflow/blob/musicxml/docs/samples/chant.xml");
    docString = _fetch();
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
