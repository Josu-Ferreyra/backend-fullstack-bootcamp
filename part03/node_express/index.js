const express = require('express')
const app = express()
app.use(express.json()) // Json parser para poder acceder al BODY en el POST
let notes = [
  {
    content: 'El Maxi ultimamente está muy hincha pelotas',
    date: '2022-07-08T17:05:46.007Z',
    id: 1
  },
  {
    content: 'Estamos aprendiendo a crear REST API\'s',
    date: '2022-07-08T17:09:46.007Z',
    id: 2
  },
  {
    content: 'Boca Juniors hoy te vinimo\' a alentar',
    date: '2022-07-08T20:05:46.007Z',
    id: 3
  },
  {
    content: 'Messi es el mejor jugador de todos los tiempos temporales',
    date: '2022-07-08T23:15:46.007Z',
    id: 4
  }
]

app.get('/', (request, response) => {
  response.send('HELLO WORLD')
})
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0
  return maxId + 1
}
app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const note = {
    content: body.content,
    date: new Date().toISOString(),
    important: body.important || false,
    id: generateId()
  }
  notes = notes.concat(note)
  response.json(note)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
