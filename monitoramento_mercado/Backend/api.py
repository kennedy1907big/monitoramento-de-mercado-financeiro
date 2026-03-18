from flask import Flask, jsonify
from flask_cors import CORS
from dados import pegar_dados
from dados import pegar_indices
import random

app = Flask(__name__)
CORS(app)

def gerar_dados():

    dados = {
        "bitcoin": random.randint(345000, 350000),
        "ethereum": random.randint(17000, 19000),
        "petr4": round(random.uniform(35, 38), 2),
        "vale3": round(random.uniform(66, 70), 2)
    }

    return dados


@app.route("/mercado")

def mercado():

    dados = pegar_dados()

    return jsonify(dados)

@app.route("/mapa")
def mapa():
    dados = pegar_indices()
    
    return jsonify(dados)


if __name__ == "__main__":

    app.run(debug=True)