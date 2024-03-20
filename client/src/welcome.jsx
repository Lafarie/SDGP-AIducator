import { useEffect } from "react";
import "./welcome.css";
import logo from "./Images/BigLogo.png"
import { Link, useNavigate } from "react-router-dom";
import getCurrentUser from "./currentUser";

function Welcome() {
    return(
        <div>
            <WelcomeNavbar />
            <WelcomeContent/>
        </div>
    )

}

function WelcomeContent(){

    let navigate = useNavigate();

    useEffect(() => {
        document.body.id = "AccountBody";
        // Clean up function to remove styles on unmount (optional)
        return () => {
            document.body.id = null;
        };
      }, []);

      useEffect(() => {
        getCurrentUser().then((user) => {
            if(user !== null){
                navigate("/home")
            }
      })
      })

    return(
        <>   
        <div id="welcomeDiv">
            <div id="welcomeimgdiv">
                <img src={logo} alt="logo" id="logo"/>
            </div>
            <div id="welcometextDiv">
                <div id="textContainer">
                <h2>"Make your learning Easier"</h2>
                <p>with</p>
                <h1>AIducator</h1>
                <p> AI Chat Bot Services, 3D objects, Video Recommendation and other features too....</p>
                </div>
                <Link to={"signup"} className="welcomelinks"><div id="CreateAccountWelcome">
                    Create an Account
                </div></Link>
            </div>
        </div>
        </>
    )
}

function WelcomeNavbar(){
    return(
        <div>
            <div id="WelcomeNavbarDiv">
                <ul>
                    <li>FAQ</li>
                    <li>Contact Us</li>
                    <li id="loginItem"><Link to={"/signin"}>Log In</Link></li>
                </ul>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Welcome;