import React from 'react';
import './App.css';
// JSX

/*const SmallComponent = (props) => {
  console.log(props);
  return (
    <div>
      Hello <br />{props.myName}
    </div>
  );
};*/

// {content:'',finished:t/f}
class App extends React.Component {
  /*state = {
    name: '123456789'
  };*/
  state = {
    todos: [],
    inputValue: '',
  };

  handleformSubmit = (event) => {
    event.preventDefault();

    const todoContent = this.state.inputValue;
    const newTodo = {
      content: todoContent,
      finished: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
      inputValue: '',
    });
  };


  render() {
    console.log(this.state.todos);
    return (
      //<div>Class Component</div>
      <div className='todo-app'>
        <form onSubmit={this.handleformSubmit}>
          <input type='text'
            value={this.state.inputValue}
            onChange={(event) => {
              console.log(event.target.value);
              this.setState({
                inputValue: event.target.value,
              });
            }}
          />
          <input type="submit" value='submit' />
        </form>

        {this.state.todos.map((item, index) => {
          return (
            <div key={index}>
              <input type='checkbox'
                checked={item.finished}
                onChange={(event) => {
                  const newTodos = this.state.todos.map((todo, i) => {
                    if (index === i) {
                      return {
                        content: todo.content,
                        finished: event.target.checked
                      }
                    } else {
                      return todo;
                    }
                  });
                  this.setState({
                    todos: newTodos,
                  });
                }}
              />
              {item.finished ? <strike>{item.content}</strike> : <span>{item.content}</span>}
              <button onClick={(event) => {
                const newTodos = this.state.todos.filter((todo, i) => {
                  if (index === i) {
                    return false;
                  } else {
                    return true;
                  }
                });
                this.setState({
                  todos: newTodos,
                });
              }} >Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;