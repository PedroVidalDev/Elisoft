import request from "./utils/requestHttp.js";
import { header } from "./utils/header.js";

const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let dados = Object.fromEntries(formData);
    
    if(dados.senha != dados.confirmar){
        alert("Senhas devem estar iguais!");
        return;
    }

    let dadosLimpos = {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha
    }

    let jsonDados = JSON.stringify(dadosLimpos);

    const reqData = await request("registrar", "POST", header, jsonDados);

    if(reqData != null){
        alert(reqData.mensagem);
        window.location.href = "/";
    } else{
        alert("Erro no registro. Favor verificar suas informacoes.");
    }

})