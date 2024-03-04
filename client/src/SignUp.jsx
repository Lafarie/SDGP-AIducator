import "./SIgnUp.css";
import { useEffect, useRef, useState } from "react";
import hide from "./Images/eye-password-hide.svg";
import show from "./Images/eye-password-show.svg";
import googleIcon from "./Images/GoogleIcon.svg";
import appleIcon from "./Images/AppleIcon.svg";
import logo from "./Images/BigLogo.png";
import app from "./firebase";
// import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

//create accoutn should only be active once all geilds are filled

function SignUp(){

    let firstName = useRef();
    let lastName = useRef();
    let email = useRef();
    let password = useRef();

    const UserRef = ref(database, 'users/');
    let userData = [];

    useEffect(() => { // loading userdata at initial render.
        onValue(UserRef, (user) => {
            userData = user.val();
        })
    })
    
    function getUserDetails(e){
        e.preventDefault();

        let userObj = {
            fname : (firstName.current.value).trim(),
            lname : (lastName.current.value).trim(),
            email: (email.current.value).trim(),
            password: password.current.value
        }

        let nameValid = true;
        let mailValid = true;

        onValue(UserRef, (user) => {
            userData = user.val();
        })

        let objectkeys = Object.keys(userData);
        console.log(objectkeys);
        
        for (let i = 0; i < objectkeys.length; i++){
            let name = userData[objectkeys[i]].fname + " " + userData[objectkeys[i]].lname;
            let nameAlert = document.getElementById("nameAlert");
            let emailAlert = document.getElementById("emailAlert");
            if(name.toLowerCase() === (firstName.current.value + " " + lastName.current.value).toLowerCase()) {
                nameAlert.innerHTML = "*Username already exists";
                nameAlert.style.color = "RED";
                nameAlert.style.display = "block";
                nameValid = false;
                break;
            } else {
                nameAlert.innerHTML = "*Username is available";
                nameAlert.style.color = "GREEN";
                nameAlert.style.display = "block"; 
            }

            if((userData[objectkeys[i]].email).toLowerCase() === (email.current.value.toLowerCase())){
                emailAlert.innerHTML = "*Account already exists";
                emailAlert.style.color = "RED";
                emailAlert.style.display = "block";
                mailValid = false;
                break;
            } else {
                // const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex for email addresses.
                // if(mailRegex.test(email.current.value.toLowerCase())){
                //     emailAlert.innerHTML = "*Valid Email Address";
                //     emailAlert.style.color = "GREEN";
                //     emailAlert.style.display = "block"; 
                //     break;
                // } else {
                //     emailAlert.innerHTML = "*Invalid email";
                //     emailAlert.style.color = "RED";
                //     emailAlert.style.display = "block";
                //     mailValid = false;
                //     break;
                // }
            }
        }

        if(nameValid && mailValid){
            console.log("valid")
            firstName.current.value = "";
            lastName.current.value = "";
            email.current.value = "";
            password.current.value = "";
            document.getElementById("terms").checked = false;
            setShowPass(false);
            // push(ref(database, 'users/'), userObj); // pushing data to firebase realtime database. 
            emailAlert.style.display = "none";
            nameAlert.style.display = "none";

            const auth = getAuth();
            createUserWithEmailAndPassword(auth, userObj.email, userObj.password) // checks for password and mail format and if user exists.
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                alert("UserCreated");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage)
                // ..
            });
        }
    }

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
                <form onSubmit={getUserDetails}>
                    <h1 style={{"color": "#003366"}} className="panelItem">Create an Account</h1>
                    <div id="nameDiv" className="textBoxDiv panelItem">
                        <input type="text" placeholder="First Name" ref={firstName} autoFocus required autoComplete="on"/>
                        <input type="text" placeholder="Last Name" ref={lastName} required autoComplete="on"/>                     
                    </div>
                    <p id="nameAlert" className="alert">*Username already exists</p>
                    <div id="mailDiv" className="textBoxDiv panelItem">
                        <input type="text" placeholder="Email Address" ref={email} required autoComplete="on"/>
                    </div>
                    <p id="emailAlert" className="alert">*Username already exists</p>
                    <div id="passDiv" className="textBoxDiv panelItem">
                        <input id="passwordtxt" type={showPass?"text":"password"} ref={password} required placeholder="Your Password" autoComplete="on"/>
                        <img src={showPass?show:hide} onClick={() => {
                            setShowPass(!showPass);
                        }}/>
                    </div>
                    <button id="CreateAccount" className="panelItem CreateBtn">
                        Create Account
                    </button>
                    <div>
                        <input type="checkbox" id="terms" required/>
                        <label htmlFor="terms" style={{cursor : "pointer", marginLeft: "10px"}}>By submitting the form, you agree to our Terms and Conditions</label>
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