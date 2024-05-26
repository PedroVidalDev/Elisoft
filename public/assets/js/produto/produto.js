import request from "./../utils/requestHttp.js";
import { headerAuth } from "./../utils/header.js";

const botaoSair = document.querySelector("#sair-botao");
botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
})

const botaoCriar = document.querySelector("#criar-botao");
const tbody = document.querySelector("tbody");

window.onload = async () => {
    const reqData = await request("produtos", "GET", headerAuth, null);

    tbody.innerHTML = "";

    reqData.forEach(produto => {

        const tr = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.innerHTML = produto.nome;

        const tdQuantidade = document.createElement("td");
        tdQuantidade.innerHTML = produto.quantidade;

        const tdPreco = document.createElement("td");
        tdPreco.innerHTML = `R$ ${produto.preco}`;

        const tdAcao = document.createElement("td")

        const botaoEditar = document.createElement("button");
        botaoEditar.className = "botao-acao";
        botaoEditar.innerHTML = "Editar";
        botaoEditar.addEventListener("click", () => {
            window.location.href = `/pages/produto/criarProduto.html?produtoId=${produto.id}`;
        })

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "botao-acao";
        botaoExcluir.innerHTML = "Excluir";

        tdAcao.appendChild(botaoEditar);
        tdAcao.appendChild(botaoExcluir);

        const tdVender = document.createElement("td");

        const botaoVender = document.createElement("button");
        botaoVender.className = "botao-acao";
        botaoVender.innerHTML = "Vender";
        botaoVender.addEventListener("click", () => {
            window.location.href = `/pages/venda/criarVenda.html?produtoId=${produto.id}`
        })

        tdVender.appendChild(botaoVender);

        tr.appendChild(tdNome);
        tr.appendChild(tdQuantidade);
        tr.appendChild(tdPreco);
        tr.appendChild(tdAcao);
        tr.appendChild(tdVender);

        tbody.appendChild(tr);
    });
}

botaoCriar.addEventListener("click", () => { window.location.href = "/pages/produto/criarProduto.html"});