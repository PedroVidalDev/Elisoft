import { headerAuth } from "./../utils/header.js";
import request from "./../utils/requestHttp.js"

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
    let jsonDados = JSON.stringify(dados);

    const reqData = await request("vendas", "POST", headerAuth, jsonDados);

    if(reqData != null){
        alert(reqData.mensagem);
        window.location.href = "/pages/venda/vendas.html";
    } else{
        alert("Erro na criacao da venda. Por favor verificar os dados e tentar denovo.");
    }
})