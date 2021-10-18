import React from 'react';
import '../styles/searchBox.scss';
import FormControl from 'react-bootstrap/FormControl';
import { BsSearch } from 'react-icons/bs';

function SearchBox() {
  return (
    <div className="search-box">
      <div className="sch-form">
        <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
      </div>
      <div className="sch-btn">
        <BsSearch />
      </div>
    </div>
  );
}

export default SearchBox;
