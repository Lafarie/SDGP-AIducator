import React, { useEffect, useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './todo.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';

const MyCalendar = ({ events, onDateClick }) => {
    return (
        // styles for the calendar
        <div style={{ width: '790px', height: '275px', borderRadius: '20px', overflow: 'hidden', color: 'white'}}>   
            <FullCalendar 
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                className='calendar'
                events={events}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                style={{width: '100%', height: '100%'}}
                aspectRatio={3.9}      //aspect ratio used to set the height of the dates   
                eventClick={onDateClick} 
                key={JSON.stringify(events)}
            />   
        </div>
    );
}

const ToDo = ({}) => {
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime,  setTaskTime] = useState('');
    const [events, setEvents] = useState([]);
    const [tasks, setTasks] = useState([]);
    
    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleTaskDateChange = (e) => {
        setTaskDate(e.target.value);
    };

    const handleTaskTimeChange = (e) => {
        setTaskTime(e.target.value);
    };

    const handleCreateTask = (e) => {
        e.preventDefault();

        const startDate = new Date(taskDate + 'T' + taskTime);
        const endDate = new Date(taskDate + 'T' + taskTime);

        const newEvent = {
            title: taskName,
            start: startDate,
            end: endDate,
            rendering: 'background',
            color: 'red',
        };

        setEvents([...events, newEvent]);

        setTaskName('');
        setTaskDate('');
        setTaskTime('');

        const newTask = {
            name: taskName,
            date: taskDate,
        };

        setTasks([...tasks, newTask]);
    };

    return (
        <div className="ToDo">
        <Navbar />    
        <div className="layout">
            <div className="container">
                <div className="calendarArea">
                    <MyCalendar events={events} />
                </div>

                <div className="form">
                    <h2>Create Task</h2>
                    <form onSubmit={handleCreateTask}>
                        <div>
                            <label htmlFor="name" className="taskLabel">Name : </label><br/>
                            <input type='text' value={taskName} onChange={handleTaskNameChange} required/>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="date" className="taskLabel">Date : </label><br/>
                            <input type='date' value={taskDate} onChange={handleTaskDateChange} required/>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="time" className="taskLabel">Time : </label><br/>
                            <input type='time' value={taskTime} onChange={handleTaskTimeChange}  required/>
                        </div>

                        <div>
                            <button type='submit'>Create</button>
                        </div>
                    </form>
                </div>
            </div>
                <div className="taskContainer">
                    <p className="topic">TO-DO LIST</p>
                    <br />
                        {tasks.map((task, index) => (
                            <div key={index} className="checkboxContainer">
                                <input type="checkbox"/>
                                <label >{task.name} ~ {task.date}</label>                                
                            </div>
                        ))}
                </div>
            
        </div>
        <Footer />
        </div>
    );
}


export default ToDo;
