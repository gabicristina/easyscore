var doc;

Vex.Flow.Test.Web = {};
var i = 0;
var windowScoreTop = 0;

Vex.Flow.Test.Web.Start = function() {
	module("Document");
	for (i = 0; i < 12; i++) {
		Vex.Flow.Test.runTest("", Vex.Flow.Test.Web.xmlDoc);
	}
};

Vex.Flow.Test.Web.xmlSimple = function(options, contextBuilder) {
	expect(2);
	doc = new Vex.Flow.Document(comp);
	ok(true, "created document");

	var ctx = new contextBuilder(options.canvas_sel, 1200, 120);
	var formatter = new Vex.Flow.DocumentFormatter();
	ctx.scale(1.0, 1.0);
	doc.getFormatter().setWidth(1200).drawBlockMeasure(5, 1, ctx);
	ok(true, "drew document");
};

function errorReaderHandler(evt) {
	alert("ocorreu um erro no reader");
	switch (evt.target.error.code) {
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

Vex.Flow.Test.Web.xmlDoc = function(options, contextBuilder) {
	if (!comp) {
		alert("Document does not exist");
		ok(false, "Document does not exist");
		return;
	}
	expect(2);
	var docWeb = new Vex.Flow.Document(comp);
	var ctx = new contextBuilder(options.canvas_sel, 750, 130);
	ctx.scale(1.2, 1.2);
	docWeb.getFormatter().setWidth(600).drawBlock(i, ctx);
};