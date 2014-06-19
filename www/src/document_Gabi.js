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
	fs.root.getFile("EasyScore/chant.xml", {
			create : false,
			exclusive : false
	}, function(fileEntry) {
		// onSuccess
		fileEntry.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function(e) {
				if (e.target.readyState == FileReader.DONE) { // DONE == 2
					document.getElementById('read_text').value = this.result;
					return this.result;
				}
			};
			reader.onerror = errorReaderHandler;
			reader.readAsText(file);
		},errorHandler);
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
	  docString = fetch();
  }
  catch (e) {
    ok(true, "Skipping test; browser does not support local file:// AJAX");
    $("#" + options.canvas_sel).replaceWith("Skip: Make sure your browser supports file:// AJAX requests." + e.code);
    return;
  }
  if (! docString) {
    alert("Document does not exist");
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