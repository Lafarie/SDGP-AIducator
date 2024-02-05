import { useEffect, useRef } from 'react';
import './AIAssistant.css';
import sendIcon from '../Images/sendicon.svg'
import good from '../Images/thumbsup.svg'
import bad from '../Images/thumbsdown.svg'

function Assistant(){
    let prompt = useRef();

    function handlePrompt(){
        let promptObj = {
            prompt: prompt.current.value
        }
        fetch("/api/get/prompt", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(promptObj)
        }).then((response) => response.json()).then((data) => {document.getElementById("response").innerHTML = data.generated_result});
    }
    return(
      <div id={"AIAssistant"}>
        <div id={"Assistant"} className={'frames'}>
            <div id={"assistentFrame"}>
                <input type='text' onKeyDownCapture={(e) => {
                    if(e.key === 'Enter'){
                        document.getElementById("response").innerHTML = "Wait a moment...";
                        handlePrompt(); // getting value of prompt when enter is pressed
                    }
                }} id={'prompt'} placeholder='Enter question here...' ref={prompt} />
                <div id={'generate'} className='button'><img src={sendIcon} alt='prompt send icon' onClick={() => {
                    document.getElementById("response").innerHTML = "Wait a moment...";
                    handlePrompt(); // getting value of prompt when send button is pressed. 
                }}/></div>
            </div>
            <div id={'response'}><p style={{textAlign: "center", lineHeight: "200%"}}>Hello there!<br/>I am AIducator an AI assistant here to assist you in your educational journey.
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

