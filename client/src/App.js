import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/todos/Todos';
import AddTodo from './components/todos/AddTodo';
import About from './components/pages/About';
import axios from 'axios';
//import {v4 as uuid} from 'uuid';

class App extends Component {
  state = {
    todos: [],
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://localhost:5000/listings',
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => this.setState({ todos: res.data }))
    .catch(error => {
      console.log(error.response)
    });
  }
  // Toggle complete
  markComplete = (_id) => {
    this.setState( {todos: this.state.todos.map(todo => {
      if(todo._id === _id){
        todo.completed = !todo.completed; //set to opposite when toggled
      }
      return todo;
    })
    });
  }

  // Delete Todo entry
  delTodo = (_id) => {
    //deletes it on the server and updates api
    console.log(_id);
    //console.log(this.state.todos);
    axios.delete(`http://localhost:5000/listings/${_id}`, {
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      this.setState({ todos: res.data })
      console.log(res.data);
      })
    .catch(error => {
      console.log(error.response)
    });
    //.then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo._id !== _id)] }));

    //change out our todos array with a filtered array without the entry to be deleted
    // ... is spread operator, copies everything already there
    //this.setState({ todos: [...this.state.todos.filter(todo => todo._id !== _id)] });
  }
  
  // Add Todo
  addTodo = (model, make, year, price, sellerName, description) => {
    /*
    const newTodo = {
      id: uuid(),
      model,
      make,
      year,
      price,
      sellerName,
      description,
      completed: false
    }
    //can't just simply change todos, we have to make a copy with ...
    this.setState({ todos: [...this.state.todos, newTodo]})
    */
   
    axios.post('http://localhost:5000/listings', {
      model,
      make,
      year,
      price,
      sellerName,
      description,
      completed: false
    },
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      //this.setState({ todos: [...this.state.todos, res.data] })
      this.setState({ todos: res.data })
      console.log(res.data);
      console.log(this.state.todos);
      })
      .catch(error => {
        console.log(error.response)
      });
  }

  
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} 
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}/>
              </React.Fragment>
            )}/>
            <Route path="/about" component={About}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;