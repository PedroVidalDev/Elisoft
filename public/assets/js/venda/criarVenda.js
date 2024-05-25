import { headerAuth } from "./../utils/header.js";
import request from "./../utils/requestHttp.js"

const parametros = new URLSearchParams(window.location.search);
const produtoId = parametros.get("produtoId");
const produtoNome = parametros.get("produtoNome");

if(produtoId != null && produtoNome != null){
    document.querySelector("#produto-input").value = (produtoId + "-" + produtoNome);
}

const botaoSair = document.querySelector("#sair-botao");
botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
})

const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let dados = Object.fromEntries(formData);
    dados.produto = Number(produtoId);
    let jsonDados = JSON.stringify(dados);

    console.log(jsonDados)

    const reqData = await request("vendas", "POST", headerAuth, jsonDados);

    if(reqData != null){
        alert(reqData.mensagem);
        window.location.href = "/pages/venda/vendas.html";
    } else{
        alert("Erro na criacao da venda. Por favor verificar os dados e tentar denovo.");
    }
})