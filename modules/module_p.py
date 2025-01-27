from flask import Blueprint, render_template, request, jsonify
from PIL import Image
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

module_p_blueprint = Blueprint('module_p', __name__,url_prefix='/module_p')

@module_p_blueprint.route('/')
def module_p():
    return render_template('module_p.html')

@module_p_blueprint.route('/upload_image', methods=['POST'])
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

        api_key = os.getenv("GOOGLE_API_KEY")
        
        if not api_key:
            return jsonify({'message': 'API Key not found'}), 500

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")

        with Image.open(image_path) as img:
            response = model.generate_content(["A imagem que você está vendo representa a letra P? Considere maiúscula ou minúscula, em diferentes estilos como letra de forma, cursiva, manuscrita, ou até mesmo em caligrafia artística. A imagem esta inserida em um background preto o qual pode ser desconsiderado na avaliação, leve em conta apenas os elementos presentes na imagem. Caso a resposta para a pergunta seja 'sim', responda 'correto'. Caso a resposta seja 'não', responda 'incorreto'.", img])
            result = response.text

        return jsonify({'message': result})
    except Exception as e:
        print(f"Error: {e}", exc_info=True)
        return jsonify({'message': f'Internal Server Error: {e}'}), 500
