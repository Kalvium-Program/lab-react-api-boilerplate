// BookDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetails = () => {
    const [bookData, setBookData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data when the component mounts
        axios.get("https://reactnd-books-api.udacity.com/books", { headers: { 'Authorization': 'theoriginals' } })
            .then(response => {
                setBookData(response.data.books); // Assuming you want details of the first book
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    setError("Error: 404 Not Found");
                } else {
                    setError("An error occurred while fetching data");
                }
                console.error(err);
            });
    }, []); // Empty dependency array to run the effect only once

    if (error) {
        return <div>{error}</div>;
    }

    if (!bookData) {
        return <div>Loading...</div>;
    }

    return (
        <>

            {bookData && bookData.map(ele => <div className="book-card">
                <div className='child_one'>
                    <h3>{ele.title}</h3>
                    <img src={ele.imageLinks.thumbnail} alt="Book Cover" />
                    <p>Authors: {ele.authors.join(', ')}</p>
                </div>
                <div className='child_two'>
                    <p>{ele.description}</p>
                </div>
            </div>)}

        </>
    );

};

export default BookDetails;
