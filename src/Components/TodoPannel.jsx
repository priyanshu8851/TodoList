"use client"
import React, { useState } from 'react'
import "./todoPannel.css"
import { VscChromeClose } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";

const TodoPannel = () => {
  const [title, settitle] = useState("");  // Controlled input for task title
  const [date, setdate] = useState("");    // Controlled input for task date
  const [singleTask, setSingleTask] = useState({});
  const [editbt, seteditbt] = useState(false);
  const [tempObject, setTempObject] = useState({});
  const [mainTask, setmainTask] = useState([]);  // Main task array

  // Handler for submitting a new task
  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      date,
      id: `${new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)}${Math.floor(Math.random() * 1000)}`
    };

    setSingleTask(newTask);
    setmainTask(prevTasks => [...prevTasks, newTask]); // Add the new task to mainTask

    // Reset form inputs
    setdate("");
    settitle("");
  };

  // Edit Task function
  const editTask = (task, id) => {
    const updatedTasks = mainTask.map((task) => {
      if (task.id === id) {
        return { ...task, title: title, date: date }; // Use updated title and date from the form
      }
      return task;
    });

    setmainTask(updatedTasks);  // Update the task list with edited tasks

    // Reset form and editing state
    setdate("");
    settitle("");
    setTempObject({});
    seteditbt(false);
  };

  // Fetch and set the task to be edited
  const updateData = (id) => {
    const object = mainTask.find((t) => t.id === id);

    if (object) {
      setTempObject(object);   // Set temp object for reference
      settitle(object.title);  // Populate form fields for editing
      setdate(object.date);
    }
  };

  // Handle click to start editing a task
  const handleEdit = (id) => {
    seteditbt(true);  // Show edit button
    updateData(id);   // Update the form with task data
  };

  // Render tasks in the UI
  let renderTask = <li><h3>No Task Available</h3></li>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={t.id}> {/* Use t.id as key */}
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
              {/* Controlled Inputs */}
              <input type="text" placeholder='Enter Task Here' value={title} onChange={(e) => settitle(e.target.value)} />
              <input type="date" placeholder='Task Description' value={date} onChange={(e) => setdate(e.target.value)} />
            </div>

            {/* Show Edit Button if editing, else show Add Task Button */}
            {
              editbt ? <button onClick={() => editTask(tempObject, tempObject.id)}><span>Edit Task</span></button>
                : <button onClick={submitHandler}><span>Add Task</span></button>
            }
          </div>

          {/* Task Overview */}
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
