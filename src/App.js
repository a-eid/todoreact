import React, { Component } from 'react';
// import {v1} from "uuid" 
import './App.css';
let id = 0;

class App extends Component {
  state = {
    todos : [] , 
    search: "" , 
    filter: false  
  }

  addTodo = (todo) => this.setState ({
    todos: [...this.state.todos , todo] 
  }) 

  todoClick = id => {
    this.setState({
      todos: this.state.todos.map( todo => {
        return id == todo.id ? ({id: id , text: todo.text , completed: !todo.completed}) : todo 
      })
    })
  } 

  handleFilter = () => this.setState({filter: !this.state.filter}) 
  handleSearch = e => this.setState({search: e.target.value}) 

  render() {
    const {todos , search , filter} = this.state 
    return (
      <div className="App">
        <Filter search={search} handleSearch={this.handleSearch}
         handleFilter={this.handleFilter} filter={this.state.filter} />
        <TodoList todos={todos} filter={filter} search={search} todoClick={this.todoClick} /> 
        <AddTodo addTodo={this.addTodo} /> 
      </div>
    );
  }
}

const TodoList = ({todos , filter , search , todoClick}) => (
  <div>
    {todos.filter( todo =>{
      // if no filter and no search 
      if(!filter && search.trim() == "") return true 
      
      // if filter but not serach 
      if(filter && search.trim() == "") {
        return !todo.completed
      }
      // if no filter but search 
      if(!filter && search.trim() != "") return todo.text.search(new RegExp(search)) >= 0  
      // if filter and search 
      if(filter && search.trim() != "") return !todo.completed && todo.text.search(new RegExp(search)) >= 0 
    }).map( todo => <TodoItem key={todo.id} todoClick={todoClick} {...todo} />)} 
  </div>
)

const TodoItem = ({id , text , completed , todoClick}) => (
  <div>
    <p onClick={ _ =>  todoClick(id) } >{id}. {text} {completed ? "completed" : "not yet"}</p>
  </div>
)

class AddTodo extends Component {
  state = {value : ""} 

  onChange = e => this.setState({value: e.target.value})
  handleSubmit = e => {
    e.preventDefault() 
    this.props.addTodo({
      id: id++ , 
      text: this.state.value , 
      completed: false  
    })
    this.setState({value: ""})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input type="text" value={this.state.value} onChange={this.onChange}/>
        <button>Add Todo</button>
      </form>
    )
  }
}

const Filter = ({ filter , search , handleSearch , handleFilter}) => (
  <div>
    <input type="text" value={search} onChange={handleSearch} /> 
    <input type="checkbox" checked={filter} onChange={handleFilter}/> <span>not completed</span> 
  </div>
)

export default App;