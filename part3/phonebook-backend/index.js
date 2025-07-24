require('dotenv').config()
const express = require('express');

const Person = require('./models/person')
const morgan = require('morgan');
// const cors = require('cors');

const app = express()
app.use(express.json());
app.use(express.static('dist'))
// app.use(cors());
morgan.token('post-data', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(person => {
            response.json(person)
        })
        .catch(error => {
            console.error('Error fetching persons:', error)
            response.status(500).json({ error: 'DB query failed' })
        })
})
app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for 2 people</p><br>
        <p>Sat Jan 22 2022 22:27:20 GMT+0200 (Eastern European Standard Time)</p>

        `)
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    response.json(person)
})
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== id);
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    // const randomId = Math.floor(Math.random() * 1000000000000);
    const body = request.body
    if (!body.name || !body.number) {

        return response.status(400).json({ error: 'content missing' })
    }

    // const nameExist = persons.find(person => person.name === newName);

    // if (!body.name || !body.number) {
    //     return response.status(400).json({
    //         error: 'something is  missing'

    //     })
    // }
    // if (nameExist) {
    //     return response.status(400).json({ error: 'Name already exist' })
    // }
    const person = new Person({

        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => {
        console.error('Error saving person:', error);
        response.status(500).json({ error: 'could not save to DB' });
    });
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})