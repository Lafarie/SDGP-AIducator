import "./SIgnUp.css";
import { useEffect, useState } from "react";
import hide from "./Images/eye-password-hide.svg";
import show from "./Images/eye-password-show.svg";
import googleIcon from "./Images/GoogleIcon.svg";
import appleIcon from "./Images/AppleIcon.svg";
import logo from "./Images/BigLogo.png";

// add icons to sign in with ... buttons
// add required to all feilds
// style sign in with ... buttons 
// make left panel 
// style check box 
// add button click styles. 

function SignUp(){
    useEffect(() => {
        document.body.id = "SignUpBody";
        // Clean up function to remove styles on unmount (optional)
        return () => {
            document.body.id = null;
        };
      }, []);

      const [showPass, setShowPass] = useState(false)

    return(
        <div id="signUp">
            <div id="formDiv" className="panel">
                <form>
                    <h1 style={{"color": "#003366"}} className="panelItem">Create an Account</h1>
                    <div id="nameDiv" className="textBoxDiv panelItem">
                        <input type="text" placeholder="First Name" autoFocus required/>
                        <input type="text" placeholder="Last Name" required/>
                        
                    </div>
                    <div id="mailDiv" className="textBoxDiv panelItem">
                        <input type="text" placeholder="Email Address" required/>
                    </div>
                    <div id="passDiv" className="textBoxDiv panelItem">
                        <input id="passwordtxt" type={showPass?"text":"password"} required placeholder="Your Password"/>
                        <img src={showPass?show:hide} onClick={() => {
                            setShowPass(!showPass);
                        }}/>
                    </div>
                    <button id="CreateAccount" className="panelItem CreateBtn">
                        Create Account
                    </button>
                    <div>
                        <input type="checkbox" id="terms" required/>
                        <label htmlFor="terms">By submitting the form, you agree to our Terms and Conditions</label>
                    </div>
                    <div id="divider">
                        <div>
                            <hr/>
                        </div>
                        <p>or</p>
                        <div>
                            <hr/>
                        </div>
                    </div>
                    <div id="googlebtn" className="panelItem SignUpBtns signinbtn">
                        <img src={googleIcon}/>
                        <p>Sign in with Google</p>
                    </div>
                    <div id="applebtn" className="SignUpBtns signinbtn">
                        <img src={appleIcon}/>
                        <p>Sign in with Apple</p>
                    </div>
                </form>
                
            </div>  
            <div id="rightdiv" className="panel">
                <img src={logo}/>
                <h1>AIducator</h1>
                <p>“Make your learning Easier”</p>
            </div>  
        </div>
    )
}

export default SignUp;