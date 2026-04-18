# 🛒 Microsserviço de Usuários (E-commerce API)

> Repositório contendo o **Microsserviço de Usuários**, desenvolvido como parte do projeto final de arquitetura de microsserviços para um sistema de E-commerce. O serviço gerencia cadastros, endereços e atua como agregador de dados via API Composition.

## 🛠️ Tecnologias e Frameworks Utilizados

O projeto foi construído utilizando as seguintes ferramentas modernas do ecossistema JavaScript:

* **[Node.js](https://nodejs.org/)**: Ambiente de execução do servidor back-end.
* **[Restify](http://restify.com/)**: Framework web focado na construção de APIs RESTful estruturadas e de alta performance.
* **[Prisma ORM](https://www.prisma.io/)**: ORM de última geração utilizado para modelagem de dados, *migrations* e consultas *type-safe*.
* **[MySQL](https://www.mysql.com/)**: Banco de dados relacional para persistência segura das informações.
* **Nativo (Fetch API)**: Utilizado para comunicação *Server-to-Server* assíncrona.

---

## ✅ Funcionalidades e Requisitos (Status)

- [x] CRUD Completo de Usuários (Nome, Email, Senha, Telefone).
- [x] Gerenciamento de Endereços (Relação de 1:N com Usuário).
- [x] Validações e prevenção de duplicidade (Tratamento do Erro Prisma `P2002`).
- [x] **Integração (Regra 1):** Comunicação entre serviços via requisição HTTP externa.

---

## 🚀 Destaque: Integração entre Microsserviços 

Cumprindo os requisitos técnicos da arquitetura, implementamos o padrão **API Composition**. 
A rota `/perfil-completo` unifica os dados locais (Usuários e Endereços) com os dados externos buscando no **Microsserviço de Pedidos**. 

**Exemplo do Payload Retornado:**
```
JSON:
{
  "id": 1,
  "nome": "Yasmin Mimi",
  "email": "mimi@ads.com",
  "enderecos": [
     { "rua": "Av das Tecnologias", "numero": "1024" }
  ],
  "historicoDeCompras": [
     { "idPedido": 105, "status": "Entregue" }
  ]
} 
```

---

# 🛣️ Rotas da API:

| Método | Rota                            | Descrição                                |
| ------ | ------------------------------- | ---------------------------------------- |
| GET    | `/usuarios`                     | Lista todos os usuários cadastrados      |
| POST   | `/usuarios`                     | Cria um novo usuário                     |
| GET    | `/usuarios/:id`                 | Busca um usuário específico por ID       |
| PUT    | `/usuarios/:id`                 | Atualiza os dados de um usuário          |
| DELETE | `/usuarios/:id`                 | Remove o usuário do sistema em cascata   |
| POST   | `/usuarios/:idUsuario/endereco` | Adiciona um endereço a um usuário        |
| GET    | `/usuarios/:idUsuario/endereco` | Busca os endereços vinculados ao usuário |
| GET    | `/usuarios/:id/perfil-completo` | Integração: Retorna o perfil + pedidos   |

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
* **[Gustavo ]** — *Responsável pelo Microsserviço de Pagamento.*

### 🎓 Propósito Acadêmico

Este projeto é um resultado prático das atividades desenvolvidas na disciplina de **Programação Web II** no curso de **Análise e Desenvolvimento de Sistemas (ADS)**. 

O objetivo principal foi explorar a viabilidade técnica de uma arquitetura de microsserviços, focando em:
* Desacoplamento de responsabilidades entre serviços independentes.
* Comunicação entre aplicações via protocolo HTTP (comunicação *Server-to-Server*).
* Modelagem e manipulação de dados utilizando o **Prisma ORM** em ambiente **Node.js**.

---
*Projeto desenvolvido com fins estritamente didáticos e de aprendizado prático.*