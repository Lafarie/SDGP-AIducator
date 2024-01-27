import { useRef } from 'react';
import './AIAssistant.css';
import sendIcon from './Images/sendicon.svg'

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
                <div id={'generate'}><img src={sendIcon} alt='prompt send icon' onClick={() => {
                    document.getElementById("response").innerHTML = "Wait a moment...";
                    handlePrompt(); // getting value of prompt when send button is pressed. 
                }}/></div>
            </div>
            <div id={'response'}><p>Hello there</p></div>
            
        </div>
        <div id={"models"} className={'frames'}>
            <input type='text' id={'prompt2'}/>
        </div>
      </div>
    )
}

export default Assistant;

