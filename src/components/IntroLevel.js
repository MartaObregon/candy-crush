import React from 'react'
import '../images/blue-candy.png';
import btnPlay from '../images/btn-play.png';
import blueCandy from '../images/blue-candy.png'

import './IntroLevel.css'

function IntroLevel() {
    console.log("entra intro")
    return (
        <div className='intro-level'>
            <div className="community-container">

                <div className="community-ranking">
                    <div className='user'>
                        <div className='top-user-info'>
                            <div>
                            <img alt="" src="https://randomuser.me/api/portraits/men/31.jpg"/>
                            </div>
                        </div>
                        <div className='lower-user-info'>
                            <h2 className='ranking-place'>1</h2>
                            <div>Player<p>
                                376583
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='top-user-info'>
                            <div>
                            <img alt="" src="https://randomuser.me/api/portraits/men/32.jpg"/>
                            </div>
                        </div>
                        <div className='lower-user-info'>
                            <h2 className='ranking-place'>2</h2>
                            <div>Player<p>
                                2345678
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className='user'>
                        <div className='top-user-info'>
                            <div>
                            <img alt="" src="https://randomuser.me/api/portraits/men/33.jpg"/>
                            </div>
                        </div>
                        <div className='lower-user-info'>
                            <h2 className='ranking-place'>3</h2>
                            <div>Player<p>
                                5647622
                            </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='community-btns'>
                    <button>Yo</button>
                    <button>N.1</button>

                </div>
            </div>
            <div className='level-info'>
                <h2>Nivel 1</h2>
                <div className='level-rules'>
                    <img alt="" src={blueCandy}/>
                    <h3>¡Recoge todos los pedidos!</h3>
                </div>
                <img  className="btn-play" src={btnPlay} alt=""/>
            </div>
            
        </div>
    )
}

export default IntroLevel
