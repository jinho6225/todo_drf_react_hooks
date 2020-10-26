import React from 'react';

type ListofTodoProps = {
    taskList: any;
    deleteTodo: (id: string | number) => void;
  };


const ListOfTodo = ({ taskList, deleteTodo }: ListofTodoProps) => {
    console.log(taskList, 'taskList')
    return (
      <div className="list-container">
        <ul className="unorder-list">

            {taskList && taskList.length > 0 ? (
                taskList.map((task: any) => {
                    const {id, title, completed} = task;
                    // let className = `content`;
                    // if (task.completed) className = `content active`
                        return (
                            <li className="task-list" key={id}>
                                <span 
                                    className={`content ${completed ? 'active' : ''}`}
                                    onClick={() => {
                                        // lineThrough(task)
                                    }}
                                >{title}</span>
                                <span className="icon">
                                    <i 
                                        className="far fa-edit" 
                                        aria-hidden="true"
                                        onClick={() => {
                                            // currentUpdate(id, title)
                                        }}
                                        ></i>
                                    <i 
                                        className="far fa-trash-alt" 
                                        aria-hidden="true"
                                        onClick={() => {
                                            deleteTodo(id)
                                        }}
                                        ></i>
                                </span>
                            </li>
                    )})
                ) : (
                    <li className="task-list" >
                        <span className="content ">No List now, Enter your todo list</span>
                        <span className="icon">
                            <i className="far fa-edit" aria-hidden="true"></i>
                            <i className="far fa-trash-alt" aria-hidden="true"></i>
                        </span>
                    </li>
            )}
        </ul>
        </div>
    )
}



export default ListOfTodo;