class Controller{
    constructor(service){
        this.service = service;
    }

    async pegaTodos(req, res){    
        const listaRegistros = await this.service.pegaTodos();
        return res.status(200).json(listaRegistros);

    }

    async pegaUmPorId(req, res){
        const {id} = req.params;

        const registro = await this.service.pegaPorId(id);
        return res.status(200).json(registro);

    }

    async criaNovo(req, res){
        const dados = req.body;

        const novoRegistro = await this.service.criaRegistro(dados);
        return res.status(201).json(novoRegistro);

    }

    async exclui(req, res){
        const { id } = req.params;

        await this.service.excluiRegistro(Number(id));
        return res.status(204);

    }
}

module.exports = Controller;