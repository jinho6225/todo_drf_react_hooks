import React, { useState, useEffect } from 'react';


const UpdateTask = ({ currentTodo, updateTodo }) => {
    const [todo, setTodo] = useState(currentTodo)

    //edit 상황에서 다른 항목을 누르면 form에 다른 title이 업데이트 된다
    useEffect(() => {
        setTodo(currentTodo)
      }, [currentTodo])

    const handleChange = e => {
        const { name, value } = e.target;
        setTodo({...todo, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (!todo.title) return
   
        updateTodo(todo)
        const initialFormState = { title: '' }
        setTodo(initialFormState)
    }
    
    return (
        <div className="inputBox">
            <form method="PUT" className="inputForm">
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
                Update</button>
            </form>
        </div>
    )
}



export default UpdateTask;