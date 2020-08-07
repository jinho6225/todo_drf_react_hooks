import React, { useState, useEffect }  from 'react';
import ListOfTodo from './List/ListOfTodo'
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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/task-list")
      .then((res) => res.json())
      .then((data) => setTaskList(data));
  },[]);

  
  return (
    <div className="container">
      <header className="header">
        <h2>Todo List</h2>
        <h4>(Django RESTful api + React Hooks)</h4>
      </header>
      <div className="inputBox">
        <form method="POST" className="inputForm">
          <input type="text" placeholder="Add task" className="inputField" />
          <button type="submit" className="submitBtn" >Submit</button>
        </form>
      </div>
      <ListOfTodo taskList={taskList}/>
    </div>
  );
}

export default App;
