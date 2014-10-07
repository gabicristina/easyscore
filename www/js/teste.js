		function drawLine() {
			elem = $("#vexflow")[0];
			if (formatter._htmlElem != elem) {
				formatter._htmlElem = elem;
				elem.innerHTML = "";
				formatter.canvases = [];
			}
			//var canvasWidth = $(elem).width() - 10; // TODO: remove jQuery dependency
			//var renderWidth = Math.floor(canvasWidth / formatter.zoom);
			// Invalidate all blocks/staves/voices
			formatter.minMeasureWidths = []; // heights don't change with stave modifiers
			formatter.measuresInBlock = [];
			formatter.blockDimensions = [];
			formatter.vfStaves = [];
			formatter.measureX = [];
			formatter.measureWidth = [];
			//formatter.setWidth(renderWidth); //ajusta a partitura ao tamanho da tela

			// Remove all non-canvas child nodes of elem using jQuery
			$(elem).children(":not(canvas)").remove();

			var b = 0;
			formatter.getBlock(b);
			var canvas, context;
			var dims = formatter.blockDimensions[b]; //[2350, 111]
			var width = Math.ceil(dims[0] * formatter.zoom);
			var height = Math.ceil(dims[1] * formatter.zoom) + 15;
			
			//if (!formatter.canvases[b]) {
			canvas = document.createElement('canvas');
			//canvas.width = doc.getNumberOfMeasures() * 400;
			canvas.width = width * formatter.scale;
			canvas.height = height * formatter.scale;
			if (formatter.scale > 1) {
				canvas.style.width = width.toString() + "px";
				canvas.style.height = height.toString() + "px";
			}
			canvas.id = elem.id + "_canvas" + b.toString();
			// If a canvas exists after this one, insert before that canvas
			for (var a = b + 1; formatter.getBlock(a); a++)
				if (typeof formatter.canvases[a] == "object") {
					elem.insertBefore(canvas, formatter.canvases[a]);
					break;
				}
			if (!canvas.parentNode)
				elem.appendChild(canvas); // Insert at the end of elem
			formatter.canvases[b] = canvas;
			context = Vex.Flow.Renderer.bolsterCanvasContext(canvas
					.getContext("2d"));
					
			// TODO: Figure out why setFont method is called
			if (typeof context.setFont != "function")
				context.setFont = function(font) {
					formatter.font = font;
					return formatter;
				};
			context.scale(formatter.zoom * formatter.scale, formatter.zoom * formatter.scale);
			formatter.drawBlock(b, context);
			console.log("linha: " + b + " - no. compassos: " + formatter.measuresInBlock[b].length);
			// Add anchor elements before canvas
			var lineAnchor = document.createElement("a");
			lineAnchor.id = elem.id + "_line" + (b + 1).toString();
			elem.insertBefore(lineAnchor, canvas);
			formatter.measuresInBlock[b].forEach(function(m) {
				var anchor = elem.id + "_m"
						+ formatter.document.getMeasureNumber(m).toString();
				var anchorElem = document.createElement("a");
				anchorElem.id = anchor;
				elem.insertBefore(anchorElem, canvas);
			}, formatter);
		}
		/*
		function scrollBlocksIntoView(element, numberOfBlocks, timeout) {
		console.log("number of blocks" + numberOfBlocks);
			var i = 0;
			function cb() {
				element.scrollLeft += 200;
				console.log("scrollLeft value: " + element.scrollLeft);
				i++;
				if (i%100===0) console.log(i + " scroll: " + document.getElementById('exibe_info').scrollLeft + " - timeout: " + timeout);
				if (i < numberOfBlocks) setTimeout(cb, timeout);
			}
			cb();
		};*/