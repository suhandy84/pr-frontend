import React, { Component, Fragment } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBWaves
} from "mdbreact";
import { connect } from 'react-redux'
import { IniHome } from './../redux/actions'
import { FaVimeo, FaUserPlus } from "react-icons/fa";
import { GiArmorUpgrade } from "react-icons/gi";
import { BrowserRouter as Router, Link } from 'react-router-dom';

class NavbarPage extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logout = () => {
    localStorage.clear()
  }

  render() {
    return (
      // <Router>
      <MDBNavbar color="blue-gradient" dark expand="md" scrolling fixed="top">
        <MDBNavbarBrand>
        <Link to="/"><FaVimeo color='white' size="1.75em" /></Link>
          {/* <strong className="white-text">Video Boss!</strong> */}
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            {
                this.props.User.usertype === "free" ?
                <MDBNavItem active>
                  <MDBBtn className="rounded-pill mt-2 font-weight-bold " gradient="winter-neva" color=" blue-text" size="sm">{this.props.User.usertype}</MDBBtn>
                  <Link to='/upgrade'>
                  <FaUserPlus className="ml-2" size="1.5em" color="blue"/>
                  <span className="font-weight-bold yellow-text ml-2" style={{lineHeight:"48px"}}>Upgrade</span>
                  </Link>
                </MDBNavItem>
                :
                this.props.User.usertype === "premium" ?
                <MDBNavItem active>
                  <MDBBtn className="rounded-pill mt-2 font-weight-bold " gradient="sunny-morning" color=" blue-text" size="sm">{this.props.User.usertype}<FaUserPlus className="ml-2 pb-1" size="20px"  /></MDBBtn>
                </MDBNavItem>
                :
                this.props.User.usertype === "admin" ?
                <MDBNavItem active>
                  <MDBBtn className="rounded-pill mt-2 font-weight-bold " gradient="young-passion" color=" text-muted" size="sm">{this.props.User.usertype}</MDBBtn>
                </MDBNavItem>
                :
                <MDBNavItem active>
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
            }
            {/* <MDBNavItem>
              <MDBNavLink to="#!">Features</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="pricing">Pricing</MDBNavLink>
            </MDBNavItem> */}
            {/* <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem> */}
            {
              this.props.User.islogin ?
                null
                :
                this.props.Home ?
                  <Fragment>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">About</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#services">Services</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#pricing">Pricing</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#testimonials">Testimonials</a></li>
                  </Fragment>
                  :
                  null
            }
          </MDBNavbarNav>
          <MDBNavbarNav right>
            {
              this.props.User.islogin ?
                null
                :
                <Fragment>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="/signin">
                      <span>Sign In</span>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="/signup">
                      <span className="signup">Sign Up</span>
                    </MDBNavLink>
                  </MDBNavItem>
                </Fragment>
            }
            {
              this.props.User.islogin ?
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" className="mr-2" />
                      Welcome Back, {this.props.User.username}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                      <MDBDropdownItem href="/" onClick={this.logout}>Sign Out</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                :
                null
            }
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      // </Router>
    );
  }
}

const MapstatetoProps = (state) => {
  return {
    User: state.Auth,
    Home: state.Header.ishome
  }
}

export default connect(MapstatetoProps, { IniHome })(NavbarPage);