//endpoints to implement:
// GET /books - Retrieve all books.
// GET /books/:id - Retrieve a specific book by its ID.
// POST /books - Create a new book.
// PUT /books/:id - Update an existing book by its ID.
// DELETE /books/:id - Delete a book by its ID. 

const express = require('express');
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' }
];

// GET /books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET /books/:id
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

// POST /books
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const id = books.length + 1;
  const newBook = { id, title, author };
  books.push(newBook);

  res.status(201).json(newBook);
});

// PUT /books/:id
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  let book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  book.title = title;
  book.author = author;

  res.json(book);
});

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.json(deletedBook);
});

// Test the API
app.listen(3000, () => {
  console.log('Server started on port 3000');

  // Simulate a GET request to /books
  app._router.handle({ method: 'GET', url: '/books' }, {}, () => {});
    

  // Simulate a GET request to /books/:id
  const bookId = 1;
  app._router.handle({ method: 'GET', url: `/books/${bookId}` }, {}, () => {});
  

  // Simulate a POST request to /books
  app._router.handle({ method: 'POST', url: '/books', body: { title: 'New Book', author: 'New Author' } }, {}, () => {});

  // Simulate a PUT request to /books/:id
  app._router.handle({ method: 'PUT', url: `/books/${bookId}`, body: { title: 'Updated Book', author: 'Updated Author' } }, {}, () => {});

  // Simulate a DELETE request to /books/:id
  app._router.handle({ method: 'DELETE', url: `/books/${bookId}` }, {}, () => {});
});