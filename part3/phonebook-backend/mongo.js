const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];

const number = process.argv[4];


const url = `mongodb+srv://phonebook:${password}@cluster0.ohy9fks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', phoneBookSchema);

const person = new Person({
    name: name,
    number: number,
});
if (process.env.length > 3) {
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`);

        mongoose.connection.close();
    });
} else {
    Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
            mongoose.connection.close()
        })

    })
}