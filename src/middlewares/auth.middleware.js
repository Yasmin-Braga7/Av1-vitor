const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.send(401, { message: "Acesso negado. Token não fornecido."});
    }
    const partes = authHeader.split(" ");
    const token = partes.length === 2 ? partes[1] : partes[0];
    try {
        const decodificado = jwt.verify(token, "CHAVE_SECRETA");
        req.usuarioId = decodificado.id;
        return next();
    } catch(error) {
        return res.send(403, { message: "Token inválido ou expirado."});
    }
}

module.exports = verificarToken;