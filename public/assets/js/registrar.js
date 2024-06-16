import request from "./utils/requestHttp.js";
import { header } from "./utils/header.js";
import { mostrarMensagem } from "./utils/mensagemAlerta.js";

const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let dados = Object.fromEntries(formData);
    
    if(dados.senha != dados.confirmar){
        mostrarMensagem("Senhas devem estar iguais!");
        return;
    }

    let dadosLimpos = {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha
    }

    let jsonDados = JSON.stringify(dadosLimpos);

    const reqData = await request("registrar", "POST", header, jsonDados);

    if(reqData.status == 201){    
        window.location.href = "/";
    } else{
        mostrarMensagem(reqData.mensagem);
    }

})