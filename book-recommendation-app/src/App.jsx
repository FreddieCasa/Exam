
import BookList from './components/BookList';
import AddBook from './components/AddBook';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Book Recommendation App</h1>
            </header>
            <AddBook />
            <BookList />
        </div>
    );
}

export default App;
