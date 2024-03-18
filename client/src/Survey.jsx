import { Fragment, useEffect, useRef, useState } from "react";
import './Survey.css';
import getCurrentUser from "./currentUser";
import app from "./firebase";

import { getDatabase, ref, get, set, orderByChild, equalTo, query, onValue} from "firebase/database";
import { useNavigate } from "react-router-dom";

export function StudentSurvey(){

    const [CuserId, setCuserId] = useState("");
    // const [dbuser, setdbuser] = useState(null);

    let toHome = useNavigate();

    useEffect(() => {
        getCurrentUser().then((user) => {
            if(user){
                setCuserId(user.uid);
            }
        })
    }, [])

    useEffect(() => {
        document.body.id = "AccountBody";
        // Clean up function to remove styles on unmount (optional)
        return () => {
            document.body.id = null;
        };
      }, []);

    const [math, setmath] = useState(false);
    const [geography, setgeography] = useState(false);
    const [science, setscience] = useState(false);
    const [geometry, setgeometry] = useState(false);
    const [astronomy, setastronomy] = useState(false);
    const [geology, setgeology] = useState(false);
    const [chemical, setchemical] = useState(false);
    const [FlFa, setFlFa] = useState(false);

    const [usergrade, setusergrade] = useState("default");

    let interestArr = [
        {name: "Math", setFunc: () => {setmath(!math)}, state: math},
        {name: "Geography", setFunc: () => {setgeography(!geography)}, state: geography}, 
        {name: "Science", setFunc: () => {setscience(!science)}, state: science}, 
        {name: "Geometry", setFunc: () => {setgeometry(!geometry)}, state: geometry},  
        {name: "Astronomy", setFunc: () => {setastronomy(!astronomy)}, state: astronomy}, 
        {name: "Geology", setFunc: () => {setgeology(!geology)}, state: geology}, 
        {name: "Chemical", setFunc: () => {setchemical(!chemical)}, state: chemical},
        {name: "Flora and Funa", setFunc: () => {setFlFa(!FlFa)}, state: FlFa}
    ]

    let Grade = useRef();

    useEffect(() => {
        if(usergrade === "default" && !geography ){
            document.getElementById("finish").disabled = true;
        } else {
            if(!math && !geography && !science && !geometry && !astronomy && !geology && !chemical && !FlFa){
                document.getElementById("finish").disabled = true;
            } else {
                document.getElementById("finish").disabled = false;
            }
        }
    }, [usergrade, geography, math, science, geometry, astronomy, geology, chemical, FlFa])

    function getDetails(){
        let database = getDatabase(app)

        let userIntrestArr = [];

        interestArr.forEach((element) => {
            if(element.state){
                userIntrestArr.push(element.name);
            }
        })

        const userRef = ref(database, 'users/' + CuserId);

        onValue(userRef, (user) => {
            if(Grade.current !== null){
                let data = user.val();
                data.grade = Grade.current.value; 
                data.interests = userIntrestArr;

                set(userRef, data);
            }
        })

        toHome('/home');


    }

    return (
        <div id="SurveyBody">
        <div id="contentContainerSurvey">
            <div id="SurveyTitle">
                <h1>Personalize your experience</h1>
                <h2>Tell us more about yourself</h2>
            </div>
        <div id="SurveyContainer">
            <div>
            <div>
                <h2 className="h2heading">Grade</h2>
                <select id="gradeSelect" defaultValue="default" ref={Grade} onChange={() => {
                    setusergrade(Grade.current.value);
                }}>
                    <option disabled value="default">Select the level you study in</option>
                    <option value="grade8" id="Grade8option">Grade 8</option>
                    <option value="grade9">Grade 9</option>
                </select>
            </div>
            <div className="headingClass">
                <h2 className="h2heading">Your interests</h2>
                <p className="h2p">Please select what tags define your interests best</p>
            </div>
            <div id="InterestContainer"><div className="InterestsBox">
                {interestArr.map((element, id) => (
                    <Fragment key={id}>
                        <input type="checkbox" name={element.name} id={element.name + "input"} onChange={() => {
                            if(element.state){
                                document.getElementById(element.name + "label").style.backgroundColor = "#003366";
                                document.getElementById(element.name + "label").style.color = "white";
                            } else {
                                document.getElementById(element.name + "label").style.backgroundColor = "white";
                                document.getElementById(element.name + "label").style.color = "black";
                            }
                        }}style={{display: "none"}}/>
                        <label className="intrestLabel" htmlFor={element.name + "input"} id={element.name + "label"} onClick={element.setFunc}>{element.name}</label>
                    </Fragment>         
                ))}
                </div>
            </div>
            <div id="finishbutton">
                    <button type="submit" id="finish" onClick={() => {
                        getDetails();
                    }}>
                        Finish
                    </button>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export function EducatorSurvey(){

    return (
        <div>
            <div>
            <h1>Personalize your experience</h1>
            <h2>Tell us more about yourself</h2>
            </div>
            <div>
                <h2>Grade</h2>
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
    )
}

