from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import psycopg2
print("=== INICIANDO BACKEND ===")


app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app, supports_credentials=True)

# -------------------------------
# conexao com o neon
# -------------------------------
def get_connection():
    return psycopg2.connect(
        host="ep-royal-wave-adfa5d9h-pooler.c-2.us-east-1.aws.neon.tech",
        database="neondb",
        user="neondb_owner",
        password="npg_WvGStu2N9PUV",
        sslmode="require"
    )


# -------------------------------
# LOGIN
# -------------------------------
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json

    email_phone = data.get('emailPhone')
    password = data.get('password')

    if not email_phone or not password:
        return jsonify({"status": "erro", "mensagem": "Envie todos os campos."}), 400

    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT * FROM usuarios
            WHERE (email = %s OR telefone = %s) AND senha = %s
        """, (email_phone, email_phone, password))

        usuario = cur.fetchone()

        cur.close()
        conn.close()

        if usuario:
            return jsonify({"status": "ok", "mensagem": "Login realizado com sucesso!"}), 200
        else:
            return jsonify({"status": "erro", "mensagem": "Email/telefone ou senha incorretos."}), 401

    except Exception as e:
        return jsonify({"status": "erro", "mensagem": f"Erro no servidor: {str(e)}"}), 500



# -------------------------------
# CADASTRO
# -------------------------------
@app.route('/api/cadastro', methods=['POST'])
def cadastro():
    data = request.json

    nome = data.get('nome_completo')
    data_nasc = data.get('data_nascimento')
    email = data.get('email')
    telefone = data.get('telefone')
    cep = data.get('cep')
    bairro = data.get('bairro')
    endereco = data.get('endereco')
    senha = data.get('senha')

    if not all([nome, data_nasc, email, telefone, cep, bairro, endereco, senha]):
        return jsonify({"status": "erro", "mensagem": "Preencha todos os campos."}), 400

    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO usuarios
            (nome_completo, data_nascimento, email, telefone, 
            cep, bairro, endereco, senha)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (nome, data_nasc, email, telefone, cep, bairro, endereco, senha))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"status": "ok", "mensagem": "Cadastro realizado com sucesso!"}), 201

    except Exception as e:
        import sys
        print("\n\n================ ERRO NO CADASTRO ================", file=sys.stderr)
        print(str(e), file=sys.stderr)
        print("==================================================\n\n", file=sys.stderr)
        return jsonify({"status": "erro", "mensagem": f"Erro no servidor: {str(e)}"}), 500

# -------------------------------
# ROTAS DAS PÁGINAS HTML
# -------------------------------

@app.route("/")
def index_page():
    return render_template("index.html")

@app.route("/cad")
def cad_page():
    return render_template("cad.html")

@app.route("/login")
def login_page():
    return render_template("login.html")

@app.route("/detail")
def detail_page():
    return render_template("detail.html")


# -------------------------------
# ▶ ROTA DA PÁGINA INICIAL (HTML)
# -------------------------------
@app.route("/")
def home():
    return render_template("index.html")


# -------------------------------
# ▶ RODAR FLASK
# -------------------------------
if __name__ == "__main__":
    print("Servidor Flask iniciado...")
    app.run(debug=True)
