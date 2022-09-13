import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {postDogs, getTemperaments} from '../../Redux/actions';
import styles from './dogCreated.module.css'


function validation(dogCreated){
    let errors = {}
    if(dogCreated.name === ' '){
        errors.name = 'Must enter a name'
    }
    if(dogCreated.weight === ' ' || dogCreated.weight < 0 ){
        errors.weight = 'Must enter a weight and min height should be higher than 0'
    }
    if(dogCreated.weight === ' ' || dogCreated.weight < 0 ){
        errors.height = 'Must enter a height and min height should be higher than 0'
    }

    return errors
}


//TODO: inputs and handles for Form states
export default function DogCreated(){
    const dispatch = useDispatch();
    const temperament = useSelector((state) => state.temperament);
    const [errors, setErrors] = useState({});

    const [input,setInput] = useState({
        name: "", 
        height: "",
        weight: "",       
        life_span: "",
        image: "",
        temperament: []
    });

    useEffect(() => {
        dispatch(getTemperaments());
        // dispatch(postDogs());       
    },[dispatch]);

    
    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(validation({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    
    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value ]
        });
        e.target.value = 'default';
        console.log("input de la img:", input);
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!input.name || !input.height|| !input.weight || !input.life_span) {alert("Value required!")} 
    
        else{
            dispatch(postDogs(input))
            alert("Dog Created!")
            setInput({
                name: "",
                height: "",
                weight: "",
                life_span: "",
                image: "", 
                temperament: []
            })
            
        } 
        console.log('FROM FRONT: ',input)
    }


    function handleDelete(e) {
        setInput({
        ...input,
        temperament: input.temperament.filter((temps) => temps !== e),
    });
    }
    
    

    return (
        <React.Fragment> 
            <div className={styles.contPpal}>
            
            <div className={styles.caja}>
            <h1>Create your own Breed</h1>

            <form  className={styles.form} onSubmit={(e)=> handleSubmit(e)}>
                <div className={styles.inputs}>
                <div className={styles.nombre}>
                    <label>Name.........</label>
                    <input
                        
                        type='text'
                        value={input.name}
                        name="name"
                        onChange={(e)=>handleChange(e)}
                        required
                    /><br />
                    {errors.name && ( 
                        <span className={styles.error}>{errors.name}</span>
                    ) }
                </div>
                <div className={styles.alturas}>
                    <label>Height........</label>
                    <input
                        type='text'
                        value={input.height}
                        name="height"
                        onChange={(e)=>handleChange(e)}
                        required 
                        style={{marginRight:'1rem'}}
                    /><br />

                </div>
                <div className={styles.pesos}>
                <label>Weight.......</label>
                    <input
                        type='text'
                        value={input.weight}
                        name="weight"
                        onChange={(e)=>handleChange(e)}
                        required 
                        style={{marginRight:'1rem'}}
                    /><br />
                    {errors.weight &&
                    <span className={styles.error}>{errors.weight}</span>}
                </div>
                <div className={styles.life_span}>
                <label>Life Span...</label>
                    <input
                        type='text'
                        value={input.life_span}
                        name="life_span"
                        onChange={(e)=>handleChange(e)}
                        style={{marginRight:'1rem'}}
                    />
                </div>
                <div className={styles.image}>
                <label>Image........</label>
                    <input
                        type='url'
                        value={input.image}
                        name="image"
                        onChange={(e)=>handleChange(e)}
                        style={{marginRight:'1rem'}}
                    />
                </div>
                <div className={styles.temper}>
                <label>Temperaments</label>
                    <select onChange={(e)=> handleSelect(e)} defaultValue='default'>
                    {temperament && temperament.map((temp)=> (
                        <option key={temp} value={temp.name}>{temp.name}</option>
                    ))}
                </select>
                </div>
                </div>

                <ul className={styles.lista}><li className={styles.lista}>{input.temperament.map(temp => temp + " ,")}</li></ul>
                <button type='submit' className={styles.buttonBreed} >Create Breed</button>
            </form>
            </div>
            <div className={styles.temperX}>
            {
                input.temperament.map(t=> 
                    <div className={styles.divTemp}  key={t}>
                        <ul>{t}</ul>
                        <button className={styles.botonX} onClick={()=> handleDelete(t)}>x</button>
                    </div>
                        )
            }
            </div>
        <div className={styles.divVolver}>
            <Link to='/home'><button className={styles.buttonBack}>Back</button></Link>
            </div>
        
        </div>
        
        </React.Fragment>
    )
}