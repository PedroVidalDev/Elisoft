import { headerAuth } from "./utils/header.js";
import request from "./utils/requestHttp.js";

const textoGastos = document.querySelector("#texto-gastos");
const textoVendas = document.querySelector("#texto-vendas");
const textoLucro = document.querySelector("#texto-lucro");

const reqData = await request("vendas/fluxo", "GET", headerAuth, null);

let produtos = reqData.produtos;
let vendas = reqData.vendas;

let gastosTotais = produtos.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
let vendasTotais = vendas.reduce((acc, produto) => acc + produto.valor, 0);

textoGastos.innerHTML = `Gastos: R$ ${gastosTotais}`;
textoVendas.innerHTML = `Vendas: R$ ${vendasTotais}`;
textoLucro.innerHTML = `Lucro: R$ ${vendasTotais - gastosTotais}`;