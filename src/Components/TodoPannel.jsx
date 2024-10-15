"use client"
import React, { useState } from 'react'
import "./todoPannel.css"
import { VscChromeClose } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";

const TodoPannel = () => {
  const [title, settitle] = useState("");  
  const [date, setdate] = useState("");   
  const [mainTask, setmainTask] = useState([]); 

  //All states for update feature tasks
  const [singleTask, setSingleTask] = useState({});
  const [editbt, seteditbt] = useState(false);
  const [tempObject, setTempObject] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      date,
      id: `${new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)}${Math.floor(Math.random() * 1000)}`
    };

    setSingleTask(newTask);
    setmainTask(prevTasks => [...prevTasks, newTask]); // Add the new task to mainTask(inline callback)

    
    setdate("");
    settitle("");
  };

  
  const editTask = (task, id) => {
    const updatedTasks = mainTask.map((task) => {
      if (task.id === id) {
        return { ...task, title: title, date: date }; 
      }
      return task;
    });

    setmainTask(updatedTasks);  

    setdate("");
    settitle("");
    setTempObject({});
    seteditbt(false);
  };

  const updateData = (id) => {
    const object = mainTask.find((t) => t.id === id);

    if (object) {
      setTempObject(object);  
      settitle(object.title);  
      setdate(object.date);
    }
  };

  const handleEdit = (id) => {
    seteditbt(true);  
    updateData(id);   
  };

 
  let renderTask = <li><h3>No Task Available</h3></li>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={t.id}> 
          <h5>{t.title}</h5>
          <h6>{t.date}</h6>
          <div className="btns">
            <button title='Edit Task' onClick={() => handleEdit(t.id)}>
              <FaEdit />
            </button>
            <button onClick={() => deleteHandler(i)} title='Delete Task'>
              <VscChromeClose />
            </button>
          </div>
        </li>
      );
    });
  }

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setmainTask(copyTask);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="todoPannel main">
        <div className="container">
          <div className='form'>
            <div className="input-area">
              
              <input type="text" placeholder='Enter Task Here' value={title} onChange={(e) => settitle(e.target.value)} />
              <input type="date" placeholder='Task Description' value={date} onChange={(e) => setdate(e.target.value)} />
            </div>

           
            {
              editbt ? <button onClick={() => editTask(tempObject, tempObject.id)}><span>Edit Task</span></button>
                : <button onClick={submitHandler}><span>Add Task</span></button>
            }
          </div>

         
          <div className='taskOvr'>
            <div className="tskHead">
              <h2>Task Overview</h2>
            </div>
            <div className="tasksPannel">
              <p>Task Title</p>
              <p>Date</p>
              <p>Delete</p>
            </div>
            <ul className="tskList">
              {renderTask}
            </ul>
            <button onClick={handleReload}>Delete All</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPannel;
