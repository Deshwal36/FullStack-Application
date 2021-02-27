import React, {Component} from 'react'
import Authservice from './AuthService'

class LoginComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            Username : 'Algocorner',
            Password : '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange=this.handleChange.bind(this);
        this.loginClicked=this.loginClicked.bind(this);
    }
  
    loginClicked(){
        // Algocorner
        // if(this.state.Username === 'Algocorner' &&  this.state.Password === 'dummy'){
        //     Authservice.registerSuccessfullogin(this.state.Username,this.state.Password);
        //     this.props.history.push('/welcome/'+ this.state.Username)
        // }
        // // this.setState(
        // //     {
        // //         showSuccessMessage: true,
        // //         hasLoginFailed: false
        // //     }
        // // )
        // else{
        //     this.setState(
        //         {
        //             hasLoginFailed: true,
        //             showSuccessMessage: false
        //         }
        //     )
        // }


        // Authservice
        // .executeBasicAuthService(this.state.Username, this.state.Password)
        // .then(
        //     ()=> {
        //         Authservice.registerSuccessfullogin(this.state.Username,this.state.Password);
        //         this.props.history.push('/welcome/'+ this.state.Username)
        //     }
        // ).catch(
        //     ()=> this.setState(
        //         {
        //             hasLoginFailed: true,
        //             showSuccessMessage: false
        //         }
        //     )
        // )

        Authservice
        .executeJwtAuthService(this.state.Username, this.state.Password)
        .then(
            (response)=> {
                Authservice.registerSuccessfulloginForJwt(this.state.Username,response.data.token);
                this.props.history.push('/welcome/'+ this.state.Username)
            }
        ).catch(
            ()=> this.setState(
                {
                    hasLoginFailed: true,
                    showSuccessMessage: false
                }
            )
        )

       // console.log(this.state);
    }
  
    handleChange(event){
        //console.log(event.target.name);
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                {/*<ShowLoginSuccess showSuccessMessage={this.state.showSuccessMessage}/>*/}
                {this.state.showSuccessMessage && <div>Login Successfull</div>}
                User name : <input type="text" name="Username" value={this.state.Username} onChange={this.handleChange}/>
                Password : <input type="password" name="Password" value={this.state.Password} onChange={this.handleChange}/>
                <button className="btn btn-success" onClick={this.loginClicked}> Login </button>
                </div>
            </div>
        );
    }  
}

export default LoginComponent