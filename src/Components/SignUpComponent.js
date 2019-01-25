import React, {Component} from 'react';
import {Grid, Row, Col, FormControl, FormGroup, HelpBlock, Button, ControlLabel} from 'react-bootstrap'
import axios from "axios/index";

const loginContainer = {
    margin: '10px',
}

class SignUpComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            nameRule: '',
            emailRule: '',
            passwordRule: '',
            confirmPasswordRule: '',
            message: '',
            nameValidation: null,
            emailValidation: null,
            passwordValidation: null,
            confirmPasswordValidation: null
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }

    handleNameChange(e) {
        e.preventDefault();
        let value = e.target.value
        this.setState({name: e.target.value}, () => {
            this.validateForm('name', value)
        })
    }

    handleEmailChange(e) {
        let value = e.target.value
        this.setState({email: e.target.value},() => {
            this.validateForm('email', value)
        })
    }

    handlePasswordChange(e) {
        let value = e.target.value
        this.setState({password: e.target.value}, () => {
            this.validateForm('password', value)
        })
    }

    handleConfirmPasswordChange(e) {
        let value = e.target.value
        this.setState({confirmPassword: e.target.value},() => {
            this.validateForm('confirm password', value)
        })
    }

    validateForm(fieldName, value) {
        switch (fieldName) {
            case 'name':
                if (value.length === 0) {
                    this.setState({
                        nameRule: 'Name is required',
                        nameValidation: 'error'
                    })
                } else {
                    this.setState({
                        nameRule: '',
                        nameValidation: null
                    })
                }
                break;

            case 'email':
                if (value.length === 0) {
                    this.setState({
                        emailRule: 'Email is required',
                        emailValidation: 'error'
                    })
                } else {
                    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                        this.setState({
                            emailRule: 'Email is not valid',
                            emailValidation: 'error'
                        })
                    } else {
                        this.setState({
                            emailRule: '',
                            emailValidation: null
                        })
                    }
                }
                break;

            case 'password':
                if (value.length === 0) {
                    this.setState({
                        passwordRule: 'Password is required',
                        passwordValidation: 'error'
                    })
                } else {
                    this.setState({
                        passwordRule: '',
                        passwordValidation: null
                    })
                }
                break;

            case 'confirm password':
                if (value.length === 0) {
                    this.setState({
                        confirmPasswordRule: 'Password is required',
                        confirmPasswordValidation: 'error'
                    })
                } else {
                    if (this.state.password != value) {
                        this.setState({
                            confirmPasswordRule: "Password doesn't match",
                            confirmPasswordValidation: 'error'
                        })
                    } else {
                        this.setState({
                            confirmPasswordRule: '',
                            confirmPasswordValidation: null
                        })
                    }
                }
                break;
            default:
                break;
        }
    }

    handleSignUp() {

        if (this.state.name.length === 0) {
            this.setState({
                nameRule: 'Name is required',
                nameValidation: 'error'
            })
        } else {
            this.setState({
                nameRule: '',
                nameValidation: null
            })
        }
        if (this.state.email.length === 0) {
            this.setState({
                emailRule: 'Email is required',
                emailValidation: 'error'
            })
        } else {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
                this.setState({
                    emailRule: 'Email is not valid',
                    emailValidation: 'error'
                })
            } else {
                this.setState({
                    emailRule: '',
                    emailValidation: null
                })
            }
        }
        if (this.state.password.length === 0) {
            this.setState({
                passwordRule: 'Password is required',
                passwordValidation: 'error'
            })
        } else {
            this.setState({
                passwordRule: '',
                passwordValidation: null
            })
        }

        if (this.state.confirmPassword.length === 0) {
            this.setState({
                confirmPasswordRule: 'Password is required',
                confirmPasswordValidation: 'error'
            })
        } else {
            if (this.state.password != this.state.confirmPassword) {
                this.setState({
                    confirmPasswordRule: "Password doesn't match",
                    confirmPasswordValidation: 'error'
                })
            } else {
                this.setState({
                    confirmPasswordRule: '',
                    confirmPasswordValidation: null
                })
            }
        }


        if(this.state.name.length > 0&& this.state.email.length > 0 && this.state.password > 0) {
            if(this.state.nameValidation === null && this.state.emailValidation === null && this.state.passwordValidation === null && this.state.confirmPasswordValidation === null){
                let user = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                }
                axios.post('http://192.168.1.25:1234/api/create', user).then( (response) => {
                    if(response.status === 200){
                        this.setState({
                            message: 'Registration Completed'
                        })
                        setTimeout(()=>{
                            this.props.signUp()
                        }, 3000)

                    } else{
                        this.setState({
                            message: 'Error'
                        })
                    }
                })
            }
        }
    }

    render() {
        return (
            <form style={loginContainer}>
                <Row>
                    <Col xs={12} style={rowMargin}>
                        <FormGroup validationState={this.state.nameValidation}>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                id="formControlsName"
                                type="text"
                                label="Name"
                                placeholder="Name"
                                onChange={(event) => this.handleNameChange(event)}
                            >
                            </FormControl>
                            <HelpBlock>{this.state.nameRule}</HelpBlock>
                        </FormGroup>
                    </Col>
                    <Col xs={12} style={rowMargin}>
                        <FormGroup validationState={this.state.emailValidation}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                id="formControlsEmail"
                                type="email"
                                label="Email Address"
                                placeholder="Enter Email"
                                onChange={this.handleEmailChange}
                            />
                            <HelpBlock>{this.state.emailRule}</HelpBlock>
                        </FormGroup>
                    </Col>
                    <Col xs={12} style={rowMargin}>
                        <FormGroup validationState={this.state.passwordValidation}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl id="formControlsPassword" label="Password" type="password"
                                         onChange={this.handlePasswordChange}/>
                            <HelpBlock>{this.state.passwordRule}</HelpBlock>
                        </FormGroup>


                    </Col>
                    <Col xs={12} style={rowMargin}>
                        <FormGroup validationState={this.state.confirmPasswordValidation}>
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl id="formControlsPassword" label="Confirm Password" type="password"
                                         onChange={this.handleConfirmPasswordChange}/>
                            <HelpBlock>{this.state.confirmPasswordRule}</HelpBlock>
                        </FormGroup>
                    </Col>

                    <Col xs={12} style={rowMargin}>
                        <Button bsStyle="success" block onClick={this.handleSignUp}>Sign Up</Button>
                    </Col>
                    <ErrorMessageLabel message={this.state.message} />
                    <Col xs={12} style={rowMargin}>
                        <label htmlFor="">Already have account? <span onClick={this.props.signUp} style={{cursor: 'pointer', color: 'red'}}>Log In</span></label>
                    </Col>
                </Row>
            </form>
        )
    }

}
const ErrorMessageLabel = function (props) {
    if(props.message != "") {
        return <Col xs={12} style={rowMargin}>
            <label htmlFor="">{props.message}</label>
        </Col>
    }else{
        return ""
    }
}

const rowMargin = {
    marginTop: '10px',
    marginBottom: '10px'
}

export default SignUpComponent