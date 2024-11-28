// Verifica se a mesa digitalizadora está conectada
function isDrawingTabletConnected() {
    const inputDevices = navigator.getGamepads(); // Usa gamepads, pois mesas digitais podem ser detectadas dessa maneira
    return inputDevices.some(device => device && device.id.toLowerCase().includes('tablet'));
}

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do canvas para ocupar 80% da tela
canvas.width = window.innerWidth * 1;
canvas.height = window.innerHeight * 1;

// Variáveis de controle de desenho
let drawing = false;
let lastX = 0;
let lastY = 0;

// Função para iniciar o desenho
function startDrawing(e) {
    if (isDrawingTabletConnected() || e.buttons === 1) {  // Verifica se o botão do mouse ou da mesa digitalizadora está pressionado
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
}
// Função para desenhar no canvas
function draw(e) {
    if (!drawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Função para parar o desenho
function stopDrawing() {
    drawing = false;
}

// Adiciona os eventos do mouse para desenho
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
