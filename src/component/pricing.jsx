import React, { Component } from "react";

class Pricing extends Component {
    render() {
        return (
            <section className="pricing py-5" id="pricing">
                <div className="container">
                    <div className="row">
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
                            <a href="#" className="btn btn-block btn-primary text-uppercase">
                            Button
                            </a>
                        </div>
                        </div>
                    </div>
                    {/* Plus Tier */}
                    <div className="col-lg-4">
                        <div className="card mb-5 mb-lg-0">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">
                            Plus
                            </h5>
                            <h6 className="card-price text-center">
                            $9<span className="period">/month</span>
                            </h6>
                            <hr />
                            <ul className="fa-ul">
                            <li>
                                <span className="fa-li">
                                <i className="fas fa-check" />
                                </span>
                                <strong>5 Users</strong>
                            </li>
                            <li>
                                <span className="fa-li">
                                <i className="fas fa-check" />
                                </span>
                                50GB Storage
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
                                Free Subdomain
                            </li>
                            <li className="text-muted">
                                <span className="fa-li">
                                <i className="fas fa-times" />
                                </span>
                                Monthly Status Reports
                            </li>
                            </ul>
                            <a href="#" className="btn btn-block btn-primary text-uppercase">
                            Button
                            </a>
                        </div>
                        </div>
                    </div>
                    {/* Pro Tier */}
                    <div className="col-lg-4">
                        <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">
                            Pro
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
                            <a href="#" className="btn btn-block btn-primary text-uppercase">
                            Button
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Pricing