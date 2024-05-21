const jwt = require("jsonwebtoken");
const CHAVE = process.env.CHAVE;

const autenticarToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if(!token){
        res.status(401);
    }
    jwt.verify(token, CHAVE, (err, usuario) => {
        if(err){
            return res.status(403);
        }
        req.user = user;
        next();
    })
}

module.exports = autenticarToken;