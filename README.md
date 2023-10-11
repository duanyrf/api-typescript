## Web API com Typescript

### Criação do projeto

1. Criar a pasta do projeto: `mkdir api-typescript`

1. Entrar na pasta: `cd api-typescript`

1. Abrir VSCode no projeto: `code .`

1. Inicializar projeto Node: `npm init -y`. Isso gera o arquivo `package.json`

1. Criar pasta `src` na raiz do projeto

1. Criar arquivo `server.ts` dentro da pasta **src**

1. Alterar arquivo **package.json**:
  - trocar *"main": "index.js"* por *"main": "src/server.ts"*
  - editar script *test* para *"dev": "tsx watch src/server.js"*

### Instalação das bibliotecas de dependências

1. Instalar bibliotecas:
  - ExpressJS, CORS: `npm install express cors`
  - Typescript, @types/node, @types/express, tsx: `npm install typescript @types/node @types/express @types/cors tsx -D`

### Configuração inicial do Typescript

1. Inicializar configurações Typescript: `npx tsc --init`

### Adição dos endpoints GET e POST

1. Edite o arquivo **src/server.ts** e adicione o seguinte conteúdo:
```typescript
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/users', (req, res) => {
  return res.json({ message: 'Listagem de usuários' })
})

app.post('/users/new', (req, res) => {
  return res.json({ message: 'Usuário criado com sucesso' })
})

app.listen(3333, () => console.log('Server is running!'))
```

1. Edite o endpoint do tipo POST, no arquivo src/server.ts, e adicione o seguinte conteúdo ao corpo da função:
```typescript
app.post('/users/new', (req, res) => {
  const { name, email } = req.body

  console.log(name, email)

  return res.json({ message: 'Usuário criado com sucesso', user: { name, email } })
})
```

### Adição dos endpoints PUT e DELETE

> Até agora nossa Web API não é capaz de armazenar dados, pois não dispõe de nenhum serviço de BD.
>
> Instanciaremos uma lista de objetos temporários do tipo User para estarmos aptos a utilizar os endpoints do tipo PUT e DELETE.

1. Defina um tipo User e instancie uma lista de usuários vazia após a criação da variável *app*, que servirá como banco de dados temporário, conforme o exemplo a seguir:
```typescript
...
type User = {
  name: string
  email: string
}

const users: User[] = []
...
```

1. Adicione o endpoint PUT logo após o endpoint POST, com o seguinte código:
```typescript
app.put('/users/edit/:id', (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  console.log(id, name, email)

  return res.json({ message: 'Usuário atualizado com sucesso', user: { id, name, email } })
})
```