import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddBook = () => {
    const [book, setBook] = useState({
        name: "",
        author: "",
        price: "",
        genre: "",
        image: "https://source.unsplash.com/random/200x200/?books"
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            name: book.name,
            author: book.author,
            price: parseFloat(book.price), // Convert to a number
            genre: book.genre,
            image: book.image,
        };

        // Replace the URL with the correct API endpoint
        fetch("http://localhost:7000/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData)
        })
            .then((res) => {
                if (res.ok) {
                    alert("Book saved successfully");
                    navigate("/");
                } else {
                    throw new Error("Failed to save the book");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-title">
                            <h2>Add new book</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            required
                                            name="name"
                                            id="name"
                                            value={book.name}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="author">Author</label>
                                        <input
                                            type="text"
                                            required
                                            name="author"
                                            id="author"
                                            value={book.author}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            type="number"
                                            required
                                            name="price"
                                            id="price"
                                            value={book.price}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="genre">Genre</label>
                                        <input
                                            type="text"
                                            required
                                            name="genre"
                                            id="genre"
                                            value={book.genre}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-success">
                                Save Book
                            </button>
                            <Link to="/" className="btn btn-danger">
                                Back
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
