import {useRef, useState} from 'react';
import './AIAssistant.css';
import sendIcon from './Images/sendicon.svg'
import good from './Images/thumbsup.svg'
import bad from './Images/thumbsdown.svg'

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

    function handlePrompt(){
        let promptObj = {
            prompt: prompt.current.value
        }
        fetch("/api/get/prompt", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(promptObj)
        }).then((response) => response.json()).then((data) => {
            document.getElementById("response").style.fontSize = "16px";
            document.getElementById("response").innerHTML = data.generated_result
            settextBox(false);
            clearInterval(responseInt);
        });
    }
    
    return(
      <div id={"AIAssistant"}>
        <div id={"Assistant"} className={'frames'}>
            <div id={"assistentFrame"}>
                <input autoFocus type='text' onKeyDownCapture={(e) => {
                    if(e.key === 'Enter'){
                        document.getElementById("response").style.fontSize = "20px";
                        document.getElementById("response").innerHTML = "Wait a moment";
                        untilRespond(document.getElementById("response"));
                        settextBox(true);
                        handlePrompt();
                    }
                }} id={'prompt'} placeholder='Enter question here...' ref={prompt} disabled={textbox}/>
                <div id={'generate'} className='button'><img src={sendIcon} alt='prompt send icon' onClick={() => {
                    document.getElementById("response").style.fontSize = "20px";
                    document.getElementById("response").innerHTML = "Wait a moment";
                    untilRespond(document.getElementById("response"));
                    settextBox(true);
                    handlePrompt(); // getting value of prompt when send button is pressed. 
                }}/></div>
            </div>
            <div id={'response'}><p style={{textAlign: "center", lineHeight: "200%", fontSize: "20px"}}>Hello there!<br/>I am AIducator an AI assistant here to assist you in your educational journey.
            <br/><br/>I can answer any educational question you have.<br/>All you gotta do is ask me :D.</p></div> 
            <div id={'rating'}>
                <div id={'good'} className='button'><img src={good} alt='prompt send icon'/></div>
                <div id={'bad'} className='button'><img src={bad} alt='prompt send icon'/></div>
            </div>
        </div>
        <div id={"models"} className={'frames'}>
            <h1>3D models</h1>
        </div>
      </div>
    )
}

export default Assistant;

