import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams} from 'react-router-dom';
import { dogDetail } from '../../Redux/actions';
import style from './details.module.css';



export default function Details(props){
    console.log("LAS PROPS SON:", props)
    const dispatch = useDispatch();
    const {id}= useParams();  

    useEffect(() => {
    dispatch(dogDetail(id));
    },[dispatch, id]); 

    const cardDetail = useSelector((state) => state.details); 

    if(!cardDetail.temperament){
    cardDetail.temperament = "None"
    }
    return(
    <React.Fragment>
    <div className={style.bkg}>

    <h3 className={style.name}>{cardDetail.name}</h3>
    <img className={style.image} src={cardDetail.image} alt="not found"/>
    <div className={style.allD}>
    <h5>Temperaments:</h5>
    <ul>{cardDetail.temperament}</ul>
    <div className={style.detail}>
    <h5>Weight: </h5>
    <h5>Height: </h5>
    <h5>Life Span: </h5>
    <p>{cardDetail.weight} kg</p>
    <p>{cardDetail.height} cm</p>
    <p>{cardDetail.life_span}</p>
    </div>
    </div>
    <br />
    
    <div className={style.backHome}>
        <Link to ='/home'>
        <button> Go Home!</button>
        </Link>
    </div>

    </div> 
    </React.Fragment>
)

};
