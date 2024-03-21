import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';


//Importing CSS files
import './videoPage.css'

//importing Nav bar component
import Navbar from './component/Navbar';

//Importing Arrow components
import rightArrow from "./Images/arrow-right-solid.svg"
import leftArrow from "./Images/arrow-left-solid.svg"

function Arrow({ className, style, onClick, arrowDirection }) {
    const iconStyle = {
        color: "black",
        fontSize: "1.25em",
        margin: "auto"
    };

    const arrowContainerStyle = {
        ...style,
        position: "absolute",
        alignItems: "center",
        width: "18px",
        height: "18px",
        cursor: "pointer"
    };
    const imageSrc = arrowDirection === "right" ? rightArrow : leftArrow;
    return (
        <div className={className} style={arrowContainerStyle} onClick={onClick}>
            <img src={imageSrc} alt={arrowDirection === "right" ? "Right Arrow" : "Left Arrow"} />
        </div>
    );
}


function videoPage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [headingFontSize, setHeadingFontSize] = useState(24); // Initial font size for h1
    const [videoSrc, setVideoSrc] = useState("");

    const handleVideoClick = (src) => {
        setVideoSrc(src);
    };
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);

            // Adjusting font size based on window width
            if (window.innerWidth < 768) {
                setHeadingFontSize(18); // Adjust this according requirements
            } else if (window.innerWidth < 992) {
                setHeadingFontSize(20); // Adjust this according requirements
            } else {
                setHeadingFontSize(24); // Default font size
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {

        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <Arrow arrowDirection="right" />,
        prevArrow: <Arrow arrowDirection="left" />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }

    function calculateSlidesToShow(width) {
        if (width < 768) {
            return 1; // Adjust this according to requirements
        } else if (width < 992) {
            return 2; // Adjust this according to requirements
        } else {
            return 3; // Adjust this according to requirements
        }
    };
    return (
        <div>
            <Navbar />
            <br></br>
            <br></br>
            <br></br><br></br><br></br><br></br>
            <div className="video-slide-container">
                <h1 className="First-Heading" style={{ fontSize: headingFontSize + 'px' }}>Related to you</h1>
                <Slider {...settings}>
                    <div className="card">
                        <div className="video_Box">
                            <button className="videoButton" onClick={() => window.open('/video1', '_blank')}>
                                <div className="videoPannel">
                                    <iframe className="videoOne" width="560" height="315" src={videoSrc} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                                </div>
                            </button>

                        </div>

                        <div className="cardbody">
                            <h3>Grade 8 Mathematics : Geometry</h3>
                            <h4>By The Organic Chemistry Tutor</h4>
                            <h5>Views 1.7M</h5>
                        </div>
                    </div>


                    <div className="card">
                        <div className="video_Box">
                            <button className="videoButton" onClick={() => window.open('/video1', '_blank')}>
                                <div className="videoPannel">
                                    <iframe className="videoOne" width="350" height="250" src="https://www.youtube.com/embed/K5ZrMTDZmP0?si=dE5XL2yCRCfPhL2N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                        </div>
                            </button>
                        </div>

                        <div className="cardbody">
                            <h3>Grade 8 Mathematics : Volume and Capacity</h3>
                            <h4>By DP Education-Maths</h4>
                            <h5>Views 210k</h5>
                        </div>
                    </div>

                    <div className="card">
                        <div className="video_Box">
                            <button className="videoButton" onClick={() => window.open('/video1', '_blank')}>
                                <div className="videoPannel">
                                    <iframe className="videoOne" width="350" height="250" src="https://www.youtube.com/embed/49G43UkVvEM?si=Gr5Mnox2BoENQtIL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                        </div>
                            </button>
                        </div>

                        <div className="cardbody">
                            <h3>Grade 9 Mathematics : Factors</h3>
                            <h4>By DP Education-Maths</h4>
                            <h5>Views 62k</h5>
                        </div>

                    </div>

                    <div className="card">
                        <div className="video_Box">
                            <button className="videoButton" onClick={() => window.open('/video1', '_blank')}>
                                <div className="videoPannel">
                                    <iframe className="videoOne" width="350" height="250" src="https://www.youtube.com/embed/3lPspTetBws?si=XvCnqQ1J_U4ir_uM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                        </div>
                            </button>
                        </div>

                        <div className="cardbody">
                            <h3>Grade 8 Mathematics : Graphs</h3>
                            <h4>By Instyn education</h4>
                            <h5>Views 53k</h5>
                        </div>

                    </div>
                    <div className="card">
                        <div className="video_Box">
                            <button className="videoButton" onClick={() => window.open('/video1', '_blank')}>
                                <div className="videoPannel">
                                    <iframe className="videoOne" width="350" height="250" src="https://www.youtube.com/embed/cl24nzYi57Q?si=AHIyu-x1vASgQ4MT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                        </div>
                            </button>
                        </div>

                        <div className="cardbody">
                            <h3>Grade 8 Mathematics : Perimeter and Area</h3>
                            <h4>By Mrs Townsend Mathematics - South Africa</h4>
                            <h5>Views 20k</h5>
                        </div>

                    </div>
                    <div className="card">
                        <div className="video_Box">
                            <button className="videoButton" onClick={() => window.open('/video1', '_blank')}>
                                <div className="videoPannel">
                                    <iframe className="videoOne" width="350" height="250" src="https://www.youtube.com/embed/-96sSXc_0dc?si=YgVAUdaO-90e5aB6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                        </div>
                            </button>
                        </div>

                        <div className="cardbody">
                            <h3>Grade 8 Mathematics :Mass</h3>
                            <h4>By Smart Math</h4>
                            <h5>Views 4.18k</h5>
                        </div>

                    </div>
                </Slider>
            </div>

        </div>
    )

}
export default videoPage;
