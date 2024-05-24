const botaoCriar = document.querySelector("#criar-botao");

botaoCriar.addEventListener("click", () => { window.location.href = "/pages/venda/criarVenda.html"})

import request from "./../utils/requestHttp.js";
import { headerAuth } from "./../utils/header.js";

const tbody = document.querySelector("tbody");

window.onload = async () => {
    const reqData = await request("vendas", "GET", headerAuth, null);

    console.log(reqData)

    tbody.innerHTML = "";

    reqData.forEach(venda => {

        const tr = document.createElement("tr");

        const tdCliente = document.createElement("td");
        tdCliente.innerHTML = venda.cliente;

        const tdProduto = document.createElement("td");
        tdProduto.innerHTML = venda.Produto.nome;

        const tdValor = document.createElement("td");
        tdValor.innerHTML = `R$ ${venda.valor}`;

        const tdAcao = document.createElement("td")

        const botaoEditar = document.createElement("button");
        botaoEditar.className = "botao-acao";
        botaoEditar.innerHTML = "E";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "botao-acao";
        botaoExcluir.innerHTML = "X";

        tdAcao.appendChild(botaoEditar);
        tdAcao.appendChild(botaoExcluir);

        tr.appendChild(tdCliente);
        tr.appendChild(tdProduto);
        tr.appendChild(tdValor);
        tr.appendChild(tdAcao);

        tbody.appendChild(tr);
    });
}
