import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/books', book)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("There was an error adding the book!", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" name="title" value={book.title} onChange={handleChange} required />
            </div>
            <div>
                <label>Author</label>
                <input type="text" name="author" value={book.author} onChange={handleChange} required />
            </div>
            <div>
                <label>Genre</label>
                <input type="text" name="genre" value={book.genre} onChange={handleChange} required />
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" value={book.description} onChange={handleChange} required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
