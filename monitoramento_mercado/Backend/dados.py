import yfinance as yf
import pandas as pd 
import requests
from ta.trend import SMAIndicator

ativos = {
    "PETR4":"PETR4.SA",
    "VALE3":"VALE3.SA",
    "ITUB4":"ITUB4.SA",
    "BBDC4":"BBDC4.SA",
    "BBAS3":"BBAS3.SA",
    "WEGE3":"WEGE3.SA",

    "AAPL":"AAPL",
    "MSFT":"MSFT",
    "TSLA":"TSLA",
    "AMZN":"AMZN",
    "NVDA":"NVDA",
    "GOOGL":"GOOGL",

    "BTC":"BTC-USD",
    "ETH":"ETH-USD",
    "SOL":"SOL-USD"
}
indices = {
    "SP500": "^GSPC",
    "IBOV": "^BVSP",
    "NIKKEI": "^N225",
    "FTSE": "^FTSE"
}
def analisar_tendencia(df):
    sma20 = SMAIndicator(df["Close"], window=20).sma_indicator()
    sma50 = SMAIndicator(df["Close"], window=50).sma_indicator()

    if sma20.iloc[-1] > sma50.iloc[-1]:
        return "ALTA"
    else:
        return "BAIXA"

def pegar_dados():

    dados = {}

    for nome, ticker in ativos.items():

        ativo = yf.Ticker(ticker)
        hist = ativo.history(period="1d")

        preco = hist["Close"].iloc[-1]
        abertura = hist["Open"].iloc[0]

        variacao = ((preco - abertura)/abertura)*100

        dados[nome] = {
            "preco": round(float(preco),2),
            "variacao": round(float(variacao),2)
        }

    btc = yf.Ticker("BTC-USD")
    eth = yf.Ticker("ETH-USD")
    petr4 = yf.Ticker("PETR4.SA")
    vale3 = yf.Ticker("VALE3.SA")

    btc_preco = btc.history(period="1d")["Close"].iloc[-1]
    eth_preco = eth.history(period="1d")["Close"].iloc[-1]
    petr4_preco = petr4.history(period="1d")["Close"].iloc[-1]
    vale3_preco = vale3.history(period="1d")["Close"].iloc[-1]

    dados = {
        "bitcoin": round(float(btc_preco),2),
        "ethereum": round(float(eth_preco),2),
        "petr4": round(float(petr4_preco),2),
        "vale3": round(float(vale3_preco),2)
    }

    return dados

def pegar_indices():

    indices = {
        "SP500": "^GSPC",
        "NASDAQ": "^IXIC",
        "DOWJONES": "^DJI",
        "IBOV": "^BVSP",
        "NIKKEI": "^N225",
        "FTSE": "^FTSE"
    }

    resultado = {}

    for nome, ticker in indices.items():

        try:

            dados = yf.Ticker(ticker)
            hist = dados.history(period="1d")

            if hist.empty:

                resultado[nome] = {
                    "preco": 0,
                    "variacao": 0
                }

            else:

                preco = round(hist["Close"].iloc[-1], 2)
                abertura = hist["Open"].iloc[-1]

                variacao = round(((preco - abertura) / abertura) * 100, 2)

                resultado[nome] = {
                    "preco": preco,
                    "variacao": variacao
                }

        except Exception as erro:

            resultado[nome] = {
                "preco": 0,
                "variacao": 0
            }

    return resultado