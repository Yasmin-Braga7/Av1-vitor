# 🛒 Microsserviço de Usuários (E-commerce API)

> Repositório contendo o **Microsserviço de Usuários**, desenvolvido como parte do projeto final de arquitetura de microsserviços para um sistema de E-commerce. O serviço gerencia cadastros, endereços e atua como agregador de dados via API Composition.

## 🛠️ Tecnologias e Frameworks Utilizados

O projeto foi construído utilizando as seguintes ferramentas modernas do ecossistema JavaScript:

* **[Node.js](https://nodejs.org/)**: Ambiente de execução do servidor back-end.
* **[Restify](http://restify.com/)**: Framework web focado na construção de APIs RESTful estruturadas e de alta performance.
* **[Prisma ORM](https://www.prisma.io/)**: ORM de última geração utilizado para modelagem de dados, *migrations* e consultas *type-safe*.
* **[MySQL](https://www.mysql.com/)**: Banco de dados relacional para persistência segura das informações.
* **Nativo (Fetch API)**: Utilizado para comunicação *Server-to-Server* assíncrona.
* **[JSON Web Token (JWT)](https://jwt.io/)**: Padrão utilizado para a geração de tokens de acesso seguro.
* **Nativo (Fetch API)**: Utilizado para comunicação *Server-to-Server* assíncrona.

---

## ✅ Funcionalidades e Requisitos (Status)

- [x] CRUD Completo de Usuários (Nome, Email, Senha, Telefone).
- [x] Gerenciamento de Endereços (Relação de 1:N com Usuário).
- [x] Validações e prevenção de duplicidade (Tratamento do Erro Prisma `P2002`).
- [x] **Integração (Regra 1):** Comunicação entre serviços via requisição HTTP externa.

---

## 🔐 Autenticação e Autorização

A segurança da API é garantida através da implementação de **JSON Web Tokens (JWT)** e *hash* de senhas.

* **Proteção de Senhas:** As senhas dos usuários são criptografadas no banco de dados utilizando a biblioteca `bcrypt`. Elas nunca são trafegadas limpas nas respostas da API.
* **Middlewares de Segurança:** A maior parte das rotas exige um token de acesso válido. O token é gerado na rota de `/login` e deve ser enviado através do cabeçalho de requisição `Authorization`.
* **Sessões Controladas:** Os tokens possuem tempo de expiração configurado (ex: 3 horas) para mitigar falhas de segurança em caso de vazamento.

---

## 🚀 Destaque: Integração entre Microsserviços 

Cumprindo os requisitos técnicos da arquitetura, implementamos o padrão **API Composition**. 
A rota `/perfil-completo` unifica os dados locais (Usuários e Endereços) com os dados externos buscando no **Microsserviço de Pedidos**. 

**Exemplo do Payload Retornado:**
```
JSON:
{
  "id": 3,
  "nome": "Laura Santos",
  "email": "Laura@gmail.com",
  "telefone": "219777-888",
  "createdAt": "2026-04-27T13:58:59.913Z",
  "updatedAt": "2026-04-29T11:38:45.302Z",
  "enderecos": [
     { 
       "id": 2, 
       "rua": "Av das Américas", 
       "numero": "1000", 
       "bairro": "Barra da Tijuca", 
       "cidade": "Rio de Janeiro", 
       "estado": "RJ", 
       "cep": "22640-100" 
     }
  ],
  "historicoDeCompras": [
     { 
       "id": 4, 
       "status": "CRIADO", 
       "total": 50, 
       "itens": [ { "produtoId": 5, "quantidade": 1, "preco": 50 } ] 
     }
  ]
}
```

---

# 🛣️ Rotas da API:

| Método | Rota | Descrição | Autenticação |
|--------|------|------------|--------------|
| POST | `/usuarios` | Cria um novo usuário | 🔓 Livre |
| POST | `/login` | Realiza login e retorna o Token JWT | 🔓 Livre |
| GET | `/usuarios` | Lista todos os usuários cadastrados | 🔒 JWT |
| GET | `/usuarios/:id` | Busca um usuário específico por ID | 🔒 JWT |
| PUT | `/usuarios/:id` | Atualiza os dados de um usuário | 🔒 JWT |
| DELETE | `/usuarios/:id` | Remove o usuário do sistema em cascata | 🔒 JWT |
| POST | `/usuarios/:idUsuario/endereco` | Adiciona um endereço a um usuário | 🔒 JWT |
| GET | `/usuarios/:idUsuario/endereco` | Busca os endereços vinculados ao usuário | 🔒 JWT |
| GET | `/usuarios/:id/perfil-completo` | Integração: Retorna o perfil + os pedidos | 🔒 JWT |

---

1. ### Clone este repositório:

   `git clone <url-do-repositorio>`

2. ### Instale as dependências:

   `npm install`

3. ### Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto.

   - Adicione a sua String de conexão com o banco MySQL:
   `DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"`

4. ### Execute as migrations (criação do banco):

   `npx prisma migrate dev --name init`

5. ### Inicie o servidor (Porta: `3005`):

   `npm run dev`

> [!NOTE]
> Eu estou usando a porta `3005`, mas podem usar a padrão que é a `3000`.

---

### 👩‍💻 Desenvolvedora

* **Yasmin Braga (Mimi)** — *Desenvolvimento da arquitetura e código completo do Microsserviço de Usuários.*

### 🤝 Integração e Parcerias

Para cumprir a regra arquitetural de consumo entre microsserviços estabelecida na disciplina, esta API foi projetada para realizar requisições externas e unificar dados com os microsserviços desenvolvidos pelos meus colegas de grupo:

* **[Laura ]** — *Responsável pelo Microsserviço de Pedidos.*
* **[Gustavo ]** — *Responsável pelo Microsserviço de Estoque.*
* **[Pablo ]** — *Responsável pelo Microsserviço de Pagamento.*

### 🎓 Propósito Acadêmico

Este projeto é um resultado prático das atividades desenvolvidas na disciplina de **Programação Web II** no curso de **Análise e Desenvolvimento de Sistemas (ADS)**. 

O objetivo principal foi explorar a viabilidade técnica de uma arquitetura de microsserviços, focando em:
* Desacoplamento de responsabilidades entre serviços independentes.
* Comunicação entre aplicações via protocolo HTTP (comunicação *Server-to-Server*).
* Modelagem e manipulação de dados utilizando o **Prisma ORM** em ambiente **Node.js**.

---
*Projeto desenvolvido com fins estritamente didáticos e de aprendizado prático.*
