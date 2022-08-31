import React from 'react';
import {Link} from 'react-router-dom';
import '../LandingPage/LandingPage.css';
import video from '../utils/video2.mp4';

const Landing = () => {
  return (
    <div className='main'>
      <video className='video' src={video} autoPlay loop muted ></video>
      <div>
        <h1 className='titulo'>Country's App</h1>
        <Link to="/home">
            <button className="button">Press to start</button>
            </Link>
      </div>
    </div>
  )};

export default Landing;