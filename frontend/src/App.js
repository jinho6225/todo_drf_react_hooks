import React, { useState, useEffect }  from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/task-list")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  },[]);

  return (
    <div className="container">
      <header className="header">
        <h2>Todo List</h2>
        <h4>(Django RESTful api + React hooks)</h4>
      </header>
      <div className="inputBox">
        <form method="POST" className="inputForm">
          <input type="text" placeholder="Add task" className="inputField" name="title" />
          <button type="submit" className="submitBtn">Submit</button>
        </form>
      </div>
      <div className="list-container">
        <ul className="unorder-list">
          {tasks.map((task) => {
            return (
              <li className="task-list" key={task.id}>
                <span className="content ">{task.title}</span>
                <span className="icon">
                  <i className="far fa-edit" aria-hidden="true"></i>
                  <i className="far fa-trash-alt" aria-hidden="true"></i>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
