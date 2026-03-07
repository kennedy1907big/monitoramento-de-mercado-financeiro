const { useState, useEffect } = React;

function Dashboard(){

const [ativos,setAtivos] = useState([
 {nome:"Bitcoin", preco:350000, tendencia:"Alta"},
 {nome:"Ethereum", preco:18000, tendencia:"Estável"},
 {nome:"PETR4", preco:36.10, tendencia:"Baixa"},
 {nome:"VALE3", preco:68.50, tendencia:"Alta"}
]);

useEffect(()=>{

 const intervalo = setInterval(()=>{

   setAtivos(prev =>
     prev.map(a => {

       const novoPreco = (parseFloat(a.preco) + (Math.random()*10 - 5)).toFixed(2)

       let novaTendencia = "Estável"

       if(novoPreco > a.preco){
         novaTendencia = "Alta"
       }else if(novoPreco < a.preco){
         novaTendencia = "Baixa"
       }

       return {
         ...a,
         preco: novoPreco,
         tendencia: novaTendencia
       }

     })
   )

 },5000)

 return ()=> clearInterval(intervalo)

},[])

return(

<div>

<h1>Monitoramento de Mercado Financeiro</h1>

<div className="ativos">

{ativos.map((a,index)=>{

return(

<div key={index} className="card">

<h2>{a.nome}</h2>

<p>Preço: {a.preco}</p>

<p className={
a.tendencia === "Alta"
? "alta"
: a.tendencia === "Baixa"
? "baixa"
: "estavel"
}>
Tendência: {a.tendencia}
</p>

</div>

)

})}

</div>

</div>

)

}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Dashboard />)