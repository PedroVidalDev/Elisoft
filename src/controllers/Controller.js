class Controller{
    constructor(service){
        this.service = service;
    }

    async pegaTodos(req, res, next){
        try {
           const listaRegistros = await this.service.pegaTodosPorIdUsuario(req.user.id);
            return res.status(200).json(listaRegistros); 
        } 
        
        catch (error) {
            next(error);
        }
        

    }

    async pegaUmPorId(req, res, next){
        try {
            const {id} = req.params;

            const registro = await this.service.pegaUmRegistroPorId(id);
            return res.status(200).json(registro);
        } 
        
        catch (error) {
            next(error);
        }
        

    }

    async criaNovo(req, res, next){
        try {
            const dados = req.body;

            const novoRegistro = await this.service.criaRegistro(dados);
            return res.status(201).json(novoRegistro);
        } 
        
        catch (error) {
            next(error);
        }
        

    }

    async exclui(req, res, next){
        try {
            const { id } = req.params;
            console.log(id)

            await this.service.excluiRegistro({id: Number(id)});
            return res.status(204);
        } catch (error) {
            next(error);
        }
        

    }
}

module.exports = Controller;