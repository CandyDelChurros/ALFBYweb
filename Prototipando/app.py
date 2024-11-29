from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from PIL import Image
import os

app = Flask(__name__)

@app.route('/modulo_a')
def modulo_a():
    return render_template('modulo_a.html')

@app.route('/upload_image', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({'message': 'No file part'}), 400
        file = request.files['image']
        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        # Salvar a imagem localmente
        image_path = os.path.join('static', 'img', 'desenho.png')
        os.makedirs(os.path.dirname(image_path), exist_ok=True)
        file.save(image_path)

        # Configurar a API do Google Generative AI
        genai.configure(api_key="AIzaSyBq2nc05mUMNpuyQMsW-j69L7Qtl-Chf0A")
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Abrir a imagem salva
        with Image.open(image_path) as img:
            # Enviar a imagem para a API e obter a resposta
            response = model.generate_content(["A imagem que você está vendo representa a letra A? Considere maiúscula ou minúscula, em diferentes estilos como letra de forma, cursiva, manuscrita, ou até mesmo em caligrafia artística. A imagem esta inserida em um background preto o qual pode ser desconsiderado na avaliação, leve em conta apenas os elementos presentes na imagem. Caso a resposta para a pergunta seja 'sim', responda 'correto'. Caso a resposta seja 'não', responda 'incorreto'.", img])
            result = response.text

        # Retornar a resposta da API no campo 'message'
        return jsonify({'message': result})
    except Exception as e:
        print(f"Error: {e}", exc_info=True)
        return jsonify({'message': f'Internal Server Error: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

# api.key = AIzaSyBq2nc05mUMNpuyQMsW-j69L7Qtl-Chf0A