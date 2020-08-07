import React, { useState } from 'react';


const AddTask = ({ addTodo}) => {
    const initialFormState = {title: '', completed: false}
    const [todo, setTodo] = useState(initialFormState)

    const handleChange = e => {
        const { name, value } = e.target;
        setTodo({...todo, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!todo.title) return

        addTodo(todo)
        setTodo(initialFormState)
    }
    
    return (
        <div className="inputBox">
            <form method="POST" className="inputForm">
            <input 
                type="text" 
                placeholder="Add task" 
                className="inputField" 
                name="title" 
                value={todo.title} 
                onChange={handleChange} />
            <button 
                type="submit" 
                className="submitBtn" 
                onClick={handleSubmit}
                >
                Submit</button>
            </form>
        </div>
    )
}



export default AddTask;