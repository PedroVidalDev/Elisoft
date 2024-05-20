const Service = require("./Service.js");

class ProdutoService extends Service{
    constructor(){
        super("Produto");
    }
}

module.exports = ProdutoService;