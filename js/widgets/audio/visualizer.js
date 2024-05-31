var visualizer_widget = {
    elements: {
        canvas: Element,
        ctx: null,
    },
    properties: {
        active: true,
        clean: 0, // Amount of channels to clean
        width: 5, // Width of channel bars
        height: 280, // Maximum height of bars
        spacing: 5, // Spacing between bars
        channels: 127, // Amount of channels
        color: "#ff0000",
        shadow: "#262625",
        shadowBlur: 2,
        rotation: 0,
        position: {
            x: 0,
            y: 0,
        },
        visual: "stripes",
        scaled: {
            width: 0,
            height: 0,
        }
    },
    temp: {
        buffer: {
            data: [], // Audio buffer
            cycles: 3, // Buffer processing cycles, to create a smooth movement (Before, "present", after)
            auxCycles: 0, // Just an auxiliar variable
        },
        auxChannels: 0,
        framerate: 30,
        last: performance.now() / 1000,
        fpsThreshold: 0
    },
    start: setupvisualizerWidget,
    render: rendervisualizerWidget,
}

function bezierCurveHandlerVisualizerWidget(points, f, t, ctx) {
	//f = 0, will be straight line
	//t suppose to be 1, but changing the value can control the smoothness too
	if (typeof(f) == 'undefined') f = 0.3;
	if (typeof(t) == 'undefined') t = 0.6;

	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);

	let m = 0;
	let dx1 = 0;
	let dy1 = 0;

	let previousPoint = points[0];
	for (let i = 1; i < points.length; i++) {
		let curvePoint = points[i];
		let nextPoint = points[i + 1];
		if (nextPoint) {
			m = (nextPoint.y-previousPoint.y)/(nextPoint.x-previousPoint.x);
			dx2 = (nextPoint.x - curvePoint.x) * - f;
			dy2 = dx2 * m * t;
		} else {
			dx2 = 0;
			dy2 = 0;
		}
		ctx.bezierCurveTo(previousPoint.x - dx1, previousPoint.y - dy1, curvePoint.x + dx2, curvePoint.y + dy2, curvePoint.x, curvePoint.y);
		dx1 = dx2;
		dy1 = dy2;
		previousPoint = curvePoint;
	}

	ctx.fill();
	ctx.closePath();
}

// listen
function listenvisualizerWidget(audioArray) {

    if (visualizer_widget.properties.active){
        let now = performance.now() / 1000;
        let dt = Math.min(now - visualizer_widget.temp.last, 1);
        visualizer_widget.temp.last = now;
    
        visualizer_widget.temp.fpsThreshold += dt;
        if (visualizer_widget.temp.fpsThreshold < 1.0){
            return;
        }
    
        visualizer_widget.temp.fpsThreshold -= 1.0 / visualizer_widget.temp.framerate;
    
        let temp = MCCW.widgets.visualizer.temp;
    
        if (temp.buffer.auxCycles < temp.buffer.cycles) {
            temp.buffer.data[temp.buffer.auxCycles] = audioArray;
            temp.buffer.auxCycles++;
        } else {
            temp.buffer.data[1] = temp.buffer.data[2];
            temp.buffer.data[2] = audioArray;
            while (temp.auxChannels < MCCW.properties.visualizer.channels - 1) {
                temp.buffer.data[0][temp.auxChannels] = ((temp.buffer.data[1][temp.auxChannels] + temp.buffer.data[2][temp.auxChannels]) * MCCW.properties.visualizer.height) / 2; // Smooth movement
                temp.buffer.data[0][temp.auxChannels] = (temp.buffer.data[0][temp.auxChannels] + temp.buffer.data[0][temp.auxChannels + 1] + temp.buffer.data[0][temp.auxChannels + 2]) / 3; // Smooth height
                temp.buffer.data[0][temp.auxChannels] > 199 ? temp.buffer.data[0][temp.auxChannels] = 199 : false; // Avoiding overflow
                temp.auxChannels++;
            }
            temp.auxChannels = 0;
        }
        window.requestAnimationFrame(rendervisualizerWidget);
    }

}

// render
function rendervisualizerWidget() {
    let temp = MCCW.widgets.visualizer.temp;
    let ctx = MCCW.widgets.visualizer.elements.ctx;

    MCCW.widgets.visualizer.elements.ctx.clearRect(0, 0, MCCW.widgets.visualizer.clean, MCCW.properties.visualizer.height);

    for (i = 0; i < MCCW.properties.visualizer.channels + 1; i++) {

        if (visualizer_widget.properties.visual === "stripes"){
            let position = {
                x: MCCW.properties.visualizer.width + (MCCW.properties.visualizer.spacing * i * 2),
                y: 0,
                width: MCCW.properties.visualizer.width,
                height: temp.buffer.data[0][i]
            }
    
            ctx.fillRect(position.x, position.y, position.width, position.height);
        };

        if (visualizer_widget.properties.visual === "waves"){
            // Generate random data
            let lines = [{x: 0, y: 0}];
            for (let i = 1; i < MCCW.properties.visualizer.channels; i++){
                lines.push({
                    x: MCCW.properties.visualizer.width * 2 * i,
                    y: temp.buffer.data[0][i],
                }); 
            };

            lines.push({x: MCCW.properties.visualizer.width * lines.length, y: 0})
            
            ctx.lineWidth = 2;
            bezierCurveHandlerVisualizerWidget(lines, 0.3, 1, ctx); // This function consumes too much, be aware
            ctx.closePath();
        }
    }
}

// Setup
function setupvisualizerWidget() {

    visualizer_widget.elements.canvas = document.getElementById("audio_canvas");
    visualizer_widget.elements.ctx = MCCW.widgets.visualizer.elements.canvas.getContext("2d");

    MCCW.widgets.visualizer.clean = (visualizer_widget.properties.channels * visualizer_widget.properties.width) + (visualizer_widget.properties.spacing * (visualizer_widget.properties.channels - 1));

    visualizer_widget.elements.canvas.setAttribute('width', MCCW.widgets.visualizer.clean);
    visualizer_widget.elements.canvas.setAttribute('height', MCCW.properties.visualizer.height);

    visualizer_widget.elements.canvas.style.width = `${(MCCW.widgets.visualizer.clean*100)/1920}%`;
    visualizer_widget.elements.canvas.style.height = `${(MCCW.properties.visualizer.height*100)/1080}%`;

    visualizer_widget.properties.scaled.width = (MCCW.widgets.visualizer.clean*100)/1920;
    visualizer_widget.properties.scaled.height = (MCCW.properties.visualizer.height*100)/1080;

    visualizer_widget.elements.ctx.fillStyle = MCCW.properties.visualizer.color;
    visualizer_widget.elements.ctx.shadowColor = MCCW.properties.visualizer.shadow;
    visualizer_widget.elements.ctx.shadowBlur = MCCW.properties.visualizer.shadowBlur;

    let temp = MCCW.widgets.visualizer.temp;

    for (let i = 0; i < 3; i++) {
        temp.buffer.data[i] = [];
        temp.buffer.data[i].length = MCCW.properties.visualizer.channels + 1;
        temp.buffer.data[i].fill(0);
    }

    window.wallpaperRegisterAudioListener(listenvisualizerWidget);
}