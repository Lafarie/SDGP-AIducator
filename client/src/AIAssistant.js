import './AIAssistant.css';

function Assistant(){
    return(
      <div id={"AIAssistant"}>
        <div id={"Assistant"} className={'frames'}>
            <input type='text' id={'prompt'}/>
            <button></button>
        </div>
        <div id={"models"} className={'frames'}>
            <input type='text' id={'prompt'}/>
        </div>
      </div>
    )
}

export default Assistant;

