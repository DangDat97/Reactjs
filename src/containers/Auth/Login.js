import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    handlenOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handlenOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = () =>{
        console.log('username:' + this.state.username, 'password:' + this.state.password)
        console.log('all sate:' + this.state)
    }

    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>User Name:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your username'
                            value={this.state.username}
                            onChange={(event) => this.handlenOnChangeUsername(event)}
                            ></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(event) => this.handlenOnChangePassword(event)}
                                ></input>
                                <span onClick={() => {
                                    this.handleShowHidePassword()
                                }}>
                                 <i class={this.state.isShowPassword ? 'far fa-eye-slash' : 'fas fa-eye'}></i>
                                </span>
                                
                            </div>
                            
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={()=>{this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className=''>Or Login With</span>
                        </div>
                        <div className='col-12 social-login text-center'>
                            <i className="fab fa-google-plus-g gg"></i>
                            <i className="fab fa-facebook-f fb"></i>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
