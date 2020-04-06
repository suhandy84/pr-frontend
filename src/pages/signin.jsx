import React, { useState } from "react";
import { MDBAlert} from 'mdbreact';
import { connect } from 'react-redux'
import { LoginUser, errormessageclear } from './../redux/actions'
import { Redirect} from 'react-router-dom'
import './signin.css'

const Login = (props) => {
    const [data, setdata] = useState({
        username: '',
        password: ''
    })

    const dataOnChange = (e) => {
        console.log(e.target)
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        props.LoginUser(data)
    }
    if (props.islogin) {
        return <Redirect to='/' />
    }

    return (
        <div className='signin-body'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form className="form-signin" onSubmit={onFormSubmit}>
                                    <div className="form-label-group">
                                        <input type="text" name='username' value={data.username} onChange={dataOnChange} id="inputUsername" className="form-control" placeholder="Email address" required autofocus />
                                        <label htmlFor="inputUsername">Email address</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" name='password' value={data.password} onChange={dataOnChange} id="inputPassword" className="form-control" placeholder="Password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                    </div>
                                    {
                                        props.errormes?
                                            <MDBAlert color='danger'>
                                                {props.errormes}
                                                <span className='float-right hovererr font-weight-bold' onClick={() => props.errormessageclear()}>x</span>
                                            </MDBAlert>
                                            :
                                            null
                                    }
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={props.loading}>Sign in</button>
                                    <hr className="my-4" />
                                    <button className="btn btn-danger btn-block text-uppercase mb-2" type="submit"><i className="fab fa-google mr-2" /> Sign in with Google</button>
                                    <button className="btn btn-primary btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2" /> Sign in with Facebook</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
                <form className='mt-5' style={{ width: '30%' }} onSubmit={onFormSubmit}>
                    <p className="h3 text-center mt-3">Sign in</p>
                    <div className="purple-text">
                        <MDBInput
                            label="Type your username"
                            name='username'
                            onChange={dataOnChange}
                            icon="user"
                            group type="text"
                            validate
                            error='dsada'
                            value={data.username}
                        />
                        <MDBInput label="Type your password" name='password' onChange={dataOnChange} icon="lock" group type="password" validate value={data.password} />
                    </div>
                    {
                        props.errormes?
                            <MDBAlert color='danger'>
                                {props.errormes}
                                <span className='float-right hovererr font-weight-bold' onClick={() => props.errormessageclear()}>x</span>
                            </MDBAlert>
                            :
                            null
                    }
                    <div className="text-center">
                        <MDBBtn type='submit' disabled={props.loading}>Login</MDBBtn>
                        <hr/>
                        <p>Belum ada akun?<br/><Link className='register' to='/register'>REGISTER</Link> dulu donk</p>
                    </div>
                </form>
            </div> */}
        </div>
    );
};

const MapstatetoProps = (state) => {
    return state.Auth
}

export default connect(MapstatetoProps, { LoginUser, errormessageclear })(Login);