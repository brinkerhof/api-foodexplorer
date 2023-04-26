<div align="center">
  <img alt="Logo Explorer" title="Explorer" src="https://i.imgur.com/2IqqDoo.png">
</div>
<br>

<div align="center">
  <img alt="Capa do projeto" title="FoodExplorer" src="https://i.imgur.com/eOwPbOt.jpg">
</div>
<br>

# FOOD EXPLORER

Restaurante digital<br>
O projeto será divido em duas partes: `Front-end` e `Back-end`<br>
Este e o `Back-end`.<br>
Link para o `Front-end`: https://github.com/brinkerhof/front-foodexplorer

Link de `Deploy`: https://api-food-explorer-nwu0.onrender.com

### 📘 Tecnologias utilizadas no `Front-end`

- [Node.js](https://nodejs.org/en/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Express](https://expressjs.com)
- [Nodemon](https://nodemon.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [Knex](https://knexjs.org/)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [CORS](https://www.npmjs.com/package/cors)
- [ESLint](https://eslint.org/)

## Instalação

```bash
# Faça o clone do repotório
$ git clone git@github.com:brinkerhof/api-foodexplorer

# Acessar a pasta do projeto pelo terminal
$ cd api-foodexplorer

# Faça a instalação das depêndencias
$ npm i

# Este comando cria as tabelas no banco de dados
# Como estamos usando Sqlite3 nesse projeto, ele ja vem com os dados ao clonar o repo
$ npm run migrate

# Este comando cria o usuario de Admin no banco se voce resolveu usar o npm migrate
$ npm run seed

# Admin login
$ email: admin@admin.com
$ password: 123456

# User login
$ email: user@user.com
$ password: 123456

# Executando o projeto no ambiente de desenvolvimento
$ npm run start
# A api estara rodando em http://localhost:3000
```

## ✔️ Autor

- [Murilo Cabral](https://github.com/brinkerhof)
