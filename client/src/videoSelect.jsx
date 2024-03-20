import React from 'react';
import { useParams } from 'react-router-dom';

const videoSelect = () => {
    const { id } = useParams(); // Get the id parameter from the URL

    // Logic to determine the video source based on the id
    const getVideoSrc = (id) => {
        // Replace this with your logic to fetch the video source based on the id
        switch (id) {
            case '1':
                return 'https://www.youtube.com/embed/video1';
            case '2':
                return 'https://www.youtube.com/embed/video2';
            default:
                return '';
        }
    };

    const videoSrc = getVideoSrc(id);

    return (
        <div>
            <h1>Video Player</h1>
            <iframe
                className="videoOne"
                width="560"
                height="315"
                src={videoSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default videoSelect;
