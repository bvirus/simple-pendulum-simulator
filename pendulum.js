
let canvas = document.getElementById("screen");
let body = document.querySelector("body");
let container = document.getElementById("container")
let ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';

let initialTime = 0;
let initX = 400;
let initY = 10;
let radius = 200;
let amp = (Math.PI)/5;

let stringSlider = document.getElementById("string-slider");

noUiSlider.create(stringSlider, {
	start: [200],
	connect: true,
	range: {
		'min': 50,
		'max': 350
	}
});

stringSlider.noUiSlider.on('slide', function() {
    radius = stringSlider.noUiSlider.get();
})

let ampSlider = document.getElementById("amp-slider");

noUiSlider.create(ampSlider, {
	start: [Math.PI/5],
	connect: true,
	range: {
		'min': Math.PI/20,
		'max': Math.PI/3
	}
});

ampSlider.noUiSlider.on('slide', function() {
    amp = ampSlider.noUiSlider.get();
})


function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    requestAnimationFrame(render);
}

function position(time) {
    let c = (2*Math.PI)/(5 * 1000);
    return (amp) * Math.sin(c * time);
}

function time() {
    return Date.now() - initialTime;
}

function render() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fill();
    ctx.setLineDash([]);
    ctx.beginPath();
    let r = position(time());
    let x = initX + radius*Math.cos(r - (Math.PI/2));
    let y = initY - radius*Math.sin(r - (Math.PI/2));
    ctx.ellipse(x, y, 30, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(initX, initY);
    ctx.lineTo(x, y);
    ctx.stroke();

    requestAnimationFrame(render);
}

container.addEventListener('resize', resizeCanvas, false);
initialTime = Date.now();
resizeCanvas();