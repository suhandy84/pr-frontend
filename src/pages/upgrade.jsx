import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import Axios from 'axios';
import { API_URL } from '../supports/ApiUrl'
import { Table } from 'reactstrap'
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import { Redirect } from 'react-router-dom';
import { changetoRupiah } from '../supports/changeToRp'
import { TotalQty } from '../redux/actions'
import Pricing from '../component/pricing';

class Upgrade extends Component {
    state = {
        userdata: [],
        totalqty: 0,
        totalharga: 0,
        statuscart: [],
        isbayar:false
    }

    componentDidMount() {
        Axios.get(`${API_URL}/users/${this.props.User.id}`)
        .then (res=>{
            console.log(res.data)
            this.setState({userdata:res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    bayarconfirm = () => {
        Swal.fire({
            title: `Are you sure wanna upgrade?`,
            text: "Ga ada refund loh!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No, lagi bokek',
        }).then((result) => {
            if (result.value) {
                var userdata = this.state.userdata
                var objupdate = {
                    usertype: 'premium',
                    id: userdata.id
                }
                Axios.patch(`${API_URL}/users/${objupdate.id}`, objupdate)
                    .then((res) => {
                        Swal.fire(
                            'Upgrade!',
                            'Your account has been upgraded.',
                            'success'
                        ).then((result) => {
                            if (result.value) {
                                setTimeout(function () { window.location.href="http://localhost:3000" }, 500)
                            }
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
    }

    render() {
        if (this.props.User.usertype === 'free') {
            return (
                <div className='pt-5'>
                    <section className="pricing py-5" id="pricing">
                        <div className="container">
                            <div className="row justify-content-center">
                                {/* Free Tier */}
                                <div className="col-lg-4">
                                    <div className="card mb-5 mb-lg-0">
                                        <div className="card-body">
                                            <h5 className="card-title text-muted text-uppercase text-center">
                                                Free
                                            </h5>
                                            <h6 className="card-price text-center">
                                                $0<span className="period">/month</span>
                                            </h6>
                                            <hr />
                                            <ul className="fa-ul">
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                Single User
                            </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                5GB Storage
                            </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                Unlimited Public Projects
                            </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                Community Access
                            </li>
                                                <li className="text-muted">
                                                    <span className="fa-li">
                                                        <i className="fas fa-times" />
                                                    </span>
                                Unlimited Private Projects
                            </li>
                                                <li className="text-muted">
                                                    <span className="fa-li">
                                                        <i className="fas fa-times" />
                                                    </span>
                                Dedicated Phone Support
                            </li>
                                                <li className="text-muted">
                                                    <span className="fa-li">
                                                        <i className="fas fa-times" />
                                                    </span>
                                Free Subdomain
                            </li>
                                                <li className="text-muted">
                                                    <span className="fa-li">
                                                        <i className="fas fa-times" />
                                                    </span>
                                Monthly Status Reports
                            </li>
                                            </ul>
                                            <button href="#" disabled className="btn btn-block btn-primary text-uppercase">
                                                Your Plan
                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Premium Tier */}
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title text-muted text-uppercase text-center">
                                                Premium
                            </h5>
                                            <h6 className="card-price text-center">
                                                $49<span className="period">/month</span>
                                            </h6>
                                            <hr />
                                            <ul className="fa-ul">
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                                    <strong>Unlimited Users</strong>
                                                </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                150GB Storage
                            </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                Unlimited Public Projects
                            </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                Community Access
                            </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                Unlimited Private Projects
                            </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                Dedicated Phone Support
                            </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                                    <strong>Unlimited</strong> Free Subdomains
                            </li>
                                                <li>
                                                    <span className="fa-li">
                                                        <i className="fas fa-check" />
                                                    </span>
                                Monthly Status Reports
                            </li>
                                            </ul>
                                            <button onClick={this.bayarconfirm} className="btn btn-block btn-warning text-uppercase">
                                                Upgrade
                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }else {
            return <Redirect to='/notfound' />
        }
    }
}


const MapstatetoProps = (state) => {
    return {
        User: state.Auth
    }
}

export default connect(MapstatetoProps, {TotalQty})(Upgrade);