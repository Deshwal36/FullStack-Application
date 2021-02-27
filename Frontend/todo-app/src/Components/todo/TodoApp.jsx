import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthRoute from './AuthRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './TodoComponent.jsx'
class TodoApp extends Component{
    render() {
        return (
        <div className="TodoApp">

            <Router>
                <HeaderComponent/>
                <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <AuthRoute path="/welcome/:name" component={WelcomeComponent}/>
                    <AuthRoute path="/todos/:id" component={TodoComponent}/>
                    <AuthRoute path="/todos" component={ListTodosComponent}/>
                    <AuthRoute path="/logout" component={LogoutComponent}/>
                    <Route component={ErrorComponent}/>

                </Switch>
                <FooterComponent/>
            </Router>
            {/*<LoginComponent/>
            <WelcomeComponent/>*/}
        </div>
        );
    }
}

export default TodoApp