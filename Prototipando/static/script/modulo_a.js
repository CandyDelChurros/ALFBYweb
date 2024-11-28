const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let inactivityTimeout;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas(); // Inicializa o tamanho do canvas

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    ctx.beginPath(); // Inicia um novo caminho ao começar a desenhar
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    resetInactivityTimeout();
});
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath(); // Fecha o caminho ao terminar de desenhar
    resetInactivityTimeout();
});
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;

    ctx.lineWidth = 5; // Espessura da linha
    ctx.lineCap = 'round'; // Arredondar as pontas
    ctx.strokeStyle = 'black'; // Cor da linha

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); // Define a linha até o ponto atual do cursor
    ctx.stroke(); // Desenha a linha
    ctx.beginPath(); // Reinicia o caminho
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); // Move para o ponto atual
    resetInactivityTimeout();
}

// Limpar canvas (botão reiniciar)
document.getElementById('restart').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    clearTimeout(inactivityTimeout); // Limpa o timeout de inatividade
});

function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(saveDrawing, 3000); // 3 segundos de inatividade
}

function saveDrawing() {
    canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'desenho.png');

        fetch('/upload_image', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            alert(data.message); // Exibe a resposta da API
            window.location.reload(); // Recarrega a página após salvar a imagem
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, 'image/png');
}