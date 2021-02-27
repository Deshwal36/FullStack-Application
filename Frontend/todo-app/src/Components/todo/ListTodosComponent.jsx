import React, {Component} from 'react'
import TodoDataService from '../../api/TodoDataService.js'
import AuthService from './AuthService.js'
import moment from 'moment';
class ListTodosComponent extends Component{

    constructor(props){
        //console.log('constructor');
        super(props)

        this.state={
            todos : [],
            message : null
        }
        this.addTodoClicked=this.addTodoClicked.bind(this);
        this.deleteTodoClicked=this.deleteTodoClicked.bind(this);
        this.updateTodoClicked=this.updateTodoClicked.bind(this);
        this.refreshTodos=this.refreshTodos.bind(this);
    }

    componentDidMount(){
        //console.log('componentDidMount')
        this.refreshTodos();
        ///console.log(this.state)
    }

    refreshTodos(){
        TodoDataService.retriveAllTodos(AuthService.getLoggedInUser())
        .then( 
            response => {
                //console.log(response)
                this.setState(
                    {
                        todos : response.data  
                    }
                )
            }
        ) 
    }

    deleteTodoClicked(id){
        let username=AuthService.getLoggedInUser()
        //console.log(id + " " + username );
        TodoDataService.deleteTodo(username,id)
        .then (
            response => {
                this.setState(
                    {
                        message : `Delete of todo ${id} successful`
                    }    
                )
                this.refreshTodos()
            }
        )

    }
    addTodoClicked(){
        this.props.history.push(`/todos/-1`)
    }
    updateTodoClicked(id){
        console.log(`update ${id}` )
        this.props.history.push(`/todos/${id}`)
        // let username=AuthService.geLoggedInUser()
        // //console.log(id + " " + username );
        // TodoDataService.deleteTodo(username,id)
        // .then (
        //     response => {
        //         this.setState(
        //             {
        //                 message : `Delete of todo ${id} successful`
        //             }    
        //         )
        //         this.refreshTodos()
        //     }
        // )

    }


    render() {
        //console.log('render')
        return (
        
        <div>
            <h1>List todos</h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table className="table">
                <thead>
                    <tr><th>Description</th><th>Is_completed</th><th>Target_Date</th><th>Delete</th><th>Update</th></tr>
                </thead>
                <tbody>
                    {
                    this.state.todos.map (
                        todo =>
                        <tr key={todo.id}> 
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                            <td><button  className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                            <td><button  className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                        </tr>
                    )
                    }   
                </tbody>
            </table>

            <div className="row">
                <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
            </div>
            </div>

        </div>
        )
    }
}

export default ListTodosComponent