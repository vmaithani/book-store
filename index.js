const express = require('express');
const bodyParser = require('body-parser');
const Book = require('./models/book');

const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a new book
app.post('/api/books', (req, res) => {
    const { title, author, summary } = req.body;
    const book = new Book({ title, author, summary });

    book.save()
        .then(savedBook => {
            res.status(201).json(savedBook);
        })
        .catch(err => {
            res.status(500).send('Error saving book');
        });
});

// Get a list of all books
app.get('/api/books', (req, res) => {
    Book.find({})
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            res.status(500).send('Error fetching books');
        });
});

// Get details of a specific book by its ID
app.get('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    Book.findById(bookId)
        .then(book => {
            if (!book) {
                res.status(404).send('Book not found');
            } else {
                res.json(book);
            }
        })
        .catch(err => {
            res.status(500).send('Error fetching book');
        });
});

// Update a book's details
app.put('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, author, summary } = req.body;

    Book.findByIdAndUpdate(bookId, { title, author, summary }, { new: true })
        .then(book => {
            if (!book) {
                res.status(404).send('Book not found');
            } else {
                res.json(book);
            }
        })
        .catch(err => {
            res.status(500).send('Error updating book');
        });
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
    const bookId = req.params.id;

    Book.findByIdAndRemove(bookId)
        .then(book => {
            if (!book) {
                res.status(404).send('Book not found');
            } else {
                res.json(book);
            }
        })
        .catch(err => {
            console.log(err , "eror")
            res.status(500).send('Error deleting book - Argument passed in must be a string of 12 bytes ');
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
