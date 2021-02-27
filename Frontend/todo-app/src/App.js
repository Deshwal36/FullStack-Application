import React,{ Component } from 'react';
import TodoApp from './Components/todo/TodoApp'
import './App.css';
import './bootstrap.css'

//import Counter from './Components/Counter/Counter'

class App extends Component {
  render() {
    return(
    <div className="App">
     {/*<Counter/>*/}
     
     <TodoApp/>
     
      
    </div>
  );
 } 
}



export default App;
