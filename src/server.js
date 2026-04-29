const restify = require("restify");
require('dotenv').config();
const UsuariosController = require("./controllers/usuarios.controller");
const verificarToken = require("./middlewares/auth.middleware");

const server = restify.createServer({
  name: "api-usuarios",
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post("/usuarios", UsuariosController.criar);
server.post("/login", UsuariosController.login);
server.get("/interno/usuarios/:id", UsuariosController.buscarPorId);

// Rotas de usuário
server.get("/usuarios", verificarToken ,UsuariosController.listar);
server.get("/usuarios/:id", verificarToken ,UsuariosController.buscarPorId);
server.put("/usuarios/:id", verificarToken ,UsuariosController.atualizar);
server.del("/usuarios/:id", verificarToken ,UsuariosController.deletar);

// Rotas de endereço
server.post("/usuarios/:idUsuario/endereco", verificarToken ,UsuariosController.criarEndereco);
server.get("/usuarios/:idUsuario/endereco", verificarToken ,UsuariosController.buscarEnderecoPorUsuario);

 // Rota do consumo da API de Pedidos
server.get("/usuarios/:id/perfil-completo", verificarToken ,UsuariosController.perfilCompleto);

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`${server.name} rodando em ${server.url}`);
});

// como fazer o router funcionar so colocar isso aqui nesse arquivo
// routes(server); e fazer o importe dele la em cima