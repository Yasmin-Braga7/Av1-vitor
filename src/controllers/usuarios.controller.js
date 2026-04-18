const prisma = require("../config/prisma");

class UsuariosController {

    // Metodo GetAll, onde posso listar todos os usuarios e trazer seus id.
    static async listar(req, res) {
        try {
            const usuarios = await prisma.usuario.findMany({
                orderBy: { id: "asc" }
            });
            res.send(200, usuarios);
        } catch (error) {
            res.send(500, { message: "Erro ao listar usuários." });
        }
    }

    // Metodo Post, esse posso criar um usuario, ele inclui validação para evitar
    //emails duplicados (Erro P2002 do Prisma).
    static async criar(req, res) {
        try {
            const { nome, email, senha, telefone } = req.body;
            if (!nome || !email || !senha) {
                res.send(400, {
                    message: "Nome e email são obrigatórios."
                });
            }
            const novoUsuario = await prisma.usuario.create({
                data: { nome, email, senha, telefone }
            });
            res.send(201, novoUsuario);
        } catch (error) {
            console.error("Erro realdo Prisma", error);
            if (error.code === "P2002") {
                res.send(409, { message: "Já existe usuário com esse email." });

            }
            res.send(500, { message: "Erro ao cadastrar usuário." });
        }
    }

    // Metodo de buscar os usuarios pelo ID(GetById), esse eu posso puxar
    // um usuario especifico com apenas o ID.
    static async buscarPorId(req, res) {
        try{
            const {id} = req.params;
            const usuario = await prisma.usuario.findUnique({
                where: {id: Number(id)}
            });
            if(!usuario) {
                return res.send(404, { message: "Usuário não encontrado."});
            }
            res.send(200, usuario);
        } catch (error) {
            res.send(500, { message: "Erro ao buscar usuário"});
        }
    }

    // Metodo (Put) esse é para atualizar o usuario
    static async atualizar(req, res) {
        try{
            const {id} = req.params;
            const dados = req.body;

            const usuarioAtualizado = await prisma.usuario.update({
                where: {id: Number(id)},
                data: dados
            });
            res.send(200, usuarioAtualizado);
        } catch (error) {
            res.send(400, { message: "Erro ao atualizar usuário. Verifique os dados"});
        }
    }

    // Metodo Delete
    static async deletar(req, res) {
        try {
            const {id} = req.params;
            await prisma.usuario.delete({
                where: {id: Number(id)}
            });
            res.send(204); // Esse 204 significa que o delete foi concluido
        } catch (error) {
            res.send(404, { message: "Usuário não encontrado para excluir."});
        }
    }

    //-------------------------------------------
    //          METODO DE ENDEREÇO
    //-------------------------------------------

    // Metodo de criar um endereço (PostAdress)
    static async criarEndereco(req, res) {
        try {
            const {idUsuario} = req.params;
            const {rua, numero, bairro, cidade, estado, cep} = req.body;

            const novoEndereco = await prisma.endereco.create({
                data: {rua, numero, bairro, cidade, estado, cep, idUsuario: Number(idUsuario)}
            });
            res.send(201, novoEndereco);
        } catch (error) {
            res.send(400, { message: "Erro ao criar endereço."});
        }
    }

    // Metodo de buscar endereço do Usuário (GetAdress) esse traz
    // todos os endereços que estão vinculado ao usuário especifico
    static async buscarEnderecoPorUsuario(req, res) {
        try {
            const {idUsuario} = req.params;
            const enderecos = await prisma.endereco.findMany({
                where: {idUsuario: Number(idUsuario)}
            });
            res.send(200, enderecos);
        } catch (error) {
            res,send(500, { message: "Erro ao buscar endereços."});
        }
    }

    //------------------------------------------------------
    //    CONEXÃO COM O MICROSERVIÇO DE PEDIDOS(Laura)
    //------------------------------------------------------

    // Esse metodo traz o perfil completo do usuario, aqui eu vou consumir
    // o microserviço que a laura esta fazendo, com isso eu vou puxar
    // as informações completa do usuario, tipo vai vim as informações
    // do usuario, de endereços e tambem os pedidos tambem.
    static async perfilCompleto(req, res) {
        try {
            const {id} = req.params;

            // Aqui vamos buscar o usuario e os enderços.
            const usuario = await prisma.usuario.findUnique({
                where: {id: Number(id)},
                include: {enderecos: true}
            });
            if (!usuario) {
                return res.send(404, { message: "Usuário não encontrado."})
            }

            // Aqui vamos consumir a API de microserviço de Pedidos
            const urlPedidos = `http://localhost:3009/pedidos/usuario/${id}`;
            let pedidos = [];

            try {
                const response = await fetch(urlPedidos);
                if (response.ok) {
                    pedidos = await response.json();
                }
            } catch (err) {
                console.warn("Aviso: O microserviço de Pedidos está offline.")
            }

            // Se tudo der certo o JSON com as informações vai vim perfeitamente
            res.send(200, { ...usuario, historicoDeCompras: pedidos});
        } catch (error) {
            res.send(500, { message: "Erro ao carregar o perfil completo."});
        }
    }
}

module.exports = UsuariosController;