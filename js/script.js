
let button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    let dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});

let canvas = document.querySelector('#draw');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 25;

ctx.fillStyle = "#eec9d6";
ctx.fillRect(0, 0, canvas.width, canvas.height);


let isDrawing = false;
let direction = true;
let lastX = 0;
let lastY = 0;
let hue = 0;


function draw(e) {
    if(!isDrawing) return; //stop hen mouse is not down
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    //start from
    ctx.moveTo(lastX, lastY);
    //go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]; //destructuring an array
    hue++;
    if(hue >= 360) hue = 0;
    if(ctx.lineWidth >= 30 || ctx.lineWidth <= 10) {
        direction = !direction;
    }
    if(direction) ctx.lineWidth++;
    else ctx.lineWidth--;
};


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false );
canvas.addEventListener('mouseout', () => isDrawing = false );
