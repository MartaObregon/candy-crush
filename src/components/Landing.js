import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import btnPlay from '../images/btn-play.png';

import './Landing.css'




function Landing() {
   


    return (
        <div className='landing'>
            <Link to = "/play">
                <img className='landing-btn' alt="" src={btnPlay}/>
            </Link>
            
        </div>
    )
}

export default Landing
