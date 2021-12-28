import React from 'react';
import logo from '../images/king-logo.png'
import './Header.css'

function Header() {
    return (
        <div className='header'>

            <div className='header-left'>
                <div className='header-option'>Inicio</div>
                <div className='header-option'>Juegos</div>
                <div className='header-option'>Trabajos</div>
            </div>
            <div className='header-center'>
                <img className='header-logo' alt="king" src={logo}/>
            </div>
            <div className='header-right'>
                <div className='header-option'>Comunidad</div>
                <div className='header-option'>Iniciar Sesión</div>
            </div>
            
        </div>
    )
}

export default Header
