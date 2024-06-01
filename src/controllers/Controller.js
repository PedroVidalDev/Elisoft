class Controller{
    constructor(service){
        this.service = service;
    }

    async pegaTodos(req, res){
        try {
           const listaRegistros = await this.service.pegaTodosPorIdUsuario(req.user.id);
            return res.status(200).json(listaRegistros); 
        } 
        
        catch (error) {
            return res.status(400).json({
                mensagem: "Erro na busca."
            })
        }
        

    }

    async pegaUmPorId(req, res){
        try {
            const {id} = req.params;

            const registro = await this.service.pegaUmRegistroPorId(id);
            return res.status(200).json(registro);
        } 
        
        catch (error) {
            return res.status(400).json({
                mensagem: "Erro na busca."
            })
        }
        

    }

    async criaNovo(req, res){
        try {
            const dados = req.body;

            const novoRegistro = await this.service.criaRegistro(dados);
            return res.status(201).json(novoRegistro);
        } 
        
        catch (error) {
            return res.status(400).json({
                mensagem: "Erro na criacao."
            })
        }
        

    }

    async exclui(req, res){
        try {
            const { id } = req.params;

            await this.service.excluiRegistro(Number(id));
            return res.status(204);
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro na exclusao."
            })
        }
        

    }
}

module.exports = Controller;