package com.example.bookrecommendation.service;

import com.example.bookrecommendation.model.Book;
import com.example.bookrecommendation.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findByGenre(genre);
    }

    public void removeBookById(Long id) {
      bookRepository.deleteById(id);
    }

    public void updateBookById(Long id, Book newBookData) {
      Optional<Book> oldBookData = bookRepository.findById(id);
      Book updatedBookData = oldBookData.get();
      updatedBookData.setTitle(newBookData.getTitle());
      updatedBookData.setAuthor(newBookData.getAuthor());
      updatedBookData.setGenre(newBookData.getGenre());
      updatedBookData.setDescription(newBookData.getDescription());

      bookRepository.save(updatedBookData);
    }
}
