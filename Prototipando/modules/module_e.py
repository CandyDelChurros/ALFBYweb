from flask import Blueprint, render_template, request, jsonify
from PIL import Image
import google.generativeai as genai
import os

module_e_blueprint = Blueprint('module_e', __name__,url_prefix='/module_e')

@module_e_blueprint.route('/')
def module_e():
    return render_template('module_e.html')

@module_e_blueprint.route('/upload_image', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({'message': 'No file part'}), 400
        file = request.files['image']
        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        image_path = os.path.join('static', 'img', 'desenho.png')
        os.makedirs(os.path.dirname(image_path), exist_ok=True)
        file.save(image_path)

        genai.configure(api_key="AIzaSyBq2nc05mUMNpuyQMsW-j69L7Qtl-Chf0A")
        model = genai.GenerativeModel("gemini-1.5-flash")

        with Image.open(image_path) as img:
            response = model.generate_content(["A imagem que você está vendo representa a letra 'E'? Considere maiúscula ou minúscula, em diferentes estilos como letra de forma, cursiva, manuscrita, ou até mesmo em caligrafia artística. A imagem esta inserida em um background preto o qual pode ser desconsiderado na avaliação, leve em conta apenas os elementos presentes na imagem. Caso a resposta para a pergunta seja 'sim', responda 'correto'. Caso a resposta seja 'não', responda 'incorreto'.", img])
            result = response.text

        return jsonify({'message': result})
    except Exception as e:
        print(f"Error: {e}", exc_info=True)
        return jsonify({'message': f'Internal Server Error: {e}'}), 500
