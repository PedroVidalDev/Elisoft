import { headerAuth } from "./../utils/header.js";
import request from "./../utils/requestHttp.js"

const divSelect = document.querySelector("#ajustar-select");

const botaoSair = document.querySelector("#sair-botao");
botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
})

window.onload = async () => {
    const reqData = await request("produtos", "GET", headerAuth, null);

    let selectProdutos = document.createElement("select");
    selectProdutos.id = "produto-input";
    selectProdutos.className = "produto-input";

    reqData.forEach(produto => {
        let option = document.createElement("option");
        option.innerHTML = produto.nome;
        option.value = produto.id;
        selectProdutos.appendChild(option);
    });

    divSelect.appendChild(selectProdutos);

    const parametros = new URLSearchParams(window.location.search);
    const produtoIdParam = parametros.get("produtoId");

    if(produtoIdParam != null){
        selectProdutos.value = produtoIdParam;
    }
}

const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let dados = Object.fromEntries(formData);
    dados.produto = Number(document.querySelector("#produto-input").value);
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