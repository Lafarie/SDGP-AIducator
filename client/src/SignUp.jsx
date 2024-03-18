import "./SIgnUp.css";
import { useEffect, useRef, useState } from "react";
import hide from "./Images/eye-password-hide.svg";
import show from "./Images/eye-password-show.svg";
import googleIcon from "./Images/GoogleIcon.svg";
import logo from "./Images/BigLogo.png";
import app from "./firebase";
// import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, child, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

//create accoutn should only be active once all geilds are filled

function SignUp(){

    let firstName = useRef();
    let lastName = useRef();
    let email = useRef();
    let password = useRef();

    const [fname, setfname] = useState(""); // useStates to see activity of text feilds
    const [lname, setlname] = useState("");
    const [useremail, setuseremail] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const [terms, setterms] = useState(false);

    const [previousUsers, setpreviousUsers] = useState(null)

    const toHome = useNavigate();

    const UserRef = ref(database, 'users/');

    useEffect(() => { // loading userdata at initial render.
        onValue(UserRef, (user) => {
            setpreviousUsers(user.val());
        })
    }, [])

    useEffect(() => {
        if(firstName.current.value === '' || lastName.current.value === '' || email.current.value === '' || password.current.value === '') {
            document.getElementById("CreateAccount").disabled = true;
        } else {
            if(terms){
                document.getElementById("CreateAccount").disabled = false;
            } else {
                document.getElementById("CreateAccount").disabled = true;
            }
        }
    }, [fname, lname, useremail, userpassword, terms])
    
    function getUserDetails(e){

        e.preventDefault();
        let nameValid = true;

        let userObj = {
            fname : (firstName.current.value).trim(),
            lname : (lastName.current.value).trim(),
            grade : "",
            interests : ""
        }

        try{
            onValue(UserRef, (user) => {
                setpreviousUsers(user.val()); // getting previous users 
            })

            console.log(previousUsers);

            let objectkeys = Object.keys(previousUsers);
            console.log(previousUsers);
            
            for (let i = 0; i < objectkeys.length; i++){ // checking if username is unique
                let name = previousUsers[objectkeys[i]].fname + " " + previousUsers[objectkeys[i]].lname;
                let nameAlert = document.getElementById("nameAlert");
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
            }
        } catch(e){
            console.log(e);
        }

        if(nameValid){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value) // checks for password and mail format and if user exists.
            .then((userCredential) => {
                const user = userCredential.user;
                alert(user.email + "UserCreated");
                firstName.current.value = "";
                lastName.current.value = "";
                email.current.value = "";
                password.current.value = "";
                document.getElementById("terms").checked = false;
                document.getElementById("CreateAccount").disabled = true;
                setShowPass(false);
                console.log(userObj);
                // push(ref(database, 'users/'), userObj); // pushing data to firebase realtime database. 
                const reference = ref(database, 'users/' + user.uid);
                set(reference, userObj);
                toHome("/surveyStu");
            })
            .catch((error) => {
                const errorCode = error.code;

                let emailAlert = document.getElementById("emailAlert");
                console.error(errorCode);

                if(errorCode === "auth/invalid-email"){
                    emailAlert.innerHTML = "*Invalid email address";
                    emailAlert.style.color = "RED";
                    emailAlert.style.display = "block"; 
                }

                if(errorCode === "auth/email-already-in-use"){
                    emailAlert.innerHTML = "*Email already in use";
                    emailAlert.style.color = "RED";
                    emailAlert.style.display = "block"; 
                }

                if(errorCode == "auth/weak-password"){
                    passAlert.innerHTML = "*Weak password";
                    passAlert.style.color = "RED";
                    passAlert.style.display = "block";
                }
            });
        }
    }

    useEffect(() => { // setting background image
        document.body.id = "AccountBody";
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
                        <input type="text" placeholder="First Name" ref={firstName} autoFocus required autoComplete="on"
                        onChange={() => {
                            setfname(firstName.current.value);
                        }}/>
                        <input type="text" placeholder="Last Name" ref={lastName} required onChange={() => {
                            setlname(lastName.current.value);
                        }}/>                     
                    </div>
                    <p id="nameAlert" className="alert">*Username already exists</p>
                    <div id="mailDiv" className="textBoxDiv panelItem">
                        <input type="text" placeholder="Email Address" ref={email} required autoComplete="new-password" onChange={() => {
                            setuseremail(email.current.value);
                        }}/>
                    </div>
                    <p id="emailAlert" className="alert">*Account already exists</p>
                    <div id="passDiv" className="textBoxDiv panelItem">
                        <input id="passwordtxt" type={showPass?"text":"password"} ref={password} required placeholder="Your Password" autoComplete="new-password"
                        onChange={() => {
                            setuserpassword(password.current.value);
                        }}/>
                        <div id="passIconDiv">
                            <img alt="password" src={showPass?show:hide} onClick={() => {
                                setShowPass(!showPass);
                            }}/>
                        </div>
                    </div>
                    <p id="passAlert" className="alert">*Account already exists</p>
                    <button id="CreateAccount" className="panelItem CreateBtn">
                        Create Account
                    </button>
                    <div id="termsDiv">
                        <input type="checkbox" id="terms" required defaultChecked={false} onClick={() => {
                            setterms(!terms);
                        }}/>
                        <label htmlFor="terms" style={{cursor : "pointer", marginLeft: "0.5vw"}}>By submitting the form, you agree to our Terms and Conditions</label>
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
                        <div className="googleImgContainer">
                            <img src={googleIcon} alt="google logo"/>
                        </div>
                        <p>Sign in with Google</p>
                    </div>
                </form>
                
            </div>  
            <div id="rightdiv" className="panel">
                <img src={logo} alt=" " />
                <h1>AIducator</h1>
                <p>“Make your learning Easier”</p>
            </div>  
        </div>
    )
}

export default SignUp;