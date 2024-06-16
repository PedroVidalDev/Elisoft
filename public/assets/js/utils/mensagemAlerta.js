export function mostrarMensagem(texto) {
    var mensagem = document.getElementById("mensagem");
    mensagem.classList.add("show");
    mensagem.innerHTML = texto;
    setTimeout(
        function(){
            mensagem.classList.remove("show"); 
        }, 2500);
}