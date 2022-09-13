import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getDogsName } from '../../Redux/actions';
import style from './searchBar.module.css'



export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName]= useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    };
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogsName(name));
        setName("");
    };
    return(
        <div>
            <input 
            className={style.placehold} 
            type='text' 
            placeholder='Search a breed...'
            value={name}
            onChange={(e)=> handleInputChange(e)}>
            </input>
            <button className={style.button} type="submit" 
            onClick={(e)=> handleSubmit(e) }>
                Search
              
            </button>
        </div>
    )
}