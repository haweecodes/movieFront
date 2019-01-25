import React, {Component} from 'react';
import {Grid, Row, Col, FormControl, FormGroup, ListGroup, ListGroupItem, Image, Jumbotron} from 'react-bootstrap'

const SearchComponent = (props) => {
    return <div>
        <FormControl
            type="text"
            value={props.searchValue}
            placeholder="Search for your show"
            onChange={props.handleSearch}
            onKeyPress={props.handleKeyPress}
        >
        </FormControl>
    </div>
}

export default SearchComponent