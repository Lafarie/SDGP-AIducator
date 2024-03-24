import React, { useState, useEffect } from "react";


// Importing CSS files
import './videoPage.css';

// Importing Nav bar component
import Navbar from './component/Navbar';

//Importing Footer component
import Footer from "./component/Footer";

const VideoPage = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = (pageToken = '') => {
        setLoading(true);
        //fetching the api url by using Youtube data API
        fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL1ASS_oORKjhawTLan_u5rgHEICBp0_dd&key=AIzaSyBI-OUfbbTBEhJKU2sFSXVgcuXLsT6CnMo&pageToken=${pageToken}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something was wrong in the network');
                }
                return res.json();
            })
            .then(data => {
                setLoading(false);
                setVideos(prevVideos => [...prevVideos, ...data.items]);
                if (data.nextPageToken) {
                    getVideos(data.nextPageToken);
                }
            })
            .catch(error => {
                console.error('Found an error Try Again!!:', error);
                setLoading(false);
            });
    };

    return (
        <div id="VideoSection">
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <Navbar />
            <h1 className="heading">Related to You</h1>
            <br></br>
            <section className="video-container">
                {videos.map((video, index) => (
                    <div className="Video" key={index} >
                        <a key={index} href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`} className="yt-video">
                            <img className="Thumbnail" src={video.snippet.thumbnails.maxres ? video.snippet.thumbnails.maxres.url : video.snippet.thumbnails.default.url} alt={video.snippet.title} height="250vw" />
                            <h3>{video.snippet.title}</h3>
                        </a>
                    </div>
                ))
                }
            </section >

            <div className="testing">
                <p className="p1">wedsgdsgdsgsdagadgasdgag</p>
                <p className="p2">dsgsdgsdgsdgsdgsdg</p>
            </div>

            <Footer />

        </div >



    );
};

export default VideoPage;