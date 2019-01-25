import React, {Component} from 'react';
import {Grid, Row, Col, FormControl, FormGroup, HelpBlock, ControlLabel, Modal, Button} from 'react-bootstrap'
import axios from 'axios'
import ListItem from '../Components/ListItemView'
class MyMoviesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            movieData:{
                Title:'',
                Type: '',
                Year:'',
                Rated: '',
                Released: '',
                Runtime: '',
                Genre: '',
                Director: '',
                Writers: '',
                Actors: '',
                Plot: '',
                Language: '',
                Country: '',
                Awards: '',
                Poster: '',
                Metascore: '',
                imdbRating: '',
                Images: '',
                User: ''
            },
            movieList: []
        }
        let user = JSON.parse(localStorage.getItem('loginInfo'))
        axios.get('http://192.168.1.25:1234/api/movie/user?user='+user.email).then((response) => {
            this.setState({
                movieList: [...response.data]
            })
        })
    }

    handleShow = (e) => {
        this.setState({
            show: true
        })
    }

    handleClose = (e) => {
        this.setState({
            show: false
        })
    }

    addMovie = (e) =>{
        let movieData = this.state.movieData
        if( localStorage.getItem('loginInfo') !== null){
            movieData.User = JSON.parse(localStorage.getItem('loginInfo')).email
        }
        this.setState({movieData},()=>{})
        axios.post('http://192.168.1.25:1234/api/movie/create', this.state.movieData).then((response) => {
            this.setState({
                movieList: [...this.state.movieList, response.data.movie]
            })
        })
    }

    handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        let movieData = this.state.movieData
        if(name== 'images'){
            movieData[name].push(value)
        } else {
            movieData[name] = value
        }
        this.setState({movieData})
    }
    handleEdit = (movie)=>{
        console.log(movie)
        this.setState({
            movieData:{
                Title: movie.Title,
                Type:  movie.Type,
                Year: movie.Year,
                Rated: movie.Rated,
                Released: movie.Released,
                Runtime: movie.Runtime,
                Genre: movie.Genre,
                Director: movie.Director,
                Writers: movie.Writers,
                Actors: movie.Actors,
                Plot: movie.Plot,
                Language: movie.Language,
                Country: movie.Country,
                Awards: movie.Awards,
                Poster: movie.Poster,
                Metascore: movie.Metascore,
                imdbRating: movie.imdbRating,
                Images: movie.Images,
                User: movie.User
            },
            show: true
        },()=>{
        })
    }

    render() {
        return (
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Add Movie
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action="">
                            <Row className="show-grid">
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Title</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Title' value={this.state.movieData.Title} ></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Type</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} value={this.state.movieData.Type.toLowerCase()} name='Type'>
                                            <option value="">Select</option>
                                            <option value="movie">Movie</option>
                                            <option value="series">Series</option>
                                            <option value="documentary">Documentary</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Year</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Year' value={this.state.movieData.Year}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Rated</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Rated' value={this.state.movieData.Rated}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Released Date</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Released' value={this.state.movieData.Released}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Runtime</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Runtime' value={this.state.movieData.Runtime}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Genre</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Genre' value={this.state.movieData.Genre}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Director</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Director' value={this.state.movieData.Director}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Writer</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Writers' value={this.state.movieData.Writers}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Actors</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Actors' value={this.state.movieData.Actors}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Plot</ControlLabel>
                                        <FormControl componentClass="textarea" onChange={this.handleChange} name='Plot' value={this.state.movieData.Plot}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Language</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Language' value={this.state.movieData.Language}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Country</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Country' value={this.state.movieData.Country}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Awards</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Awards' value={this.state.movieData.Awards}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Poster</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Poster' value={this.state.movieData.Poster}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Metascore</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Metascore' value={this.state.movieData.Metascore}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>IMDB Rating</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='imdbRating' value={this.state.movieData.imdbRating}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12}>
                                    <FormGroup>
                                        <ControlLabel>Images</ControlLabel>
                                        <FormControl type="text" onChange={this.handleChange} name='Images' value={this.state.movieData.Images[0] ? this.state.movieData.Images[0] : ""}></FormControl>
                                        <FormControl type="text" onChange={this.handleChange} name='Images' value={this.state.movieData.Images[1]}></FormControl>
                                        <FormControl type="text" onChange={this.handleChange} name='Images' value={this.state.movieData.Images[2]}></FormControl>
                                        <FormControl type="text" onChange={this.handleChange} name='Images' value={this.state.movieData.Images[3]}></FormControl>
                                        <FormControl type="text" onChange={this.handleChange} name='Images' value={this.state.movieData.Images[4]}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} >
                                    <Button bsStyle="primary" block onClick={this.addMovie}>Submit</Button>
                                </Col>
                            </Row>
                        </form>
                    </Modal.Body>
                </Modal>

                <ListItem movieList={this.state.movieList} handleEdit={(movie)=>{this.handleEdit(movie)}} myMovie={true} ></ListItem>
            </div>
        )
    }
}

export default MyMoviesComponent;