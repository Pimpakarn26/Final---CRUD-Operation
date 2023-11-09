import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetail = () => {
    const { id } = useParams();
    const [bookData, setBookData] = useState({});
    useEffect(() => {
        fetch("http://localhost:7000/books/" + id) // แก้ URL เป็น books
            .then((res) => res.json())
            .then((data) => {
                setBookData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <div className="container">
                    <div className="card row">
                        <div className="card-title">
                            <h2>Book Detail</h2>
                        </div>
                        {bookData.id && ( // เปลี่ยน stdData เป็น bookData.id
                            <div className="card-body">
                                <img src={bookData.image} alt="book" /> {/* เปลี่ยน bookData.photo เป็น bookData.image */}
                                <div className="card-text">
                                    <h3>
                                        {bookData.name} - ({bookData.id})
                                    </h3>
                                    <h4>Contact Details:</h4>
                                    <h5>Author: {bookData.author}</h5>
                                    <h5>Price: {bookData.price}</h5>
                                    <h5>Genre: {bookData.genre}</h5>
                                </div>
                                <Link className="btn btn-danger" to="/">
                                    Back to listing
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
