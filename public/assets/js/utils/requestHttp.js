async function request(entidade, metodo, header, body){
    let response;

    //let endereco = 

    await fetch(`http://elisoftapp.local:3000/${entidade}`,{
        mode: "cors",
        method: `${metodo}`,
        headers: header,
        body: body
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        response = data;
    })
    .catch(err => {
        console.error(err);
    })

    return response;
}

export default request;