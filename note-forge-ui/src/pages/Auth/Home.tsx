import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import homeImage from '../../assets/home-image.png';

// UI Components
import Button from '../../components/UI/Button';
import Navbar from '../../components/Dashboard/Navbar';
import BgDecoration from '../../components/UI/BgDecoration';
import InfoCard from '../../components/UI/InfoCard';
import Footer from '../../components/UI/Footer';

// React Bits
import TextType from '../../components/Animations/TextType';
import {useTranslation} from "react-i18next";

/**
 * Home page component.
 * Displays the presentation of the application.
 * Allows users to navigate to the login page.
 *
 * @component
 * @returns {JSX.Element}
 */
function Home() {
    const { t } = useTranslation();

    return (
        <>
        <div className="w-full h-[80vh] flex flex-row justify-center items-center relative mt-10 gap-4">
            <Navbar />
            <BgDecoration 
                file="orange.png"
                position='top-0 left-0'
            />
            <BgDecoration 
                file="yellow.png"
                position='top-0 right-0'
            />
            <div className='flex flex-col justify-center items-start relative gap-4 max-w-2xl px-15'>
                <TextType className='text-black top-1/2 left-1/2 transform text-5xl font-bold mb-4'
                    text={["Note Forge", t('home.create-exercises'), t('home.welcome') + "!"]}
                    typingSpeed={75}
                    pauseDuration={5000}
                    showCursor={true}
                    cursorCharacter="|"
                />
                <h2 className='text-gray-800 text-xl mb-4'>{t('home.description')}</h2>
                <div className='flex flex-row justify-center items-center gap-4'>
                    <Button 
                        children={t('button.start')}
                        to='/login'
                    />
                </div>
            </div>
            <img className="w-120 h-120" src={homeImage} alt="Home" />
        </div>
        <section className="w-full flex items-center justify-around border-t-2 border-gray-200">
            <div className="flex flex-row items-start justify-start gap-8 mx-auto max-w-5/6 my-10">
                <div className="flex-1 bg-gray-900 rounded-lg shadow-log flex flex-col p-10 border-2 border-gray-100 item-center">
                    <h2 className="text-2xl text-white text-center font-bold">{t('home.made-for-you')}</h2>
                    <div className="flex flex-row justify-center items-center gap-8 mt-6 h-full w-full">
                        <InfoCard 
                            title={t('roles.student')}
                            image='student.png'
                            alt='Student'
                            sizeImage='w-2/3 h-2/3'
                        />
                        <InfoCard 
                            title={t('roles.assistant')}
                            image='assistant.png'
                            alt='Assistant'
                            sizeImage='w-2/3 h-2/3' 
                        />
                        <InfoCard 
                            title={t('roles.teacher')}
                            image='teacher.png'
                            alt='Teacher'
                            sizeImage='w-2/3 h-2/3'
                        />
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </>
    );
}

export default Home;