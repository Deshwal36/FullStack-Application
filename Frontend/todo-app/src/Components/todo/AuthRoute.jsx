import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthService from './AuthService.js'

class AuthRoute extends Component{
    render(){
        if(AuthService.isUserLoggedIn()){
            return <Route {...this.props}/>
        } else{
            return <Redirect to="/login"/>
        }
    }
}

export default AuthRoute