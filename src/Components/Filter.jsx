import React, { useState } from 'react';

function Filter({ onApplyFilter }) {
    const [filters, setFilters] = useState({
        searchKey: '',
        genre: '',
        sortBy: 'title',
        order: 'asc',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onApplyFilter(filters); // Pass the filters to parent component
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="searchKey"
                value={filters.searchKey}
                onChange={handleInputChange}
                placeholder="Search by title"
            />
            <select name="genre" value={filters.genre} onChange={handleInputChange}>
                <option value="">All Genres</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Horror</option>
                <option value="mystery">Mystery</option>
                <option value="fantasy">Fantasy</option>
                {/* Add other genres here */}
            </select>
            <button type="submit">Apply Filters</button>
        </form>
    );
}

export default Filter;
