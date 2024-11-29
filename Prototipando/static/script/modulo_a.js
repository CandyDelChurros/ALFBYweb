const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let inactivityTimeout;
let drawingEnabled = true;

// Limpar canvas (botão reiniciar)
document.getElementById('restart').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearTimeout(inactivityTimeout); // Limpa o timeout de inatividade
});

canvas.addEventListener('mousedown', (event) => {
    if (!drawingEnabled) return;
    drawing = true;
    ctx.beginPath(); // Inicia um novo caminho ao começar a desenhar
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    resetInactivityTimeout();
});

canvas.addEventListener('mouseup', () => {
    if (!drawingEnabled) return;
    drawing = false;
    ctx.closePath(); // Fecha o caminho ao terminar de desenhar
    resetInactivityTimeout();
});

canvas.addEventListener('mousemove', (event) => {
    if (!drawingEnabled || !drawing) return;
    draw(event);
    resetInactivityTimeout();
});

resizeCanvas(); // garante a responsividade do canvas quando atualiza a pagina
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
} // Inicializa o tamanho do canvas

function draw(event) {
    ctx.lineWidth = 5; // Espessura da linha
    ctx.lineCap = 'round'; // Arredondar as pontas
    ctx.strokeStyle = 'blue'; // Cor da linha

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); // Define a linha até o ponto atual do cursor
    ctx.stroke(); // Desenha a linha
    ctx.beginPath(); // Reinicia o caminho
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); // Move para o ponto atual
}

function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(saveDrawing, 1000); // 1 segundo de inatividade
}

function saveDrawing() {
    canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'desenho.png');

        fetch('/upload_image', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const popUp = document.querySelector('.pop-up');
            const popUpSpan = document.querySelector('.pop-up .pop-head span');
            const backBtn = document.getElementById('back');
            const restartBtn = document.getElementById('restart');

            if (data.message === 'correto') {
                popUp.style.visibility = 'visible';
                popUpSpan.textContent = 'TAREFA CONCLUIDA';
            } else if (data.message === 'incorreto') {
                popUp.style.visibility = 'visible';
                popUpSpan.textContent = 'UHM, TA QUASE LA';
            } else {
                console.error('Unexpected response:', data.message);
            }

            // Desativar botões e desabilitar desenho no canvas
            backBtn.disabled = true;
            restartBtn.disabled = true;
            drawingEnabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, 'image/png');
}