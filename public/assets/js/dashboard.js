import { headerAuth } from "./utils/header.js";
import request from "./utils/requestHttp.js";

const botaoSair = document.querySelector("#sair-botao");
botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
})

// ESTOQUE //
const containerEstoque = document.querySelector("#container-produtos-mais-estoque");

const reqDataEstoque = await request("produtos/maiorEstoque", "GET", headerAuth, null);
reqDataEstoque.forEach(produto => {
    const texto = document.createElement("p");
    texto.innerHTML = `${produto.nome} - ${produto.quantidade}u`;
    containerEstoque.appendChild(texto);
});

// FLUXO //
const textoGastos = document.querySelector("#texto-gastos");
const textoVendas = document.querySelector("#texto-vendas");
const textoLucro = document.querySelector("#texto-lucro");

const reqDataFluxo = await request("vendas/fluxo", "GET", headerAuth, null);

let produtos = reqDataFluxo.produtos;
let vendas = reqDataFluxo.vendas;

let gastos = produtos.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
let restoDosGastos = vendas.reduce((acc, venda) => acc + (venda.Produto.preco), 0);
let gastosTotais = gastos + restoDosGastos;

let vendasTotais = vendas.reduce((acc, venda) => acc + venda.valor, 0);

textoGastos.innerHTML = `Gastos: <b> R$ ${gastosTotais} </b>`;
textoVendas.innerHTML = `Vendas: <b> R$ ${vendasTotais} </b>`;
textoLucro.innerHTML = `Lucro: <b> R$ ${vendasTotais - gastosTotais} </b>`;

// RESETAR //
const botaoResetar = document.querySelector("#botao-resetar");
botaoResetar.addEventListener("click", async () => {
    const reqData = await request("vendas/resetar", "POST", headerAuth, null);
    
    if(reqData != null){
        alert(reqData.mensagem);
        window.location.href = "/pages/dashboard.html";
    } else{
        alert("Erro no reset de vendas e produtos.");
    }
})
