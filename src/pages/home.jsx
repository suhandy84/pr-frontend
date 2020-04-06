import React, { Component } from "react";
import { connect } from 'react-redux'
import { IniHome, BukanHome } from './../redux/actions'
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Pricing from "../component/pricing";
import Testimonial from "../component/testimonial";
import Footer from "../component/footer";
import Services from "../component/services";
import { Fragment } from "react";
import { FaChartLine, FaHome, FaCogs } from 'react-icons/fa'
import { MdVideoLibrary } from 'react-icons/md'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Axios from 'axios';
import Swal from 'sweetalert2'
import { API_URL } from '../supports/ApiUrl';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './home.css'

class Home extends Component {
    state = {
        videosrec: [],
        videostren: [],
        videosnews: [],
        selected: 'home'
    }

    componentDidMount() {
        Axios.get(`${API_URL}/videos?_expand=kategori&_expand=subkategori&videotype=free&subkategoriId=1`)
            .then(res => {
                console.log(res.data)
                this.setState({ videosrec: res.data })
                Axios.get(`${API_URL}/videos?_expand=kategori&_expand=subkategori&videotype=free&subkategoriId=2`)
                    .then(res1 => {
                        console.log(res1.data)
                        this.setState({ videosnews: res1.data })
                    }).catch(err => {
                        console.log(err)
                    })
                Axios.get(`${API_URL}/videos?_expand=kategori&_expand=subkategori&videotype=free&subkategoriId=3`)
                    .then(res3 => {
                        console.log(res3.data)
                        this.setState({ videostren: res3.data })
                    }).catch(err => {
                        console.log(err)
                    })
            }).catch(err => {
                console.log(err)
            })

        this.props.IniHome()
    }


    componentWillUnmount = () => {
        console.log('jalan unmount')
        this.props.BukanHome()
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

    renderVideos = (data) => {
        const shuffleddata=this.shuffleArray(data)
        return shuffleddata.map((val, index) => {
            return (
                <Fragment key={index}>
                    <div className="col-md-3">
                        <div className="embed-responsive embed-responsive-4by3">
                            <iframe className='embed-responsive-item img-responsive rounded-lg' src={val.video} frameBorder="0" allowFullScreen title="Video"></iframe>
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

    onSelect = (select) => {
        this.setState({ selected: select })
    }

    navigate = (selected) => {
        window.location.href = selected
    }

    alert = () => {
        Swal.fire({
            title: 'Maaf Anda BUKAN Premium User.',
            width: 600,
            padding: '3em',
            background: '#fff url(./image/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("./image/nyan-cat.gif")
              left top
              no-repeat
            `
        }).then((result) => {
            if (result.value) {
                this.setState({ selected: 'home'  });
            }
        })
    }

    render() {
        const { videosrec, videostren, videosnews, selected } = this.state
        return (
            <div>
                {
                    this.props.islogin ?
                        <Fragment>
                            <SideNav className="pt-5 mt-3 position-fixed bg-nav" onSelect={this.onSelect}>
                                <SideNav.Toggle />
                                <SideNav.Nav  selected={selected}>
                                    <NavItem eventKey="home">
                                        <NavIcon>
                                            <FaHome style={{ fontSize: '1.75em' }} />
                                        </NavIcon>
                                        <NavText>
                                            Home
                                        </NavText>
                                    </NavItem>
                                    {
                                        this.props.role === "admin" ?
                                            <NavItem onClick={()=>this.navigate("/manageadmin")} eventKey="manageadmin">
                                                <NavIcon>
                                                    <Link to="/manageadmin"><MdVideoLibrary style={{ fontSize: '2em' }} /></Link>
                                                </NavIcon>
                                                <NavText>
                                                    <Link to="/manageadmin">Manage Video</Link>
                                                </NavText>
                                            </NavItem>
                                            :
                                            this.props.usertype === "premium" ?
                                            <NavItem onClick={()=>this.navigate("/premiumarea")} eventKey="premiumarea">
                                                <NavIcon>
                                                    <Link to="/premiumarea"><MdVideoLibrary style={{ fontSize: '2em' }} /></Link>
                                                </NavIcon>
                                                <NavText>
                                                    <Link to="/premiumarea">Premium Area</Link>
                                                </NavText>
                                            </NavItem>
                                            :
                                            <NavItem onClick={this.alert} eventKey="premiumarea">
                                                <NavIcon>
                                                    <MdVideoLibrary style={{ fontSize: '2em' }} />
                                                </NavIcon>
                                                <NavText>
                                                    Premium Area
                                                </NavText>
                                            </NavItem>
                                    }
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
                                    Recommended
                                </h2>
                                <div className="row">
                                    {this.renderVideos(videosrec)}
                                </div>
                                <div className="batas"></div>
                                <h2 className='pt-3'>
                                    Trending
                                    </h2>
                                <div className="row">
                                    {this.renderVideos(videostren)}
                                </div>
                                <div className="batas"></div>
                                <h2 className='pt-3'>
                                    COVID-19 news
                                    </h2>
                                <div className="row">
                                    {this.renderVideos(videosnews)}
                                </div>
                            </div>
                        </Fragment>
                        :
                        //tampilan sebelum login//
                        <Fragment>
                            <header className="masthead" id="about">
                                <div className="container h-100">
                                    <div className="row h-100 align-items-center justify-content-center text-center">
                                        <div className="col-lg-10 align-self-end">
                                            <h1 className="text-uppercase text-white font-weight-bold">
                                                Your Favorite Source of Free Bootstrap Themes
                                    </h1>
                                            <hr className="divider my-4" />
                                        </div>
                                        <div className="col-lg-8 align-self-baseline">
                                            <p className="text-white font-weight-light mb-5">
                                                Start Bootstrap can help you build better websites using the Bootstrap
                                                framework! Just download a theme and start customizing, no strings
                                                attached!
                                    </p>
                                            <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">
                                                Find Out More
                                    </a>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <Services />
                            <Pricing />
                            <Testimonial />
                        </Fragment>
                }
                <Footer />
            </div>
        );
    }
}

const MapstatetoProps = ({ Auth }) => {
    return {
        islogin: Auth.islogin,
        role: Auth.role,
        usertype: Auth.usertype
    }
}

export default connect(MapstatetoProps, { IniHome, BukanHome })(Home);