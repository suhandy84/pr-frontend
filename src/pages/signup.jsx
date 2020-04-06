import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';
import { connect } from 'react-redux'
import { RegisterUser, errormessageclear } from './../redux/actions'
import { Redirect, Link } from 'react-router-dom'
import './signup.css'

const Register = (props) => {
    const [data, setdata] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const dataOnChange = (e) => {
        console.log(e.target)
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        props.RegisterUser(data)
    }

    console.log(props.islogin)
    if (props.islogin) {//supaya tidak bisa ke halaman register sesudah login
        return <Redirect to='/' />
    }

    return (
        <div className="signup-body">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                                {/* Background image for card set in CSS! */}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>
                                <form className="form-signin" onSubmit={onFormSubmit}>
                                    <div className="form-label-group">
                                        <input type="text" name='username' value={data.username} onChange={dataOnChange} id="inputUserame" className="form-control" placeholder="Username" required autoFocus/>
                                        <label for="inputUserame">Username</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="email" name="email" value={data.email} onChange={dataOnChange} id="inputEmail" className="form-control" placeholder="Email address" required />
                                        <label htmlFor="inputEmail">Email address</label>
                                    </div>
                                    <hr />
                                    <div className="form-label-group">
                                        <input type="password" name="password" value={data.password} onChange={dataOnChange} id="inputPassword" className="form-control" placeholder="Password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" name="confirmpassword" value={data.confirmpassword} onChange={dataOnChange} id="inputConfirmPassword" className="form-control" placeholder="Password" required />
                                        <label htmlFor="inputConfirmPassword">Confirm password</label>
                                    </div>
                                    {
                                        props.errormes ?
                                            <MDBAlert color='danger'>
                                                {props.errormes}
                                                <span className='float-right hovererr font-weight-bold' onClick={() => props.errormessageclear()}>x</span>
                                            </MDBAlert>
                                            :
                                            null
                                    }
                                    {
                                        props.successmes ?
                                            <MDBAlert color='success'>
                                                {props.successmes}
                                                <span className='float-right hovererr font-weight-bold'><Link to='/signin'>x</Link></span>
                                            </MDBAlert>
                                            :
                                            null
                                    }
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                                    {console.log(onFormSubmit)}
                                    {console.log(props.data)}
                                    <a className="d-block text-center mt-2 small"><Link to='/signin'>Sign In</Link></a>
                                    <hr className="my-4" />
                                    <button className="bg-google btn-lg btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2" /> Sign up with Google</button>
                                    <button className="bg-fb btn-block btn-lg text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2" /> Sign up with Facebook</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MapstatetoProps = (state) => {
    return state.Auth
}

export default connect(MapstatetoProps, { RegisterUser, errormessageclear })(Register);