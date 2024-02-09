import {useEffect, useRef, useState} from 'react';
import './AIAssistant.css';
import sendIcon from './Images/sendicon.svg'
import good from './Images/thumbsup.svg'
import bad from './Images/thumbsdown.svg'
// import save from './Images/bookmark.svg'

var responseInt = 0;

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
    const [saved, setsaved] = useState(false);
    const [rating, setrating] = useState("");
    const [responseID, setresponseID] = useState("")
    const [allresponses, setallresponses] = useState(null);
    const [displayID, setdisplayID] = useState("");

    useEffect(() => { // settign the look of the rate ebutton
        let bad = document.getElementById("bad");
        let good = document.getElementById("good");
        if(rating === 'good'){
            good.style.border = "solid 2px white";
            bad.style.border = "none";
        } else if (rating === "bad") {
            bad.style.border = "solid 2px white";
            good.style.border = "none";
        } else {
            bad.style.border = "none";
            good.style.border = "none";
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
            setallresponses(data.responseArray.map((response) => (
                <div key={response.id} id={response.id} value={response.id} className='savedResponseClass' onClick={()=> {
                        fetch("/api/post/displaySaved", {
                            method: "post",
                            headers: {"Content-Type":"application/json"},
                            body: JSON.stringify({selectedID : response.id})
                        }).then(response => response.json()).then(data => {
                            document.getElementById("response").innerHTML = data.message.replaceAll("*", "'")
                            document.getElementById("prompt").innerText = response.prompt;
                        });
                        document.getElementById('save').style.display = "block";
                        setresponseID(response.id);
                        setdisplayID(response.id);
                        setsaved(true);
                }}>{response.prompt}</div>
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


    function handlePrompt(){
        let promptObj = {
            prompt: prompt.current.value
        }
        fetch("/api/post/prompt", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(promptObj)
        }).then((response) => response.json()).then((data) => {
            document.getElementById("response").style.fontSize = "16px";
            document.getElementById("response").innerHTML = data.generated_result;
            setresponse(true);
            settextBox(false);
            clearInterval(responseInt);
        });
    }

    return(
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
                    if(e.key === 'Enter'){
                        document.getElementById("response").style.fontSize = "20px";
                        document.getElementById("response").innerHTML = "Wait a moment";
                        untilRespond(document.getElementById("response"));
                        setresponse(false)
                        settextBox(true);
                        setsaved(false)
                        handlePrompt();
                    }
                }} id={'prompt'} placeholder='Enter question here...' ref={prompt} disabled={textbox}/>
                <div id={'generate'} className='button'><img src={sendIcon} alt='prompt send icon' onClick={() => {
                    document.getElementById("response").style.fontSize = "20px";
                    document.getElementById("response").innerHTML = "Wait a moment";
                    untilRespond(document.getElementById("response"));
                    setresponse(false)
                    setsaved(false)
                    settextBox(true);
                    handlePrompt(); // getting value of prompt when send button is pressed. 
                }}/></div>
            </div>
            <div id={'response'}><p style={{textAlign: "center", lineHeight: "200%", fontSize: "20px"}}>Hello there!<br/>I am AIducator an AI assistant here to assist you in your educational journey.
            <br/><br/>I can answer any educational question you have.<br/>All you gotta do is ask me :D.</p></div> 
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
                <div id={'good'} className='button'><img src={good} alt='prompt rate good icon' onClick={() => {
                    if(rating === "good"){
                        setrating("")
                    }else{
                        setrating("good")
                    }
                }}/></div>
                <div id={'bad'} className='button'><img src={bad} alt='prompt rate bad icon' onClick={() => {
                    if(rating === "bad"){
                        setrating("")
                    }else{
                        setrating("bad")
                    }
                }}/></div>
            </div>
        </div>
        <div id={"models"} className={'frames'}>
            <h1>3D models</h1>
        </div>
      </div>
    )
}

export default Assistant;

