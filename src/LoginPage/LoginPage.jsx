import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { userActions } from '../_actions';

function LoginPage() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(email, password, from));
            toast.info('Log in Successful');
        } else {
            toast.info('Log in Failed');
        }
    }

    return (
        <div className="col-md-8 offset-md-2">
            <div className="container mx-auto">
                <div className="row">
                    <div className="col-sm left">
                    <div className="card register-card mx-auto card-default align-item-center justify-content-center">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mx-auto">
                                <div className="p-2">
                                    <h3 className="card-title text-center justify-content-center align-item-center">Welcome Back!</h3>
                                    <small className="text-muted form-text align-item-center">Login & continue creating presentations.</small> 
                                </div>
                            </div>
                            <div className="container-sm">
                            <form noValidate onSubmit={handleSubmit}>
                                    <div>
                                        <div className="form-group ">
                                            <label >Email</label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                id="email"
                                                name="email"
                                                autoComplete="on"
                                                aria-describedby="emailHelp"
                                                placeholder=""
                                                value={email} 
                                                onChange={handleChange} 
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Password</label>
                                            <input 
                                            type="password" 
                                            className="form-control" 
                                            id="password"
                                            name="password"
                                            autoComplete="on"
                                            placeholder=""
                                            value={password} 
                                            onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <small className="text-muted form-text">
                                        Have no account? sign up <Link to="/register">here</Link>
                                    </small>
                                    <div className="d-flex justify-content-end">
                                        <div className="p-2">
                                            <button type="submit" id="signinButton" name="submit" value="Sign In" className="btn btn-warning text-white font-weight-bold">
                                            {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                LOGIN
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export { LoginPage };