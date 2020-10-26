import React, { useState, useEffect, useCallback }  from 'react';
import ListOfTodo from './List/ListOfTodo'
import AddTask from './forms/AddTask'
import UpdateTask from './forms/UpdateTask'
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { requestTodos } from './action'

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
  const dispatch = useDispatch()
  const taskList = useSelector(state => state.todos)
  const requestTodoList = useCallback(
    () => dispatch(requestTodos()),
    [dispatch]
  )

  const todoList = () => {
    requestTodoList()
  }

  useEffect(() => {
    todoList()
  },[]);

  const addTodo = (title) => {
    const csrftoken = getCookie('csrftoken');
    let URL = "http://127.0.0.1:8000/api/task-create/"
    // let URL = `https://jhmyung6225.pythonanywhere.com/api/task-create/`

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ title }),
    })
    .then(res => {
      todoList()
    })
  }

  const deleteTodo = (id) => {
    const csrftoken = getCookie('csrftoken');
    let URL = `http://127.0.0.1:8000/api/task-delete/${id}`
    // let URL = `https://jhmyung6225.pythonanywhere.com/api/task-delete/${id}`

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

  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, title: '' }
  const [currentTodo, setCurrentTodo] = useState(initialFormState)

  const currentUpdate = (id, title) => {
    setEditing(true)
    setCurrentTodo({id, title})
  }

  const updateTodo = (todo) => {
    setEditing(false)
    const csrftoken = getCookie('csrftoken');
    let URL = `http://127.0.0.1:8000/api/task-update/${todo.id}`
    // let URL = `https://jhmyung6225.pythonanywhere.com/api/task-update/${todo.id}`    
    fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ id: todo.id, title: todo.title }),
    })
    .then(res => {
      todoList()
    })
  }

  const lineThrough = (todo) => {
    todo.completed = !todo.completed
    const csrftoken = getCookie('csrftoken');
    let URL = `http://127.0.0.1:8000/api/task-update/${todo.id}`
    // let URL = `https://jhmyung6225.pythonanywhere.com/api/task-update/${todo.id}`
    fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ 
          title: todo.title, 
          completed: todo.completed 
        }),
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
      {editing ? (
        <UpdateTask updateTodo={updateTodo} currentTodo={currentTodo} />
      ) : (
        <AddTask addTodo={addTodo} />
      )}
      <ListOfTodo 
        taskList={taskList}

        deleteTodo={deleteTodo} 
        currentUpdate={currentUpdate} 
        lineThrough={lineThrough
        }/>
    </div>
  );
}

export default App;
