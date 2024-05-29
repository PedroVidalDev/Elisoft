import { headerAuth } from "./utils/header.js";
import request from "./utils/requestHttp.js";

const botaoSair = document.querySelector("#sair-botao");
botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
})

const containerEstoque = document.querySelector("#container-produtos-mais-estoque");

const textoGastos = document.querySelector("#texto-gastos");
const textoVendas = document.querySelector("#texto-vendas");
const textoLucro = document.querySelector("#texto-lucro");

const reqDataFluxo = await request("vendas/fluxo", "GET", headerAuth, null);

let produtos = reqDataFluxo.produtos;
let vendas = reqDataFluxo.vendas;

let gastosTotais = produtos.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
let vendasTotais = vendas.reduce((acc, produto) => acc + produto.valor, 0);

textoGastos.innerHTML = `Gastos: R$ ${gastosTotais}`;
textoVendas.innerHTML = `Vendas: R$ ${vendasTotais}`;
textoLucro.innerHTML = `Lucro: R$ ${vendasTotais - gastosTotais}`;

const reqDataEstoque = await request("produtos/maiorEstoque", "GET", headerAuth, null);
reqDataEstoque.forEach(produto => {
    const texto = document.createElement("p");
    texto.innerHTML = `${produto.nome} - ${produto.quantidade}u`;
    containerEstoque.appendChild(texto);
});
