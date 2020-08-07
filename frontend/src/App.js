import React, { useState, useEffect }  from 'react';
import ListOfTodo from './list/ListOfTodo'
import AddTask from './forms/AddTask'

import './App.css';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function App() {
  const [taskList, setTaskList] = useState([])

  const todoList = () => {
    fetch("http://127.0.0.1:8000/api/task-list")
    .then((res) => res.json())
    .then((data) => setTaskList(data));
  }

  useEffect(() => {
    todoList()
  },[]);

  const addTodo = (todo) => {
    const csrftoken = getCookie('csrftoken');
    let URL = "http://127.0.0.1:8000/api/task-create/"
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ title: todo.title }),
    })
    .then(res => {
      setTaskList([...taskList, todo])
    })
  }

  const deleteTodo = (id) => {
    console.log(id, 'id')
    const csrftoken = getCookie('csrftoken');
    let URL = `http://127.0.0.1:8000/api/task-delete/${id}`
    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
    })
    .then(res => {
      todoList()
    })
  }

  
  return (
    <div className="container">
      <header className="header">
        <h2>Todo List</h2>
        <h4>(Django RESTful api + React Hooks)</h4>
      </header>
      <AddTask addTodo={addTodo} />
      <ListOfTodo taskList={taskList} deleteTodo={deleteTodo}/>
    </div>
  );
}

export default App;
