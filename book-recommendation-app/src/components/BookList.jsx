import { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get('http://localhost:8080/api/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the books!", error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/books/remove/${id}`)
            .then(response => {
                fetchBooks();
            })
            .catch(error => {
                console.error("There was an error deleting the book!", error);
            });
    };

    const handleEdit = (book) => {
        setEditingBook(book);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/books/update/${editingBook.id}`, editingBook)
            .then(response => {
                fetchBooks();
                setEditingBook(null);
            })
            .catch(error => {
                console.error("There was an error updating the book!", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingBook({
            ...editingBook,
            [name]: value
        });
    };

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                        <button onClick={() => handleEdit(book)}>Update</button>
                    </li>
                ))}
            </ul>
            {editingBook && (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" value={editingBook.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Author</label>
                        <input type="text" name="author" value={editingBook.author} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Genre</label>
                        <input type="text" name="genre" value={editingBook.genre} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea name="description" value={editingBook.description} onChange={handleChange} required />
                    </div>
                    <button type="submit">Update Book</button>
                    <button onClick={() => setEditingBook(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default BookList;
