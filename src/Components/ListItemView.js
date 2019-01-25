import React, {Component} from 'react';
import {Grid, Row, Col, Button, Badge, ListGroup, ListGroupItem, Image, Glyphicon} from 'react-bootstrap'

const container = {
    marginTop: '10px'
}

const imageSize = {
    height: '300px'
}

const castImage = {
    height: '60px',
    width: '55px'
}

const listItem = {
    margin: "10px"
}

const ItemView = (props) => {
    let list = ""
    if (props.movieList.length > 0) {
        list = props.movieList.map((movie, i) => {
                return <ListGroupItem style={listItem} key={i}>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={3}>
                                <Image rounded style={imageSize}
                                       src={movie.Poster}
                                />
                            </Col>
                            <Col xs={12} md={9}>
                                <Row>
                                    <Col xs={10}>
                                        <h1 style={{marginTop: '0px'}}><a style={{
                                            textDecoration: 'none',
                                            cursor: 'pointer'
                                        }}>{movie.Title.toLocaleUpperCase()}</a><Badge>{movie.Type}</Badge>
                                        </h1>
                                    </Col>
                                    {(
                                        props.myMovie === true ? (
                                                <Col xs={2}>
                                                    <Button onClick={(e) => {
                                                        props.handleEdit(movie)
                                                    }}>
                                                        <Glyphicon glyph="glyphicon glyphicon-edit"></Glyphicon>
                                                    </Button>
                                                </Col>
                                            ) :
                                            (
                                                <Col xs={2}>
                                                </Col>
                                            )
                                    )}


                                    <Col xs={12}>
                                        <p>{movie.Released}, {movie.Genre}, {movie.Runtime}</p>
                                    </Col>
                                    <Col xs={12}>
                                        <p><strong>Directed By: </strong>{movie.Director}</p>
                                    </Col>
                                    <Col xs={12}>
                                        <p><strong>IMDB Rating: </strong>{movie.imdbRating}</p>
                                    </Col>
                                    <Col xs={12}>
                                        <p>{movie.Plot}</p>
                                    </Col>
                                    <Col xs={12}>
                                        <p><strong>Casts: </strong> {movie.Actors}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </ListGroupItem>
            }
        )
    } else {
        list = <ListGroupItem style={listItem}>
            <Grid>
                <Row>
                    <Col xs={12}><p>Movie not found</p></Col>
                </Row>
            </Grid>
        </ListGroupItem>
    }
    return <div>
        <Row>
            <Col>
                <ListGroup>
                    {list}
                </ListGroup>


            </Col>
        </Row>
    </div>;
}

export default ItemView;