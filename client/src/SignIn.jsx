import app from "./firebase";
import { getAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { useRef } from "react";
import { useEffect, useState } from "react";
import "./SignIn.css";
import hide from "./Images/eye-password-hide.svg";
import show from "./Images/eye-password-show.svg";
import googleIcon from "./Images/GoogleIcon.svg";
import { useNavigate } from "react-router-dom";

const database = getAuth(app);

function SignIn() {

    let email = useRef();
    let password = useRef();

    let history = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [emailStr, setemailStr] = useState("");
    const [passStr, setpassstr] = useState("");

    useEffect(() => {
        if(emailStr !== "" && passStr !== ""){
            document.getElementById("SignInBtn").disabled = false;
        } else {
            document.getElementById("SignInBtn").disabled = true;
        }
    }, [emailStr, passStr])


    function getDetails(e) {
        e.preventDefault();
        console.log(email.current.value, password.current.value);
        signInWithEmailAndPassword(database, email.current.value, password.current.value)
        .then((data) => {
          console.log(data, "authData");
          let emailP = document.getElementById("Alerts");
          emailP.style.display = "none";
          history("/home");
        })
        .catch((err) => {
        //   alert(err.code);
        let emailP = document.getElementById("Alerts");
        
        if(err.code === "auth/invalid-credential") {
            emailP.innerHTML = "You have entered a incorrect email or password.";
        } else if (err.code === "auth/invalid-email"){
            emailP.innerHTML = "You have entered an invalid email";
        } else {
            emailP.innerHTML = (err.code).split("/")[1].replaceAll("-", " ");
        }
        emailP.style.color = "RED";
        emailP.style.display = "block";

        });;
    }

    useEffect(() => {
        document.body.id = "AccountBody";
        // Clean up function to remove styles on unmount (optional)
        return () => {
            document.body.id = null;
        };
      }, []);

    return (
        <div id="signUp">
            <div id="SignInContainer">
            <h1>Sign In</h1>
            <form>
                <div className="form-group textBoxDiv signInMailDiv">
                    <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required ref={email}
                    onChange={() => {
                        setemailStr(email.current.value);
                    }}/>
                </div>
                <div id="passDiv" className="form-group textBoxDiv signInPassDiv">
                        <input id="passwordtxt" type={showPass?"text":"password"} ref={password} required placeholder="Your Password" autoComplete="new-password"
                        onChange={() => {
                            setpassstr(password.current.value);
                        }}/>
                        <div id="passIconDiv">
                        <img src={showPass?show:hide} onClick={() => {
                            setShowPass(!showPass);
                        }} alt="PasIcon"/>
                        </div>
                </div>
                    <p id="Alerts"></p>
                <button type="submit" id="SignInBtn" className="signInbtn" onClick={getDetails}>Sign In</button>
                <div id="googlebtnSignin" className="panelItem SignUpBtns signinbtn">
                    <div className="googleImgContainer">
                        <img src={googleIcon} alt="googleIcon"/>
                    </div>
                    <p>Sign in with Google</p>
                </div>
            </form>
            
            </div>
        </div>
    )
}

export default SignIn;