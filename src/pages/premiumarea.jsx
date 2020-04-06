import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { Fragment } from "react";
import { FaHome, FaCogs } from 'react-icons/fa'
import { MdVideoLibrary } from 'react-icons/md'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Axios from 'axios';
import { API_URL } from '../supports/ApiUrl';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './home.css'

class PremiumArea extends Component {
    state = {
        videos: []
    }

    componentDidMount() {
        Axios.get(`${API_URL}/videos?_expand=kategori&_expand=subkategori&videotype=premium`)
            .then(res => {
                console.log(res.data)

                this.setState({ videos: res.data })
            }).catch(err => {
                console.log(err)
            })
    }

    shuffleArray(arr) {
        for (var i=0; i < arr.length; i++) {
            var randomarr = Math.floor(Math.random() * arr.length)
            // console.log(randomarr)
            var temparr = arr[i]
            arr[i] = arr[randomarr]
            arr[randomarr] = temparr
            console.log(arr[i])
        }
        return arr
    }

    renderPremiumVideos = () => {
        const { videos } = this.state
        const shuffleddata=this.shuffleArray(videos)
        return shuffleddata.map((val, index) => {
            return (
                <Fragment>
                    <div className="col-md-3">
                        <div className="embed-responsive embed-responsive-4by3">
                            <iframe className='embed-responsive-item img-responsive rounded-lg' src={val.video} frameborder="0" allowFullScreen title="Video"></iframe>
                        </div>
                        <div className="font-weight-bold">{val.name}</div>
                        <p className="text-muted font-weight-bolder">
                            {val.kategori.nama}
                            <br />
                            {`${val.view} views`} • {`${val.uploadtime} ago`}
                        </p>
                    </div>
                </Fragment>
            )
        })
    }

    navigate = (selected) => {
        window.location.href = selected
    }

    render() {
        return (
            <div>
                {this.props.usertype !== "premium" ?
                    <Redirect to='/' />
                    :
                    <Fragment>
                        <SideNav className="pt-5 mt-3 position-fixed bg-nav">
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected="premiumarea">
                                <NavItem onClick={()=>this.navigate("/")} eventKey="home">
                                    <NavIcon>
                                        <Link to="/"><FaHome style={{ fontSize: '1.75em' }} /></Link>
                                    </NavIcon>
                                    <NavText>
                                        <Link to="/">Home</Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="premiumarea">
                                    <NavIcon>
                                       <MdVideoLibrary style={{ fontSize: '2em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Premium Area
                                    </NavText>
                                </NavItem>
                                <NavItem onClick={()=>this.navigate("/setting")} eventKey="setting">
                                    <NavIcon>
                                        <Link to="/setting"> <FaCogs style={{ fontSize: '2em' }} /> </Link>
                                    </NavIcon>
                                    <NavText>
                                        <Link to="/setting">Setting</Link>
                                    </NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>

                        <div className="container pt-5 mt-4 mr-2">
                            <h2 className='mt-1'>
                                Premium Area
                                </h2>
                            <div className="row">
                                {this.renderPremiumVideos()}
                            </div>
                            {/* //cadangan */}
                            {/* <div className="batas"></div> */}
                            {/* <h2 className='pt-3'>
                                COVID-19 news
                                    </h2>
                            <div className="row">
                                
                            </div> */}
                        </div>
                    </Fragment>
                }
            </div>
        );
    }
}

const MapstatetoProps = (state) => {
    return state.Auth
}

export default connect(MapstatetoProps)(PremiumArea);