const ctx = document.getElementById("grafico").getContext("2d")

const grafico = new Chart(ctx, {

type: "line",

data: {

labels: ["1","2","3","4","5"],

datasets: [

{
label: "Bitcoin",
data: [350000,351000,352000,349500,353000],
borderColor: "#f7931a",
backgroundColor: "transparent",
tension: 0.4
},

{
label: "Ethereum",
data: [18000,18200,17900,18150,18300],
borderColor: "#0011ff",
backgroundColor: "transparent",
tension: 0.4
},

{
label: "PETR4",
data: [35.50,36.10,35.90,36.30,36.00],
borderColor: "#00ff9c",
backgroundColor: "transparent",
tension: 0.4
},

{
label: "VALE3",
data: [67.50,68.10,67.80,68.40,68.00],
borderColor: "#0623a3",
backgroundColor: "transparent",
tension: 0.4
}

]

},

options: {

responsive: true,

plugins: {
legend: {
labels: {
color: "white"
}
}
},

scales: {

x: {
ticks: { color: "white" },
grid: { color: "#334155" }
},

y: {
ticks: { color: "white" },
grid: { color: "#334155" }
}

}

}

})



function mostrarAlerta(mensagem){

let alerta = document.createElement("div")

alerta.innerText = mensagem

alerta.style.position = "fixed"
alerta.style.bottom = "20px"
alerta.style.right = "20px"
alerta.style.background = "#111"
alerta.style.color = "white"
alerta.style.padding = "12px 18px"
alerta.style.borderRadius = "8px"
alerta.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)"

document.body.appendChild(alerta)

setTimeout(()=>{
alerta.remove()
},3000)

}



function atualizarGrafico(){

let btc = Math.floor(Math.random()*5000)+345000
let eth = Math.floor(Math.random()*1000)+17500
let petr4 = (Math.random()*2+35).toFixed(2)
let vale3 = (Math.random()*3+67).toFixed(2)

let btcAnterior = grafico.data.datasets[0].data.slice(-1)[0]

if(btcAnterior){

if(btc - btcAnterior > 2000){
mostrarAlerta("🚀 Bitcoin subindo forte!")
}

if(btcAnterior - btc > 2000){
mostrarAlerta("⚠ Bitcoin caindo forte!")
}

}

grafico.data.datasets[0].data.push(btc)
grafico.data.datasets[1].data.push(eth)
grafico.data.datasets[2].data.push(petr4)
grafico.data.datasets[3].data.push(vale)

grafico.data.labels.push("Agora")

if(grafico.data.labels.length > 8){

grafico.data.labels.shift()

grafico.data.datasets.forEach(dataset=>{
dataset.data.shift()
})

}

grafico.update()

}



setInterval(atualizarGrafico,4000)



function animarNumero(id,valor){

let elemento = document.getElementById(id)

if(!elemento) return

let atual = 0
let incremento = valor/40

let intervalo = setInterval(()=>{

atual += incremento

if(atual >= valor){
elemento.innerText = valor
clearInterval(intervalo)
}else{
elemento.innerText = atual.toFixed(2)
}

},30)

}



document.addEventListener("DOMContentLoaded", function(){

animarNumero("btc",350000)
animarNumero("eth",18000)
animarNumero("petr4",36.10)
animarNumero("vale3",68.50)

buscarDadosAPI()
})
function atualizarMercados(){

const mercados = document.querySelectorAll(".mercado")

mercados.forEach(m =>{

let valor = (Math.random()*2-1).toFixed(2)

m.querySelector("p").innerText = valor+"%"

m.classList.remove("alta","baixa")

if(valor >= 0){
m.classList.add("alta")
}else{
m.classList.add("baixa")
}

})

}

setInterval(atualizarMercados,5000)
function atualizarHeatmap(){
    for(let ativo in dados){
        let box = document.getElementById(ativo)
        let preco = dados[ativo].preco
        let variacao = dados[ativo].variacao

        box.innerHTML = `
        <b>${ativo}</b>
        <br>
        ${preco}
        <br>
        ${variacao}
        `
        if(variacao > 0){
            box.style.background = "#16c784"
        }
        else{
            box.style.background = "#ea3943"
        }
    }

let acoes = document.querySelectorAll(".acao")

acoes.forEach(acao=>{

let variacao = Math.random()*4-2

acao.innerText = acao.innerText.split(" ")[0] + " " + variacao.toFixed(2)+"%"

if(variacao > 1){

acao.style.background="#16a34a"

}

else if(variacao > 0){

acao.style.background="#22c55e"

}

else if(variacao > -1){

acao.style.background="#ef4444"

}

else{

acao.style.background="#991b1b"

}

})

}

setInterval(atualizarHeatmap,4000)
function atualizarHeatmap(dados){
    for(let ativo in dados){
        let box = document.getElementById(ativo)
        let variacao = dados[ativo].variacao

        box.innerText = ativo + " " + variacao + "%"

        if(variacao > 0){
            box.style.background = "#16c784"
        }
        else{
            box.style.backgroun = "#ea3943"
        }
    }

const blocos = document.querySelectorAll(".bloco")

blocos.forEach(bloco=>{

let variacao = (Math.random()*6 - 3).toFixed(2)

let acao = bloco.dataset.acao

bloco.innerHTML = acao + "<br>" + variacao + "%"

if(variacao > 3){

bloco.style.background = "#065f46"

}

else if(variacao > 1){

bloco.style.background = "#16a34a"

}

else if(variacao > 0){

bloco.style.background = "#22c55e"

}

else if(variacao > -1){

bloco.style.background = "#ef4444"

}

else if(variacao > -3){

bloco.style.background = "#b91c1c"

}

else{

bloco.style.background = "#7f1d1d"

}

})

}

setInterval(atualizarHeatmap,4000)

async function buscarDadosAPI(){

try{

const resposta = await fetch("http://127.0.0.1:5000/mercado")

const dados = await resposta.json()

console.log(dados)

document.getElementById("btc").innerText = dados.bitcoin
document.getElementById("eth").innerText = dados.ethereum
document.getElementById("petr4").innerText = dados.petr4
document.getElementById("vale").innerText = dados.vale3

grafico.data.datasets[0].data.push(dados.bitcoin)
grafico.data.datasets[1].data.push(dados.ethereum)
grafico.data.datasets[2].data.push(dados.petr4)
grafico.data.datasets[3].data.push(dados.vale3)

grafico.data.labels.push("Agora")
grafico.update()


}catch(erro){

console.log("Erro ao buscar dados da API", erro)

}

}
setInterval(buscarDadosAPI, 4000)

async function carregarMapa(){
    let resposta= await fetch("https://127.0.0.1:5000/mapa")
    let dados = await resposta.json()
    console.log(dados)
}
new TradingView.widget({
    "width": "100%",
    "height": 500,

    "symbol": "BINANCE:BTCUSDT",

    "interval": "5",

    "timezone": "America/Sao_Paulo",

    "theme": "dark",

    "style": "1",
    
    "locale": "br",

    "container_id": "graficoTrading"
}) ;
function iniciarMapa(){
    var mapa = L.map('mapa').setView([20, 0], 2)
    L.titleLayer('https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png',{
        atribution: '© OpenStreetMap'
    }).addTo(mapa)

L.marker([37.77, -122.41]).addTo(mapa).bindPopup("NASDAQ")
L.marker([40.71, -74.00]).addTo(mapa).bindPopup("NYSE")
L.marker([-23.55, -46.63]).addTo(mapa).bindPopup("B3 - Brasil")
L.marker([35.68, 139.69]).addTo(mapa).bindPopup("Nikkei - Japão")
L.marker([51.50, -0.12]).addTo(mapa).bindPopup("FTSE - Londres")
}