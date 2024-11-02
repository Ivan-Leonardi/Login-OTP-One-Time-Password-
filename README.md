<h1 align="center" style="font-weight: bold;">Login OTP💻</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> •
 <a href="#started">Iniciar o projeto</a> •
  <a href="#routes">Endpoints da API</a>
</p>

<p align="center">
    <b>Sistema de Login Utilizando OTP (One-Time Password)</b>
</p>

<h2 id="technologies">💻 Tecnologias</h2>

- NodeJS
- Express
- Typescript
- JWT
- Postres
- Prisma
- zod
- Mailtrap

<h2 id="started">🚀 Iniciar o projeto</h2>

<h3>Requisitos</h3>

- NodeJS v-v20.16.0

<h3>Clonar o projeto</h3>

```bash
git clone https://github.com/Ivan-Leonardi/Login-OTP-One-Time-Password-.git
```

<h3>Config .env variáveis de ambiente</h2>

Substitua o arquivo `.env.example` pela suas credenciais no aquivo `.env`.

```yaml
PORT=""
DATABASE_URL=""
MAILTRAP_TOKEN=""
JWT_SECRET=""
```

<h3>Start</h3>

Para rodar o projeto

```bash
cd login-otp
npm install
npm run dev
```

<h2 id="routes">📍 Endpoints da API</h2>

Principais rotas
​
| rota              | descrição                                         
|----------------------|-----------------------------------------------------
| <kbd>POST /auth/signup</kbd>  | cadastrar um usuário
| <kbd>POST /auth/signin</kbd>  | autenticar um usuário
| <kbd>POST /auht/useotp</kbd>  | gerando o código otp
| <kbd>GET /private</kbd>  | acesso a rota privada  após autenticação do usuário


<h3>POST /users</h3>

**REQUEST**
```json
{
  "name": "Jhon Doe",
  "email": jhon@email.com,
  "password": "1a2b3c"
}
```

<h3>POST /auth/signup</h3>

**REQUEST**
```json
{
	"name": "John",
	"email": "john@email.com"
}
```

<h3>POST /auth/signin</h3>

**REQUEST**
```json
{
	"email": "john@email.com"
}
```

**RESPONSE**
```json
{
	"id": "3ba28928-c791-464b-b7f3-d1106069428c"
}
```

<h3>POST /auth/useotp</h3>

**REQUEST**
```json
{
	"id": "3ba28928-c791-464b-b7f3-d1106069428c",
	"code": "484136"
}
```

**RESPONSE**
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwNTUxNTIxfQ.m0Np68lqycnHQoev9oHQ3UJjN-P8tsKeelczHFxL1cE",
	"user": {
		"id": 1,
		"name": "John",
		"email": "john@email.com"
	}
}
```

<h3>POST /private</h3>

**RESPONSE**
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwNTUxNTIxfQ.m0Np68lqycnHQoev9oHQ3UJjN-P8tsKeelczHFxL1cE",
	"user": {
		"id": 1,
		"name": "John",
		"email": "john@email.com"
	}
}
```

{
	"user": {
		"id": 1,
		"name": "John",
		"email": "john@email.com"
	}
}

