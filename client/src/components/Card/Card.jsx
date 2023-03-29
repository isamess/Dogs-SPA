import React from 'react';
import style from './card.module.css';
import cachorro from '../../assets/cachorro.jpg';


export default function Card({name, temperament, image, weight}){
    if(!temperament){
        temperament = "None"
    }

    return(
        <React.Fragment>
            <div className={style.box}>

            <div>
            <img className={style.image} src={image? image: cachorro} alt='Not found'></img>
            <h4 className={style.breed}>{name}</h4>
            </div>

        <div className={style.overlay}>
            <div className={style.text}>
            <span>Weight:</span>
        <h3>
            {weight} Kg
        </h3>
        <span>Temperament:</span>
        
            <h2 className={style.temps}>
            {temperament}
            </h2>
            </div>
            </div>
        </div>

        </React.Fragment>
    )
}
