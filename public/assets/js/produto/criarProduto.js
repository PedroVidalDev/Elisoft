import { mostrarMensagem } from "../utils/mensagemAlerta.js";
import { header, headerAuth } from "./../utils/header.js";
import request from "./../utils/requestHttp.js"

const nomeInput = document.querySelector("#nome-input");
const precoInput = document.querySelector("#preco-input");
const quantidadeInput = document.querySelector("#quantidade-input");
const descricaoInput = document.querySelector("#descricao-input");

//SE FOR EDICAO DE PRODUTO
const parametros = new URLSearchParams(window.location.search);
const produtoIdParam = parametros.get("produtoId");

window.onload = async () => {
    if(produtoIdParam != null){
        const reqData = await request(`produtos/${produtoIdParam}`, "GET", headerAuth, null);
    
        nomeInput.value = reqData.nome;
        precoInput.value = reqData.preco;
        quantidadeInput.value = reqData.quantidade;
        descricaoInput.value = reqData.descricao;
    }
}


//BOTAO PARA SAIR DO WEBSITE
const botaoSair = document.querySelector("#sair-botao");
botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
})


// ALGORITMO DE ENVIO DO FORMS
const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let dados = Object.fromEntries(formData);
    let jsonDados = JSON.stringify(dados);

    if(produtoIdParam != null){
        const reqData = await request(`produtos/${produtoIdParam}`, "PUT", headerAuth, jsonDados);

        mostrarMensagem(reqData.mensagem);

        if(reqData.status = 200){
            window.location.href = "/pages/produto/produtos.html";
        }
    }
    
    else{
        const reqData = await request("produtos", "POST", headerAuth, jsonDados);
        
        mostrarMensagem(reqData.mensagem);

        if(reqData.status == 201){
            window.location.href = "/pages/produto/produtos.html";
        }
    }
})