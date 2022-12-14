import React, { useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

import './styles.scss';

const SearchBox = ({ initialKeyword, handleSearch }) => {
    let location = useLocation();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(initialKeyword || '');

    const defaultSearch = (keyword) => {
        navigate({
            pathname: location.pathname,
            search: `?${createSearchParams({ search: keyword })}`
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (keyword) {
            if (handleSearch) handleSearch(keyword);
            else defaultSearch(keyword);
        } else {
            navigate({
                pathname: location.pathname
            });
        }
    }

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    return (
        <div className="search-box-container">
            <div className="search-box">
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={keyword}
                        onChange={handleChange}
                        placeholder="Buscar..."
                        aria-label="Ingresá lo que quieras buscar"
                    />
                    <button type="submit" aria-label="Buscar">
                        <i className="button-search"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchBox;
