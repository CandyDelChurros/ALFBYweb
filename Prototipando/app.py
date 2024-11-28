from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from PIL import Image, ImageOps
import os
import io

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

        # Abrir a imagem salva e verificar se está no formato correto
        with Image.open(image_path) as img:
            # Verificar se a imagem está invertida e corrigir se necessário
            img = ImageOps.exif_transpose(img)
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format='PNG')
            img_byte_arr.seek(0)  # Voltar ao início do buffer

            # Enviar a imagem para a API e obter a resposta
            response = model.generate_content([
                "o desenho que vc ve esta proximo de uma letra A?",
                {
                    "mime_type": "image/png",
                    "data": img_byte_arr.getvalue()
                }
            ])
            result = response.text

        return jsonify({'message': result})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': f'Internal Server Error: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)