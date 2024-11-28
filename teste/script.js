const canvas = document.getElementById('lousa');
const ctx = canvas.getContext('2d');

// Configuração inicial
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let saveTimeout;

// Função para salvar o desenho
function saveDrawing() {
  const image = canvas.toDataURL('image/png'); // Converte o desenho para uma imagem
  const link = document.createElement('a');
  link.href = image;
  link.download = `desenho-${Date.now()}.png`; // Nome do arquivo com timestamp
  link.click();
  console.log('Desenho salvo automaticamente!');
}

// Função para reiniciar o timer de salvar
function resetSaveTimer() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    sendImageToBackend();  // Envia a imagem para o backend após 5 segundos de inatividade
  }, 5000); // 5 segundos
}

// Função para começar o desenho
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  resetSaveTimer(); // Reinicia o timer ao começar o desenho
});

// Função para parar o desenho
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  resetSaveTimer(); // Reinicia o timer ao parar o desenho
});

canvas.addEventListener('mouseout', () => {
  isDrawing = false;
  resetSaveTimer(); // Reinicia o timer ao sair do canvas
});

// Função para desenhar
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = '#000'; // Cor do desenho
  ctx.lineWidth = 2; // Largura da linha
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  resetSaveTimer(); // Reinicia o timer ao desenhar
})

// Função para enviar a imagem para o backend
function sendImageToBackend() {
  const image = canvas.toDataURL('image/png'); // Converte o canvas para uma URL de imagem base64

  // Converte a imagem base64 para um Blob para envio
  const blob = dataURLToBlob(image);
  const formData = new FormData();
  formData.append('image', blob, 'desenho.png');

  f/etch('http://127.0.0.1:5000/upload', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    // Exibe a resposta na tela
    displayResponse(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Função para converter a dataURL para Blob
function dataURLToBlob(dataUrl) {
  const arr = dataUrl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
  while(n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], {type: mime});
}

// Função para exibir a resposta do modelo generativo
function displayResponse(response) {
  // Cria um elemento <div> para mostrar a resposta
  const responseDiv = document.getElementById('response');
  responseDiv.textContent = response; // Define o texto da resposta
}
