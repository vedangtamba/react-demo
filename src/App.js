import React, { Component } from 'react' 
import Header from './components/layout/Header'
import Todos from './components/Todos'
import AddTodos from './components/AddTodo'
import About from './components/pages/About'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import axios from 'axios'

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res=>
    this.setState({todos: res.data}))
  }
 
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(i=>{
        if(i.id === id){
          i.completed = !i.completed
        }  
        return i;     
      })

    });
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res=>this.setState({todos: [...this.state.todos.filter(i => i.id !==id)]}));
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    }).then(res=>this.setState({todos: [...this.state.todos, res.data]}));    
  }

  render(){  
  return (
    <Router>
    <div className="App">   
    <div className="container">   
      <Header />  
      <Route exact path="/" render={props=>(
        <React.Fragment>
          <AddTodos addTodo={this.addTodo}  />
          <Todos todos={this.state.todos} markComplete= {this.markComplete} delTodo= {this.delTodo}/>
       </React.Fragment>
      )}/>
      <Route path="/about" component={About}/>
    </div>
    </div>
    </Router>
  );
  }
}

export default App;
