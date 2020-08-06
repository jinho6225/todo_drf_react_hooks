import React, { useState, useEffect }  from 'react';
import './App.css';



function App() {

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
          <li className="task-list">
            <span className="content ">E-commerce web app</span>
            <span className="icon">
              <i className="far fa-edit" aria-hidden="true"></i>
              <i className="far fa-trash-alt" aria-hidden="true"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
