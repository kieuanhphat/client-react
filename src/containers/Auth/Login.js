import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: '',
            isShowPassword: false,
        }
    }
    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let dataLogin = await handleLoginApi(this.state.username, this.state.password);
            if (dataLogin && dataLogin.errCode !== 0) {
                this.setState({
                    errMessage: dataLogin.mess
                })
            }
            if (dataLogin && dataLogin.errCode === 0) {
                this.props.userLoginSuccess(dataLogin.userInfo)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.mess
                    })
                }
            }
        }
    }

    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>User Name:</label>
                            <input
                                type='text' className='form-control'
                                placeholder='Enter your User Name'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUserName(event)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-pass'>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your Password'
                                    value={this.state.password}
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                />
                                <span onClick={() => { this.handleShowHidePass() }}>
                                    <i class={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 text-error-login' >
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password!</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='login-with'>Or Login With</span>
                            <div className='col-12 social-login mt-3'>
                                <i class="fab fa-google-plus-g icon-google"></i>
                                <i class="fab fa-twitter icon-twitter"></i>
                                <i class="fab fa-facebook-square icon-facebook"></i>
                            </div>
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
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
