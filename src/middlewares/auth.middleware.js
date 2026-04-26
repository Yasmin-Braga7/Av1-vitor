const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.send(401, { message: "Acesso negado. Token não fornecido."});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodificado = jwt.verify(token, "CHAVE_SECRETA");
        req.usuarioId = decodificado.id;
        return next();
    } catch(error) {
        return res.send(403, { message: "Token inválido ou expirado."});
    }
}

module.exports = verificarToken;