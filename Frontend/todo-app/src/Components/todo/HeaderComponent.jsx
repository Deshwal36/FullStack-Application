import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Authservice from './AuthService'
import { withRouter } from 'react-router-dom'
class HeaderComponent extends Component{
    render(){

        const isUserLoggedIn = Authservice.isUserLoggedIn()

        return(
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="./LoginComonent" className="navbar-brand">Algocorner</a></div>
                        <ul className="navbar-nav">
                            {isUserLoggedIn && <li><Link className="nav-link" to="welcome/Algocorner">Home</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to="/todos">todos</Link></li>}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {!isUserLoggedIn && <li><Link  className="nav-link" to="/login">login</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={Authservice.logout} >logout</Link></li>}
                        </ul>
                    </nav>
                   
                </header>
            </div>
        )
    }
}

export default withRouter(HeaderComponent)