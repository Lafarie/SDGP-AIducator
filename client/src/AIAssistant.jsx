import {useEffect, useRef, useState} from 'react';
import './AIAssistant.css';
import Navbar from './component/Navbar';
import sendIcon from './Images/sendicon.svg'
import good from './Images/good.svg';
import bad from './Images/bad.svg';
import goodfill from './Images/goodfilled.svg';
import badfill from './Images/badfilled.svg';

var responseInt = 0;

// white response generates cannot view saved responses. (implement)

function untilRespond(element){
    let msg = "Wait a moment";
    responseInt = setInterval(()=>{
        if(msg.substring(msg.length-3) !== "..."){
            element.innerHTML = (msg += ".");
        } else {
            msg = msg.substring(0, msg.length - 3)
            element.innerHTML = (msg += ".");
        }
        }, 1000);
}


function Assistant(){
    let prompt = useRef();

    const [textbox, settextBox] = useState(false);
    const [response, setresponse] = useState(false);
    const [generateButton, setgenerateButton] = useState(true); // enabling and disabling generate button
    const [savedResponsedisable, setsavedResponsedisable] = useState(false); // enabling and disabling the function of veiwing saved responses. 
    const [saved, setsaved] = useState(false);
    const [rating, setrating] = useState("");
    const [responseID, setresponseID] = useState("")
    const [allresponses, setallresponses] = useState(null);
    const [displayID, setdisplayID] = useState("");

    useEffect(() => { // settign the look of the rate ebutton
        let badbtn = document.getElementById("bad");
        let goodbtn = document.getElementById("good");
        if(rating === 'good'){
            goodbtn.src = goodfill;
            badbtn.src = bad;
        } else if (rating === "bad") {
            badbtn.src = badfill;
            goodbtn.src = good;
        } else {
            goodbtn.src = good;
            badbtn.src = bad;
        }
    }, [rating])

    useEffect(() => {
        document.querySelectorAll(".savedResponseClass").forEach((element) => {
            if(element != null){
                if(displayID == element.id){
                    element.className += " selectedResponse";
                    console.log(element.id)
                } else {
                    element.className = "savedResponseClass"
                }
            }
        })
    }, [displayID])

    useEffect(() => {
        fetch("/api/get/responses").then(response => response.json()).then((data) => {
            setallresponses(data.responseArray.map((savedresponse) => (
                <div key={savedresponse.id} id={savedresponse.id} value={savedresponse.id} className='savedResponseClass' onClick={()=> {
                            fetch("/api/post/displaySaved", { // getting saved response from db
                                method: "post",
                                headers: {"Content-Type":"application/json"},
                                body: JSON.stringify({selectedID : savedresponse.id})
                            }).then(response => response.json()).then(data => {
                                document.getElementById("response").innerHTML = data.message.replaceAll("*", "'")
                                document.getElementById("prompt").innerText = savedresponse.prompt;
                            });
                            document.getElementById('save').style.display = "block";
                            prompt.current.value = savedresponse.prompt;
                            setresponseID(savedresponse.id); // setting the current id to the id of the saved response
                            setdisplayID(savedresponse.id); // setting the id of the current saved response
                            setsaved(true);
                            setrating(savedresponse.promptrating);
                }}>{savedresponse.prompt}</div>
            )));
        });
    }, [saved])

    useEffect(() => { // to set the look of the save button
        let savebtn = document.getElementById('save');
        if(saved){
            savebtn.innerHTML = "Response Saved"
            savebtn.style.backgroundColor = "GREY"
        } else {
            savebtn.innerHTML = "Save Response"
            savebtn.style.backgroundColor = "#003366"
        }
    }, [saved])

    useEffect(() => {
        let savedresdisplay = document.getElementById("savedResponsesContainer");
        if(savedresdisplay !== null){
            if(savedResponsedisable){
                savedresdisplay.style.pointerEvents = "none";
            } else {
                savedresdisplay.style.pointerEvents = "all";
            }
        }
    }, [savedResponsedisable])

    useEffect(() => {
            document.getElementById("generate").disabled = generateButton;
    }, [generateButton])

    function handlePrompt(){
        let promptObj = {
            prompt: prompt.current.value
        };
        fetch("/api/post/prompt", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(promptObj)
        }).then((response) => response.json()).then((data) => {
            document.getElementById("response").style.fontSize = "16px";

            if(data.flagged){
                const items = data.generated_result; 
                const container = document.getElementById("response");
                const htmlContent = 
                `<h1>Your prompt has been flagged</h1>
                <p>AIducator has moderated your response for these reasons</p>
                <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
                `;  
                container.innerHTML = htmlContent; 
                setresponse(false);           
            } else {
                document.getElementById("response").innerHTML = data.generated_result;
                setresponse(true);
            }
            setsavedResponsedisable(false);
            setgenerateButton(false);
            settextBox(false);
            clearInterval(responseInt);
        });
    }

    function handleChange() {
        if(prompt.current.value === ""){
            setgenerateButton(true)
        } else {
            setgenerateButton(false)
        }
    }


    return(
    <>
    <Navbar></Navbar>
      <div id={"AIAssistant"}>
        <div id="savedResponsesContainer" className={'frames'}>
            <h2>Saved Responses</h2>
            <div>
                {allresponses}
            </div>
        </div>
        <div id={"Assistant"} className={'frames'}>
            <div id={"assistentFrame"}>
                <input autoFocus type='text' autoComplete='off' onKeyDownCapture={(e) => {
                    if(e.key === 'Enter' && !generateButton){
                        document.getElementById("response").style.fontSize = "20px";
                        document.getElementById("response").innerHTML = "Wait a moment";
                        untilRespond(document.getElementById("response"));
                        setdisplayID(""); // to deselect the current saved response prompt div
                        setresponse(false);
                        setgenerateButton(true);
                        setsavedResponsedisable(true);
                        settextBox(true);
                        setsaved(false)
                        handlePrompt();
                    }
                }} id={'prompt'} placeholder='Enter question here...' ref={prompt} disabled={textbox} onChange={handleChange}/>
                <input type='image' id={'generate'} className='button'onClick={() => {
                    document.getElementById("response").style.fontSize = "20px";
                    document.getElementById("response").innerHTML = "Wait a moment";
                    untilRespond(document.getElementById("response"));
                    setdisplayID(""); // to deselect the current saved response prompt div
                    setresponse(false);
                    setsaved(false);
                    setgenerateButton(true);
                    setsavedResponsedisable(true);
                    settextBox(true);
                    handlePrompt(); // getting value of prompt when send button is pressed. 
                }} src={sendIcon} alt='prompt send icon'/>
            </div>
            <div id={'response'}>
                <p style={{textAlign: "center", lineHeight: "200%", fontSize: "20px"}}>Hello there!<br/>I am AIducator an AI assistant here to assist you in your educational journey.
                <br/><br/>I can answer any educational question you have.<br/>All you gotta do is ask me :D.</p>
            </div> 
            <div id={'rating'}>
                <div id={'save'} className='button' style={response?{display: "block"}:{display:"none"}} onClick={() => {
                    if(!saved){
                        // save the prompt and then as the http request send the id then store it here for referencing.
                        let convoObj = {
                            prompt: prompt.current.value,
                            response: document.getElementById("response").innerHTML,
                            rating: rating
                        };
                        console.log(convoObj);
                        fetch("/api/post/save", {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(convoObj)
                        }).then(response => response.json()).then((data) => {setresponseID(data.id)})
                    }
                     else {
                            fetch("/api/post/unsave", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({"unsaveID" : responseID}) // in this case - remove latest record from db 
                            })
                    }
                    setsaved(!saved);
                }}>Save Response</div>
                <input type='image' id={'good'} className='button' src={good} alt='prompt rate good icon' onClick={() => {
                    if(rating === "good"){
                        setrating("")
                    }else{
                        setrating("good")
                    }
                }}/>
                <input type='image' id={'bad'} className='button' src={bad} alt='prompt rate bad icon' onClick={() => {
                    if(rating === "bad"){
                        setrating("")
                    }else{
                        setrating("bad")
                    }
                }}/>
            </div>
        </div>
        <div id={"models"} className={'frames'}>
            <h1>3D models</h1>
        </div>
      </div>
      </>
    )
}

export default Assistant;

