import axios from 'axios'
import {API_URL} from '../../Constants'
class HelloWorldService {
  
    executeHelloWorldService(){

        return axios.get(`${API_URL}//hello-World`);
        //console.log('executed service')
    }

    executeHelloWorldBeanService(){

        return axios.get('http://localhost:8081//hello-World-bean');
        //console.log('executed service')
    }

    executeHelloWorldPathVariableService(name){

        // let username='Algocorner'
        // let password='dummy'

        // let basicAuthHeader ='Basic ' + window.btoa(username + ":" + password)
        return axios.get(`${API_URL}/hello-world/path-variable/${name}`);
        
            // {
            //     headers : {
            //         authorization: basicAuthHeader
            //     }
            // }
        
        //console.log('executed service')
    }
}

export default new HelloWorldService()