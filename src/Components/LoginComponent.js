import React, {Component} from 'react';
import {Grid, Row, Col, FormControl, FormGroup, HelpBlock, Button, ControlLabel} from 'react-bootstrap'
import axios from "axios/index";

const loginContainer = {
    margin: '10px',
}

const rowMargin = {
    marginTop: '10px',
    marginBottom: '10px'
}

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            email:'',
            password:'',
            emailRule: '',
            passwordRule:'',
            emailValidation: null,
            passwordValidation: null,
            message: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }

    handleLogin(){
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

        if(this.state.email.length > 0 && this.state.password > 0) {
            if(this.state.emailValidation === null && this.state.passwordValidation === null){
                axios.get('http://192.168.1.25:1234/api/individual?email='+ this.state.email+'&password='+this.state.password).then((response) => {
                    if(response.status === 200){
                        this.setState({
                            message: 'Login Completed'
                        }, ()=>{})
                        setTimeout(()=>{
                            this.props.handleClose(response.data)
                            localStorage.setItem('loginInfo', JSON.stringify(response.data))
                        }, 3000)

                    } else{

                        this.setState({
                            message: response.data.message
                        },()=>{})
                    }
                }).catch(error => {
                    if(error.response.status = 401){
                        this.setState({
                            message: error.response.data.message
                        },()=>{})
                    }
                })
            }
        }
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

    validateForm(fieldName, value) {
        switch (fieldName) {
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
        }
    }

    render() {
        return (
            <form style={loginContainer}>
                <Row>
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
                            <FormControl id="formControlsPassword" label="Password" type="password"  onChange={this.handlePasswordChange}/>
                            <HelpBlock>{this.state.passwordRule}</HelpBlock>
                        </FormGroup>

                    </Col>
                    <Col xs={12} style={rowMargin}>
                        <Button bsStyle="success" block onClick={this.handleLogin}>Login</Button>
                    </Col>
                    <Col xs={12} style={rowMargin}>
                        <label style={{color: 'blue', textDecoration: 'none', cursor: 'pointer'}}
                               onClick={this.props.SwitchToSignUpForm}>Register</label>
                    </Col>
                    <ErrorMessageLabel message={this.state.message}/>
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
export default LoginComponent