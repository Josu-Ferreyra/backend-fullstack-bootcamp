const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]
// GETTERS
app.get('', (req, res) => { res.send('<h1>Info on "/api/persons"</h1>') })
app.get('/api/persons', (req, res) => { res.json(persons) })
app.get('/info', (req, res) => {
  const message = `
  <p>Phonebook has info for ${persons.length} people<p>
  <p>${new Date()}</p>
  `
  res.send(message)
})
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (!person) {
    return res.status(404).json({ error: 'Person not found' })
  }
  res.json(person)
})
// FIN GETTERS
// DELETES
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!persons.find(person => person.id === id)) {
    return res.status(404).json({ error: 'Person not found' })
  }
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})
// FIN DELETES
// POSTS
const genId = () => {
  const id = Math.ceil(Math.random() * (persons.length + 1) * 2)
  return id
}
app.use(express.json()) // IMPORTANTE PARA QUE EL req.body FUNCIONE
app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(422).json({ error: 'Name or Number Missing' })
  }
  let id = genId()
  while (persons.find(person => person.id === id)) {
    id = genId()
  }
  if (persons.find(person => person.name === body.name)) {
    return res.status(409).json({ error: `${body.name} already exist in the Phonebook` })
  }
  const newPerson = {
    id,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(newPerson)
  res.status(201).end()
})
// FIN POSTS
const PORT = 3001
app.listen(PORT, '', () => {
  console.log(`Server Running on port: ${PORT}`)
})
