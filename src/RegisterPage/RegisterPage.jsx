import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.email && user.password) {
            dispatch(userActions.register(user));
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
                                    <h3 className="card-title text-center justify-content-center align-item-center">Register</h3>
                                    <small className="text-muted form-text align-item-center">signup & create beautiful presentations.</small> 
                                </div>
                            </div>
                            <div className="container-sm">
                            <form name="form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                                    {submitted && !user.firstName &&
                                        <div className="invalid-feedback">First Name is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                                    {submitted && !user.lastName &&
                                        <div className="invalid-feedback">Last Name is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                                    {submitted && !user.email &&
                                        <div className="invalid-feedback">Email is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                                    {submitted && !user.password &&
                                        <div className="invalid-feedback">Password is required</div>
                                    }
                                </div>
                                <small className="text-muted form-text">
                                    Have an account? sign in <Link to="/login">here</Link>
                                </small>
                                <div className="d-flex justify-content-end">
                                    <div className="p-2">
                                        <button type="submit" id="signinButton" name="submit" value="Sign In" className="btn btn-warning text-white font-weight-bold">
                                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            SIGN UP
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
    </div>
        
    );
}

export { RegisterPage };