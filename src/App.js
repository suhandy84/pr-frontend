import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './component/header'
import Home from './pages/home'
import PremiumArea from './pages/premiumarea'
import { Switch, Route } from 'react-router-dom'
import Axios from 'axios'
import { API_URL } from './supports/ApiUrl';
import { KeepLogin } from './redux/actions';
import { connect } from 'react-redux'
import SignUp from './pages/signup'
import SignIn from './pages/signin'
import Upgrade from './pages/upgrade'
import ManageAdmin from './pages/manageadmin'

function App({KeepLogin}) {

  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    var id = localStorage.getItem('iduser')
    if (id) {
      Axios.get(`${API_URL}/users/${id}`)
        .then(res => {
          KeepLogin(res.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  if (Loading) {
    return <div>loading...</div>
  }
  return (
    <div className="App">
      <Header/>
      {/* <Home/> */}
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/premiumarea' exact component={PremiumArea} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/upgrade' exact component={Upgrade} />
        <Route path='/manageadmin' exact component={ManageAdmin} />
        {/* <Route path='/manageorder' exact component={ManageOrder} />
        <Route path='/productdetail/:idprod' exact component={ProductDetail} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/search' exact component={Search} />
        <Route path='/filter' exact component={filter} />
        <Route path='/usersetting' exact component={UserSetting} />
        <Route path='/statusorder' exact component={StatusOrder} />
        <Route path='/*' component={NotFound} /> */}
      </Switch>
    </div>
  );
}

const MapstatetoProps = (state) => {
  return {
    User: state.Auth,
    Header: state.Header.ishome,
    Cart:state.Cart.totalqty
  }
}

export default connect(MapstatetoProps, { KeepLogin })(App);
