import axios from 'axios';
import {API_URL} from '../../Constants'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
class AuthService {

        executeBasicAuthService(username,password){
            
            return axios.get(`${API_URL}/basicauth`,
            {headers: {authorization: this.createBasicAuthToken(username,password)}})
        }
        executeJwtAuthService(username,password){
           // console.log(username+password)
            return axios.post(`${API_URL}/authenticate`,
            {username,
            password
            })
        }

        createBasicAuthToken(username,password){
            return 'Basic ' + window.btoa(username + ":" + password)
        }

        createJwtToken(username,token){
            return 'Bearer ' + token
        }

        registerSuccessfullogin(username,password) {
            
           // console.log('RegisterSuccessfulllogin')
            sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
            this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
        }
        
        registerSuccessfulloginForJwt(username,token) {
            
            // console.log('RegisterSuccessfulllogin')
             sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
             this.setupAxiosInterceptors(this.createJwtToken(username,token))
         }

        logout() {
            sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        }

        isUserLoggedIn(){
            let user=sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
            if(user===null) 
            return false
            return true
        }

        getLoggedInUser(){
            let user=sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
            if(user===null) 
            return ''
            return user
        }

        setupAxiosInterceptors(token){

            // let username='Algocorner'
            // let password='dummy'
    
            
            axios.interceptors.request.use(
                (config) =>  {
                    if(this.isUserLoggedIn()){
                    config.headers.authorization = token
                    }
                    return config
                }
            )
        }



}

export default new AuthService()