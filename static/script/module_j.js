const audio = new Audio('/static/audio/j.m4a');

function toggleAudio() {
    if (audio.paused) {
        console.log('Reproduzindo o áudio...');
        audio.play()
            .then(() => console.log('Áudio reproduzido com sucesso.'))
            .catch(err => console.error('Erro ao reproduzir o áudio:', err));
    } else {
        console.log('Pausando o áudio...');
        audio.pause();
    }
}

const button = document.getElementById('song');
if (button) {
    button.addEventListener('click', toggleAudio);
} else {
    console.error('Botão com ID "song" não encontrado.');
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let inactivityTimeout;
let drawingEnabled = true;

document.getElementById('restart').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearTimeout(inactivityTimeout);
    drawingEnabled = true;
});

canvas.addEventListener('mousedown', (event) => {
    if (!drawingEnabled) return;
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    resetInactivityTimeout();
});

canvas.addEventListener('mouseup', () => {
    if (!drawingEnabled) return;
    drawing = false;
    ctx.closePath(); 
    resetInactivityTimeout();
});

canvas.addEventListener('mousemove', (event) => {
    if (!drawingEnabled || !drawing) return;
    draw(event);
    resetInactivityTimeout(); 
});

resizeCanvas(); 
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
} 

function draw(event) {
    ctx.lineWidth = 5; 
    ctx.lineCap = 'round'; 
    ctx.strokeStyle = 'blue'; 

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); 
    ctx.stroke(); 
    ctx.beginPath(); 
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); 
}

function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(saveDrawing, 1000);  
}

function saveDrawing() {
    canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'desenho.png');

        fetch('/module_j/upload_image', {
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

            backBtn.disabled = true;
            restartBtn.disabled = true;
            drawingEnabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, 'image/png');
}

