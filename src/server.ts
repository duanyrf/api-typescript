import express from 'express'
import cors from 'cors'
import { type } from 'os'

const app = express()

type User = {
  id: number
  name: string
  email: string
}

const users: User[] = []

app.use(cors())
app.use(express.json())

app.get('/users', (req, res) => {
  return res.json(users)
})

app.post('/users/new', (req, res) => {
  const newUser: User = req.body

  newUser.id = users.length + 1

  users.push(newUser)
  console.log(users)

  return res.json({ message: 'Usuário criado com sucesso', user: newUser })
})

app.put('/users/edit/:id', (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  const user = users.find(user => user.id === Number(id))

  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })

  user.name = name
  user.email = email

  return res.json({ message: 'Usuário atualizado com sucesso', user: { id, name, email } })
})

app.delete('/users/delete/:id', (req, res) => {
  const { id } = req.params

  const user = users.find(user => user.id === Number(id))

  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })

  users.splice(users.indexOf(user), 1)

  return res.status(204).send()
})

app.listen(3333, () => console.log('Server is running!'))