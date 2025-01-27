from flask import Flask, render_template

from modules.module_a import module_a_blueprint
from modules.module_b import module_b_blueprint
from modules.module_c import module_c_blueprint
from modules.module_d import module_d_blueprint
from modules.module_e import module_e_blueprint
from modules.module_f import module_f_blueprint
from modules.module_g import module_g_blueprint
from modules.module_h import module_h_blueprint
from modules.module_i import module_i_blueprint
from modules.module_j import module_j_blueprint
from modules.module_k import module_k_blueprint
from modules.module_l import module_l_blueprint
from modules.module_m import module_m_blueprint
from modules.module_n import module_n_blueprint
from modules.module_o import module_o_blueprint
from modules.module_p import module_p_blueprint
from modules.module_q import module_q_blueprint
from modules.module_r import module_r_blueprint
from modules.module_s import module_s_blueprint
from modules.module_t import module_t_blueprint
from modules.module_u import module_u_blueprint
from modules.module_v import module_v_blueprint
from modules.module_w import module_w_blueprint
from modules.module_x import module_x_blueprint
from modules.module_y import module_y_blueprint
from modules.module_z import module_z_blueprint

app = Flask(__name__)

app.register_blueprint(module_a_blueprint, url_prefix='/module_a')
app.register_blueprint(module_b_blueprint, url_prefix='/module_b')
app.register_blueprint(module_c_blueprint, url_prefix='/module_c')
app.register_blueprint(module_d_blueprint, url_prefix='/module_d')
app.register_blueprint(module_e_blueprint, url_prefix='/module_e')
app.register_blueprint(module_f_blueprint, url_prefix='/module_f')
app.register_blueprint(module_g_blueprint, url_prefix='/module_g')
app.register_blueprint(module_h_blueprint, url_prefix='/module_h')
app.register_blueprint(module_i_blueprint, url_prefix='/module_i')
app.register_blueprint(module_j_blueprint, url_prefix='/module_j')
app.register_blueprint(module_k_blueprint, url_prefix='/module_k')
app.register_blueprint(module_l_blueprint, url_prefix='/module_l')
app.register_blueprint(module_m_blueprint, url_prefix='/module_m')
app.register_blueprint(module_n_blueprint, url_prefix='/module_n')
app.register_blueprint(module_o_blueprint, url_prefix='/module_o')
app.register_blueprint(module_p_blueprint, url_prefix='/module_p')
app.register_blueprint(module_q_blueprint, url_prefix='/module_q')
app.register_blueprint(module_r_blueprint, url_prefix='/module_r')
app.register_blueprint(module_s_blueprint, url_prefix='/module_s')
app.register_blueprint(module_t_blueprint, url_prefix='/module_t')
app.register_blueprint(module_u_blueprint, url_prefix='/module_u')
app.register_blueprint(module_v_blueprint, url_prefix='/module_v')
app.register_blueprint(module_w_blueprint, url_prefix='/module_w')
app.register_blueprint(module_x_blueprint, url_prefix='/module_x')
app.register_blueprint(module_y_blueprint, url_prefix='/module_y')
app.register_blueprint(module_z_blueprint, url_prefix='/module_z')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/instructions')
def module():
    return render_template('instructions.html')

@app.route('/modules')
def module():
    return render_template('modules.html')

if __name__ == '__main__':
    app.run(debug=True)

