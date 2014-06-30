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

  var ctx = new contextBuilder(options.canvas_sel, largPart, altPart);
  ctx.scale(escPart, escPart);
  doc.getFormatter().setWidth(largPart).drawBlock(0, ctx);
  ok(true, "drew document");
};
Vex.Flow.Test.Document.Fetch = function(uri) {
  var req = new XMLHttpRequest();
  //req.setRequestHeader("Access-Control-Allow-Origin", "*");
  //req.setRequestHeader("allow-file-access-from-files");
  req.open('GET', uri, false);
  req.send(null);
  if (req.readyState != 4) return undefined;
  return req.responseText;
};
Vex.Flow.Test.Document.xmlDoc = function(options, contextBuilder) {
  var docString;
  try {
//    docString = Vex.Flow.Test.Document.Fetch("https://github.com/ringw/vexflow/blob/musicxml/docs/samples/chant.xml");
    docString = Vex.Flow.Test.Document.Fetch("../docs/samples/chant.xml");
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

  var ctx = new contextBuilder(options.canvas_sel, largPart, altPart);
  ctx.scale(escPart, escPart);
  doc.getFormatter().setWidth(largPart).drawBlock(0, ctx);
  //ctx.scale(0.6, 0.6);
  //formatter.drawBlock(0, ctx);
  ok(true, "drew document");
};
