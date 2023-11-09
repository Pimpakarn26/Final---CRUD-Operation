import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BookList = () => {
    const [bookData, setbookData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:7000/books") // แก้ URL เป็น books
            .then((res) => res.json())
            .then((response) => {
                setbookData(response);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const loadEdit = (id) => {
        navigate("/book/edit/" + id);
    };

    const loadDetail = (id) => {
        navigate("/book/detail/" + id);
    };

    const removeBook = (id) => {
        if (window.confirm("Do you want to remove?")) {
            fetch("http://localhost:7000/books/" + id, {
                method: "DELETE"
            })
                .then((res) => {
                    if (res.ok) {
                        alert("Removed successfully");
                        window.location.reload();
                    } else {
                        throw new Error("Failed to remove the book");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Book List</h2>
                </div>
            </div>
            <div className="card-body">
                <div className="divbtn">
                    <Link to="/book/create" className="btn btn-success">
                        Add New (+)
                    </Link>
                </div>
                <table className="table table-bordered">
                    <thead className="bg-dark text-white">
                        <tr>
                            <td>Id</td>
                            <td>Author</td>
                            <td>Price</td>
                            <td>Genre</td>
                        </tr>
                    </thead>
                    <tbody>
                        {bookData &&
                            bookData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.author}</td>
                                    <td>{item.price}</td>
                                    <td>{item.genre}</td>
                                    <td>
                                        <a
                                            className="btn btn-success"
                                            onClick={() => {
                                                loadEdit(item.id);
                                            }}
                                        >
                                            Edit
                                        </a>
                                        <a
                                            className="btn btn-danger"
                                            onClick={() => {
                                                removeBook(item.id); // แก้ชื่อ function เป็น removeBook
                                            }}
                                        >
                                            Delete
                                        </a>
                                        <a
                                            className="btn btn-primary"
                                            onClick={() => {
                                                loadDetail(item.id);
                                            }}
                                        >
                                            Detail
                                        </a>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;
