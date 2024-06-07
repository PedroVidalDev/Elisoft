import request from "./utils/requestHttp.js";
import { header } from "./utils/header.js";

const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let dados = Object.fromEntries(formData);
    let jsonDados = JSON.stringify(dados);

    const reqData = await request("login", "POST", header, jsonDados);
    console.log(reqData)

    if(!reqData.status == 403 || reqData.status == null){
        localStorage.setItem("token", reqData.token);
        alert(reqData.mensagem);
        window.location.href = "/pages/dashboard.html";
    } else{
        alert(reqData.mensagem);
    }

})