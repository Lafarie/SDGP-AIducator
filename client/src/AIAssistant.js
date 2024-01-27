import './AIAssistant.css';
import sendIcon from './Images/sendicon.svg'

function Assistant(){
    return(
      <div id={"AIAssistant"}>
        <div id={"Assistant"} className={'frames'}>
            <div id={"assistentFrame"}>
                <input type='text' id={'prompt'} placeholder='Enter question here...'/>
                <div id={'generate'}><img src={sendIcon} alt='prompt send icon'/></div>
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

