"use client"
import React, { useState } from 'react'
import "./todoPannel.css"
import { VscChromeClose } from "react-icons/vsc";
const TodoPannel = () => {
    const [title,settitle] = useState("");
    const [date, setdate] = useState("");
    const [mainTask,setmainTask] = useState([]);
    const submitHandler = (e) => {
        e.preventDefault() 
        setmainTask([...mainTask,{title,date}]);  //CANT BE PRESENT IN SUGGESTION (CONTROL FORM AUTO SUBMIT )
        setdate("");
        settitle("");
    }

    let renderTask=<li><h3>No Task Available</h3></li>;
    if (mainTask.length >0){
      renderTask = mainTask.map((t,i)=>{
        return (
          <li  key={i}>
            <h5>{t.title}</h5>
            <h6>{t.date}</h6>
            <button onClick={()=>{deleteHandler(i)}}><VscChromeClose /></button>
          </li>
        )
      })
    }
    const deleteHandler=(i)=>{
      let copyTask= [...mainTask];
      copyTask.splice(i,1);
      setmainTask(copyTask);
    }
  return (
    <>
      <div className="todoPannel main" >
        <div className="container">
            <form onSubmit={submitHandler} >
                <div className="input-area">
                <input type="text" placeholder='Enter Task Here' value={title} onChange={(e)=>{settitle(e.target.value)}} />
                <input type="date" placeholder='Task Description' vanlue={date} onChange={(e)=>{setdate(e.target.value)}}/>
                </div>
                <button><span>Add Task</span></button>
            </form>
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
            </div>
        </div>
      </div>
    </>
  )
}

export default TodoPannel
