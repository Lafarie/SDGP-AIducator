import React, { useEffect, useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './todo.css';
import Navbar from './component/Navbar';

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
    const [selectedDate, setSelectedDate] = useState(''); //selected date on the calendar
    const calendarRef = useRef(null); //reference to the calendar instance

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

        const newTask = {
            name: taskName,
            date: taskDate,
            completed: false,
        };

        setTasks([...tasks, newTask]);

        setTaskName('');
        setTaskDate('');
        setTaskTime('');
    };


        // const newEvent = {
        //     title: taskName,
        //     start: taskDate + 'T' + taskTime,
        //     end: taskDate + 'T' + taskTime,
        //     rendering: 'background',
        //     color: 'red',
        // };

        // setEvents([...events, newEvent]);

        //  const newTask = {
        //     name: taskName,
        //     completed: false,
        //  };

        //  setTasks([...tasks, newTask]);

        // setTaskName('');
        // setTaskDate('');
        // setTaskTime('');
    // };

    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);
    };

    const renderTasksForSelectedDate = () => {
        const filteredTasks = tasks.filter(task => task.date === selectedDate);

        if (filteredTasks.length > 0) {
            return (
                <div>
                    <div>
                        <p>TO-DO LIST - {selectedDate}</p>
                    </div>
                    {filteredTasks.map((task, index) => (
                        <p key={index}>{task.name}</p>
                        ))}
                    </div>
                );
            } else {
                return (
                    <div>
                        <div>
                            <p>No Tasks for {selectedDate}</p>
                        </div>
                    </div>
                );
            }
    };



    useEffect (() => {
    //trigger click event on the calendar to highlight the newly added event
        if (calendarRef.current && taskDate && taskTime) {
            const newEvent = {
                title: taskName,
                start: taskDate + 'T' + taskTime,
                end: taskDate + 'T' + taskTime,
                rendering: 'background',
                color: 'red',
            };
            calendarRef.current.getApi().addEvent(newEvent);
        }
    }, [events]);

    // const handleTaskCheckBoxChange = (index) => {
    //     const updatedTasks = [...tasks];
    //     updatedTasks[index].completed = !updatedTasks[index].completed;
    //     setTasks(updatedTasks);
    // }

    return (
        <body className="ToDo">
        <Navbar />    
        <div >
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
                {selectedDate && renderTasksForSelectedDate()}
            </div>

        </div>
        </body>
    );
}

export default ToDo;
