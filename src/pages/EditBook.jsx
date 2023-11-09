import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const EditBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState({
        "id": "",
        "name": "",
        "author": "",
        "price": "",
        "genre": "",
        "image": "https://source.unsplash.com/random/200x200/?books"
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:7000/books/" + id) // แก้ URL เป็น books
            .then((res) => res.json())
            .then((data) => {
                setBook(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            id: book.id,
            name: book.name,
            author: book.author,
            price: book.price,
            genre: book.genre,
            image: book.image,
        };

        fetch("http://localhost:7000/books/" + id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(bookData),
        })
            .then((res) => {
                if (res.ok) {
                    alert("Save Successfully");
                    navigate("/");
                } else {
                    throw new Error("Failed to update the book");
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
                            <h2>Edit Book</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="id">id</label>
                                        <input
                                            type="text"
                                            disabled
                                            name="id"
                                            id="id"
                                            value={book.id}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
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
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="image">image</label>
                                        <input
                                            type="text"
                                            required
                                            name="image"
                                            id="image"
                                            value={book.image}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit">
                                            Save
                                        </button>
                                        <Link to="/" className="btn btn-danger">
                                            Back
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBook;

