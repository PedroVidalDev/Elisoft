const botaoSair = document.querySelector("#sair-botao");
botaoSair.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
})

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

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "botao-acao";
        botaoExcluir.innerHTML = "Excluir";
        botaoExcluir.addEventListener("click", async () => {
            await request(`vendas/${venda.id}`, "DELETE", headerAuth, null);
            alert("Venda excluida com sucesso!");
            window.location.href = "/pages/venda/vendas.html";
        })

        tdAcao.appendChild(botaoExcluir);

        tr.appendChild(tdCliente);
        tr.appendChild(tdProduto);
        tr.appendChild(tdValor);
        tr.appendChild(tdAcao);

        tbody.appendChild(tr);
    });
}
