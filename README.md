# book-store

API end points - 

Add a book.
POST - http://localhost:3000/api/books/
{
        "title": "Edited",
        "author": "Vinay",
        "summary": "This is my first edited book"
}

# get all books.
GET - http://localhost:3000/api/books/
{}

# get book by id.
GET - http://localhost:3000/api/books/:id

#update book - 
PUT - http://localhost:3000/api/books/:id
{
        "title": "Edited",
        "author": "Vinay",
        "summary": "This is my first edited book"
}

# delete book by id.
DELETE - http://localhost:3000/api/books/:id


SET UP - 
Install mongoDB -- 
add mongodb://localhost/bookstore - as DB.

Install node version 14 and above.

use command - npm start --- to start the service.










