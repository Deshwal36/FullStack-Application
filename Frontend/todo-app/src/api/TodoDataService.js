import axios from 'axios'
//import {API_URL} from '../Constants'
import {JPA_API_URL} from '../Constants'
class TodoDataService{

    retriveAllTodos(name){
        console.log(name)
        return axios.get(`${JPA_API_URL}/users/${name}/todos`)
        //console.log('executed service')
    }

    retriveTodo(name,id){

        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
        //console.log('executed service')
    }

    deleteTodo(name,id){
        // console.log(name)
        // console.log(id)
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
        //console.log('executed service')
    }

    UpdateTodo(name,id, todo){

        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`,todo)
        //console.log('executed service')
    }
    createTodo(name, todo){

        return axios.post(`${JPA_API_URL}/users/${name}/todos`,todo)
        //console.log('executed service')
    }
}

export default new TodoDataService()