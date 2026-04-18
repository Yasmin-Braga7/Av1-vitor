const restify = require("restify");
const UsuariosController = require("./controllers/usuarios.controller");

const server = restify.createServer({
  name: "api-usuarios",
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Rotas de usuário
server.get("/usuarios", UsuariosController.listar);
server.post("/usuarios", UsuariosController.criar);
server.get("/usuarios/:id", UsuariosController.buscarPorId);
server.put("/usuarios/:id", UsuariosController.atualizar);
server.del("/usuarios/:id", UsuariosController.deletar);

// Rotas de endereço
server.post("/usuarios/:idUsuario/endereco", UsuariosController.criarEndereco);
server.get("/usuarios/:idUsuario/endereco", UsuariosController.buscarEnderecoPorUsuario);

 // Rota do consumo da API de Pedidos
server.get("/usuarios/:id/perfil-completo", UsuariosController.perfilCompleto);

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`${server.name} rodando em ${server.url}`);
});

// como fazer o router funcionar so colocar isso aqui nesse arquivo
// routes(server); e fazer o importe dele la em cima