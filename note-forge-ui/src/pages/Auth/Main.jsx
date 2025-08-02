import React, { useState } from 'react';
import { loginUser } from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';
import Logotype from '../../components/Dashboard/Logotype';
import Icon from '../../components/Dashboard/Icon';

import Particles from '../../components/Animations/Particles';
import TextType from '../../components/Animations/TextType';


function Main() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center relative gap-4">
            <Icon />
            <TextType className='text-center text-black top-1/2 left-1/2 transform text-6xl font-bold mb-8'
                text={["Note Forge", "Organiza tu aprendizaje", "Bienvenido!"]}
                typingSpeed={75}
                pauseDuration={3500}
                showCursor={true}
                cursorCharacter="|"
            />
            <div className='flex flex-row justify-center items-center gap-4'>
                <button className='text-white rounded-full bg-purple-500 backdrop-blur-md px-6 py-3'>
                    Comenzar
                </button>
                <button className='text-black rounded-full bg-gray-500/20 backdrop-blur-md px-6 py-3 border border-gray-300'>
                    Más información
                </button>
            </div>
        </div>
    );
}

export default Main;