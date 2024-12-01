from flask import Flask, render_template
from modules.module_a import module_a_blueprint
from modules.module_e import module_e_blueprint
from modules.module_i import module_i_blueprint
from modules.module_o import module_o_blueprint
from modules.module_u import module_u_blueprint

app = Flask(__name__)

app.register_blueprint(module_a_blueprint, url_prefix='/module_a')
app.register_blueprint(module_e_blueprint, url_prefix='/module_e')
app.register_blueprint(module_i_blueprint, url_prefix='/module_i')
app.register_blueprint(module_o_blueprint, url_prefix='/module_o')
app.register_blueprint(module_u_blueprint, url_prefix='/module_u')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/modules')
def module():
    return render_template('modules.html')

if __name__ == '__main__':
    app.run(debug=True)
