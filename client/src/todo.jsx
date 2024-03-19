import React, { useState } from "react";
import './todo.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const MyCalendar = ({ events }) => {
    return (
        <div style={{ width: '948px', height: '437px', borderRadius: '20px', overflow: 'hidden'}}>
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
                aspectRatio={2.58}            
            />   
        </div>
    );
}

const ToDo = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime,  setTaskTime] = useState('');
    const [events, setEvents] = useState([]);

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

        const newEvent = {
            title: taskName,
            start: taskDate + 'T' + taskTime
        };

        console.log('New Event: ', newEvent);

        setEvents([...events, newEvent]);

        setTaskName('');
        setTaskDate('');
        setTaskTime('');
    };
    
    return (
        <div >
            <div className="container">
                <div className="calendarArea">
                {/* <div className="Todo"> */}
                    <MyCalendar events={events} />
                </div>


                <div className="form">
                    <h2>Create Task</h2>
                    <form onSubmit={handleCreateTask}>
                        <div>
                            <label htmlFor="name" className="taskLabel">Name : </label><br/>
                            <input type='text' value={taskName} onChange={handleTaskNameChange} required/>
                        </div>
                    
                        <div>
                            <label htmlFor="date" className="taskLabel">Date : </label><br/>
                            <input type='date' value={taskDate} onChange={handleTaskDateChange} required/>
                        </div>
                    
                        <div>
                            <label htmlFor="time" className="taskLabel">Time : </label><br/>
                            <input type='time' value={taskTime} onChange={handleTaskTimeChange}  required/>
                        </div>


                        {/* const Toggle = () => {
                            const [isChecked, setIsChecked] = useState(false);

                            const handleSwitch =  () => {
                                setIsChecked(!isChecked);
                        };

                        return (
                                <div className="switch">
                                    <input 
                                    type="checkbox" 
                                    className="toggleContainer" 
                                    id="toggle" checked= {isChecked} 
                                    onChange={handleSwitch}
                                    />


                                <label htmlFor="">Remind Me </label>
                                    <div  className="switch">
                                    <input type="checkbox" name=""/>
                                    <span className="toggle round"></span>
                                    </div>
                                </div>  
                            );
                        }; */}

                        


                        <br/>
                        <div>
                        <button type='submit'>Create</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="taskContainer">
                
            </div>

        </div>
    );
}

export default ToDo;
