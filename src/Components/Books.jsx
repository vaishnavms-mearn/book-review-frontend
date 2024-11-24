import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Filter from './Filter';
import { getAllBooksAPI } from '../Services/allAPI';
import { base_Url } from '../Services/base_Url';
import { Link } from 'react-router-dom';

function Books() {
    const [showFilter, setShowFilter] = useState(false);
    const [books, setBooks] = useState([]);
    const [filterParams, setFilterParams] = useState({
        searchKey: '',
        sortBy: 'title',
        order: 'asc',
        genre: '',
    });
console.log(filterParams);

    const token = sessionStorage.getItem("token");

    const reqHeader = token ? {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
    } : {};

    useEffect(() => {
        // Fetch books whenever filter parameters change
        const fetchBooks = async () => {
            try {
                const response = await getAllBooksAPI(
                    reqHeader,
                    filterParams.searchKey,
                    filterParams.genre,
                    filterParams.sortBy,
                    filterParams.order
                );
                setBooks(response.data?.books || []); // Safely set books
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [filterParams]); // Re-fetch books whenever the filterParams change

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
    };

    const handleApplyFilter = (filters) => {
        setFilterParams(filters); // Update filter parameters with the applied filters
    };

    return (
        <div className="container">
            <Row className="my-4">
                <Col md={12}>
                    <Button variant="primary" onClick={handleFilterClick}>
                        {showFilter ? "Hide Filters" : "Apply Filters"}
                    </Button>
                    <Link to="/my-books">
                        <Button variant="primary" className="mx-5">
                            My Books
                        </Button>
                    </Link>
                </Col>
            </Row>

            {showFilter && <Filter onApplyFilter={handleApplyFilter} />} {/* Pass filter handler to Filter component */}

            <Row className="my-4 mx-5">
                <Col md={12} style={{ width: '900px' }}>
                    <div className="list-group mt-5">
                        {books.length > 0 ? (
                            books.map((book, index) => (
                                <Link to={`/view-book/${book.id}`} style={{ textDecoration: 'none' }} key={index} className="list-group-item list-group-item-action d-flex align-items-center">
                                    <img
                                        src={book.coverUrl ? `${base_Url}/${book.coverUrl}` : 'default-image.jpg'}
                                        alt={book.title}
                                        className="img-thumbnail"
                                        style={{ width: '150px', height: '155px', marginRight: '15px' }}
                                    />
                                    <div>
                                        <h5 className="mb-1 text-black">{book.title}</h5>
                                        <p className="mb-1 text-black">{book.author}</p>
                                        <small className="mb-1 text-black">{book.genre}</small>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No books found matching the filter criteria.</p>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Books;
