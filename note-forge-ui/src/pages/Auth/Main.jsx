import React, { useState } from 'react';
import { loginUser } from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';
import Logotype from '../../components/Dashboard/Logotype';

// UI Components
import Icon from '../../components/UI/Icon';
import Button from '../../components/UI/Button';
import Navbar from '../../components/UI/Navbar';

// React Bits
import Particles from '../../components/Animations/Particles';
import TextType from '../../components/Animations/TextType';

/**
 * Main page component.
 * Displays the presentation of the application.
 * Allows users to navigate to the login page.
 *
 * @component
 * @returns {JSX.Element}
 */
function Main() {
    return (
        <>
        <div className="w-full h-[80vh] flex flex-row justify-center items-center relative mt-10 gap-4">
            <Navbar />
            <img
                src="/src/assets/orange.png"
                alt=""
                className="absolute top-0 left-0 mt-0 mr-0 w-xs h-xs pointer-events-none select-none z--1"
                style={{ zIndex: -1}}
            />
            <img 
                src="/src/assets/yellow.png"
                alt=""
                className="absolute top-0 right-0 mt-0 mr-0 w-xs h-xs pointer-events-none select-none z--1"
                style={{ zIndex: -1 }}
            />
            <div className='flex flex-col justify-center items-start relative gap-4 max-w-2xl px-15'>
                <TextType className='text-black top-1/2 left-1/2 transform text-6xl font-bold mb-4'
                    text={["Note Forge", "Crea tus ejercicios", "Bienvenido!"]}
                    typingSpeed={75}
                    pauseDuration={5000}
                    showCursor={true}
                    cursorCharacter="|"
                />
                <h2 className='text-gray-800 text-xl mb-4'>Todo tu material de estudio en un solo lugar. Crea tus propios ejercicios, agrega asignaturas y más.</h2>
                <div className='flex flex-row justify-center items-center gap-4'>
                    <Button 
                        children='Comenzar'
                        to='/login'
                    />
                </div>
            </div>
            <img className="w-120 h-120" src="/src/assets/home-image.png"/>
        </div>
        <section className="w-full h-[1000px] bg-gradient-to-t from-pink-200 to-white flex items-center justify-center border-t-2 border-gray-200">
                <h2 className="text-4xl text-pink-700 font-bold">Selecciona tu rol</h2>
            </section>
        </>
    );
}

export default Main;