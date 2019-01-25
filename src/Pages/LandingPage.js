import React, {Component} from 'react';
import {
    Grid,
    Row,
    Col,
    FormControl,
    FormGroup,
    ListGroup,
    ListGroupItem,
    Image,
    Button,
    MenuItem,
    Modal,
    ModalBody,
    DropdownButton
} from 'react-bootstrap'
import ListItem from '../Components/ListItemView'
import MyMoviesComponent from '../Components/MyMoviesComponent'
import SearchComponent from '../Components/SearchComponent'
import LoginComponent from '../Components/LoginComponent'
import SignUpComponent from "../Components/SignUpComponent";
import axios from 'axios'

const container = {
    paddingTop: '10px'
}

const imageSize = {
    height: '300px'
}

const castImage = {
    height: '60px',
    width: '55px'
}

// const ZSlideWrapper = {
//     margin: "0",
//     padding: "0",
//     perspective: "400px",
//     // overflow: "hidden",
//     background: "#252825",
//     position: "fixed",
//     top: "50px",
//     left: "118px",
//     bottom: "99.99%", /* Should be `0` but Safari needs this! (BUG #1) */
//     right: "0"
//
// }

class LandingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movieList: [],
            searchValue: '',
            searchResult: true,
            willSignUp: false,
            show: false,
            userData: JSON.parse(localStorage.getItem('loginInfo')),
            showMyMovies: false
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleMovieSelect = this.handleMovieSelect.bind(this)
        this.handleHome = this.handleHome.bind(this)
        this.SwitchToSignUpForm = this.SwitchToSignUpForm.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.signUp = this.signUp.bind(this)
        this.logOut = this.logOut.bind(this)

        axios.get('http://192.168.1.25:1234/api/movie/all').then((response) => {
            this.setState({
                movieList: response.data
            })
        })
    }

    handleSearch(e) {
        if(e.target.value != "") {
            this.setState({searchValue: e.target.value})
        } else {
            this.setState({searchValue: e.target.value})
            axios.get('http://192.168.1.25:1234/api/movie/all').then((response) => {
                this.setState({
                    movieList: response.data
                })
            })
        }
    }

    handleKeyPress(target) {
        if (target.charCode == 13) {
            axios.get('http://192.168.1.25:1234/api/movie?title=' + this.state.searchValue).then((response) => {
                if(response.status != 200) {
                    this.setState({
                        movieList: [response.data]
                    }, () => {
                    })
                } else{
                    this.setState({
                        movieList: []
                    }, () => {
                    })
                }
            })
        }

    }

    handleMovieSelect() {
        this.setState({showMyMovies: true})
    }

    handleHome() {
        this.setState({showMyMovies: false})
    }

    SwitchToSignUpForm() {
        this.setState({willSignUp: true})
    }

    handleShow() {
        this.setState({show: true});
    }

    handleClose(data) {
        this.setState({
            show: false,
            userData: {
                name: data.name,
                id: data.id
            }
        });
    }

    close = () =>{
        this.setState({
            show: false
        });
    }

    signUp() {
        this.setState({willSignUp: false});
    }

    logOut() {
        localStorage.clear()
        this.forceUpdate()
        this.setState({
            userData: null,
            showMyMovies: false
        },()=>{})
    }

    render() {
        let isLoggedIn = ''

        if (this.state.userData != null) {
            isLoggedIn = <DropdownButton bsStyle={'info'} title={this.state.userData.name} pullRight  id={`dropdown-basic-1`}>
                <MenuItem eventKey="1" onClick={this.handleHome}>Home</MenuItem>
                <MenuItem eventKey="2" onClick={this.handleMovieSelect}>My Movie List</MenuItem>
                <MenuItem eventKey="3" onClick={this.logOut}>Logout</MenuItem>
            </DropdownButton>
        } else {
            isLoggedIn = <Button bsStyle={'info'} onClick={this.handleShow}>
                Login
            </Button>
        }


        return (
            <div>
                <Grid style={container}>
                    <Row className="show-grid">
                        <Col xs={6} style={{padding: '0px'}}>
                            <SearchComponent searchValue={this.state.searchValue} handleSearch={this.handleSearch}
                                             handleKeyPress={this.handleKeyPress}/>
                        </Col>
                        <Col xs={1} xsOffset={5}>
                            {isLoggedIn}
                            <Modal show={this.state.show} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Welcome</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <SwitchBetweenLoginAndSignUp signUp={this.signUp} willSignUp={this.state.willSignUp}
                                                                 handleClose={this.handleClose}
                                                                 SwitchToSignUpForm={this.SwitchToSignUpForm}></SwitchBetweenLoginAndSignUp>
                                </Modal.Body>
                            </Modal>

                        </Col>
                    </Row>
                </Grid>
                <Grid style={container}>
                    <Row>
                        <Col>
                            <SwitchBetweenListAndResult showMyMovies={this.state.showMyMovies}
                                                        movieList={this.state.movieList}
                                                        handleMovieSelect={this.handleMovieSelect}></SwitchBetweenListAndResult>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function SwitchBetweenLoginAndSignUp(props) {
    if (props.willSignUp) {
        return <SignUpComponent signUp={props.signUp}></SignUpComponent>
    } else {
        return <LoginComponent style={{width: '300px'}} GoToLogin={props.GoToLogin}
                               SwitchToSignUpForm={props.SwitchToSignUpForm}
                               handleClose={props.handleClose}></LoginComponent>
    }
}

function SwitchBetweenListAndResult(props) {
    const showMyMovies = props.showMyMovies
    if(showMyMovies) {
        return  <MyMoviesComponent />
    } else {
        return <ListItem handleSearch={props.handleMovieSelect} movieList={props.movieList} ></ListItem>
    }
}

export default LandingPage;
