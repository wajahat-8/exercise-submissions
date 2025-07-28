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
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end
            }
        })
        .catch(error => (next(error)))
})
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body;

    if (!name || !number) {
        return response.status(400).json({ error: 'name or number missing' });
    }

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number }
    )
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson);
            } else {
                response.status(404).end(); // If no person found
            }
        })
        .catch(error => next(error)); // For invalid IDs, etc.
});





app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end()
    }

    )
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
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})