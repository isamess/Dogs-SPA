import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './landingPage.module.css';
import huellaCorazon from '../../assets/huellaCorazon.png';

export default function LandingPage(){
    return(
        <div className={style.body}>

                <div className={style.welcome} >
            <h1>Are you <br/> looking for <br/> your <br/>best friend ever?!</h1>
                </div>

                <div>
                    <div>
                        <img src={huellaCorazon} alt= "huella" className={style.home}/>
                    </div>
                    <NavLink to= '/home'>
                        <button className={style.button}> Let's go!</button>
                    </NavLink>
                </div>
        </div>
    ) 
};
