import React, {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {postDogs, getTemperaments} from '../../Redux/actions';
import styles from './dogCreated.module.css'


function validate(input) {
    let errors = {};                             //genero un objeto errores
    if (!input.name) {                           //input es mi estado local, si en mi estadolocal.name no hay nada
        errors.name = "Name is required";        //entonces en mi objeto.name pongo un string que diga se requiere un nombre
    } else if (!input.min_height) {
        errors.min_height = "Min height is required";
    } else if (input.min_height <= 0) {
        errors.min_height = "Min height should be greater than zero";
    } else if (!input.max_height) {
        errors.max_height = "Max height is required";
    } else if (input.max_height <= 0) {
        errors.max_height = "Max height should be greater than zero";
    } else if (parseInt(input.min_height) >= parseInt(input.max_height)) {      //convierto el peso que me viene en string en un entero para compararlo
        errors.max_height = "Max height must be greater than Min height";
    } else if (!input.min_weight) {
        errors.min_weight = "Min weight is required";
    } else if (input.min_weight <= 0) {
        errors.min_weight = "Min weight should be greater than zero";
      } else if (!input.max_weight) {
        errors.max_weight = "Max weight is required";
      } else if (input.max_weight <= 0) {
        errors.max_weight = "Max weight should be greater than zero";
      } else if (parseInt(input.min_weight) >= parseInt(input.max_weight)) {      //convierto el peso que me viene en string en un entero para compararlo
        errors.max_weight = "Max weight must be greater than Min weight";
      }  else if (!input.life_span) {
        errors.life_span = "Life span is required";
    } else if (input.life_span <= 0) {
        errors.life_span  = "Life span should be grater than zero";
    } else if (input.life_span > 20) {
        errors.life_span  = "Life span should be smaller than 20";
    } else if (!input.image) {
        errors.image = "Please insert an image URL";
    } else if (
        !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)
      ) {
        errors.image = "Please insert a valid image URL";
    }
    return errors;
};


//TODO: inputs and handles for Form states


export default function DogCreated(){
    const dispatch = useDispatch();
    const history= useHistory   // me redirige a la ruta que le pida 
    const [temps, setTemps]= useState([]);
    const[errors, setErrors]= useState({hasErrors: true});
    const {temperaments}= useSelector((state)=>state.temperaments)


    const [input,setInput] = useState({
        name: "", 
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperament: []
    });
    
    useEffect (() => {
        dispatch(getTemperaments());
    }, []);

    function handleChange(e){   //necesaria para los inputs del Form
        e.preventDefault()
        setInput({      //guardo en mi estado input lo que el usuario escribe
            ...input,
            [e.target.name]: e.target.value  //agrega el e.target.value de lo que se modifica
             //el target.name se pasa en el Form, si se modifica el name, va a tomar el target.value de name, y así con todos y a medida que modifica, llena ese estado
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value     
        }))
        console.log(input)                                  
        }
    

        function handleSelect(e) {
           
            if(!temps.includes(e.target.value)){
                if(temps.length > 0){
                    setTemps([...temps, e.target.value])     //me trae lo que había mas mi e.target.value
                } else {                                     //guarda en un arreglo todo lo q se selecciona en el select
                    setTemps([e.target.value])               //cada click en un select me lo va agregando ahí
                }
            } 
            // console.log(e.target.value)
    
    }


    function handleDelete(e){           //uso el handleDelete para borrar del estado un temp que la persona pueda quitar un temperamento que había elegido antes
        e.preventDefault()                                    
        setTemps(temps.filter(t => t !== e.target.value))  //Me devuelve el estado nuevo sin ese elemento que yo clikee
        // console.log(temps)                                    //en temps tengo todos los temperamentos que fui agregando de la lsita
        // console.log(e.target.value)                           //cuando hago click en X consologuea el que filtré 
    } 

    function handleSubmit(e) {                   //el handleSubmit lo voy a usar para submitear el formulario
        if (errors.name !== undefined || 
            errors.min_height !== undefined ||
            errors.max_height !== undefined ||
            errors.min_weight !== undefined ||
            errors.max_weight !== undefined ||
            errors.life_span !== undefined 
            )  {
            document.getElementById("DoNotSubmit"); //con document.getElementById() selecciono el form por medio del atributo id que le asigné ("DontSubmit")
            return alert("Please complete the fields with valid data");
          }
        const addDog= {
            name: input.name,
            height: input.min_height + " - " + input.max_height,
            weight: input.min_weight + " - " + input.max_weight,
            life_span: input.life_span,
            image: input.image,
            temperament: temps
        };
        e.preventDefault()                     //permite prevenir comportamiento por default del envío del Form
        dispatch(postDogs(addDog))               //si no hay validaciones incorrectas se envía el Form
        alert("Your breed was successfully created!")
        setInput({                                    //limpio el input
        name: "",        
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperament: []  
    })
        setTemps([])                             //seteo el array de temps seleccionados por el usuario para que quede vacio de nuevo
        history.push("/home")                    //cuando termine de hacer esto mandáme al home (porque ya creé mi dog)
    }

    
    

    // function handleSubmit(e){
    //     e.preventDefault();
    //     if(Object.values(errors).length > 0) {alert("Value required!")} 
    //     else{
    //         dispatch(postDogs(input));
    //         alert("Dog Created succesfully!")
    //         setInput({
    //             name: "",
    //             height: "",
    //             weight: "",
    //             life_span: "",
    //             image: "",
    //             created: true, 
    //             // temperament: []
    //             dogs:[],
    //         });
    //         history.push('/home')
    //     } 
    //     console.log('FROM FRONT: ',input)
    // };


    
    
    

    return (
        <React.Fragment> 
            <div className={styles.contPpal}>
            
            <div className={styles.caja}>
            <h1>Create your own Breed</h1>

            <form  className={styles.form} 
            id="DoNotSubmit"
            onSubmit={(e)=> handleSubmit(e)}>
                <div className={styles.inputs}>

                <div className={styles.nombre}>
                    <label>Breed Name</label>

                    <input className={styles.formInputs}
                        key= "name"  
                        type='text'
                        value={input.name}
                        name="name"
                        placeholder="Enter a name"
                        onChange={(e)=>handleChange(e)}
                        required
                    /><br />
                    {errors.name &&( 
                        <p className={styles.error}>{errors.name}</p>)
                    }
                </div>

                <div className={styles.alturas}>
                    <label>Height (cm)</label>
                    <input  className={styles.formInputs}
                        type="min_height"
                        value={input.min_height}
                        name="min_height"
                        onChange={(e)=>handleChange(e)}
                        placeholder="Min height"
                        required
                    />
                    {errors.min_height && <p className={styles.error}> {errors.min_height}</p>}
                    <br />
                    <input className={styles.formInputs}
                    onChange={(e) => handleChange(e)} 
                    name="max_height" 
                    type="max_height" 
                    value={input.max_height} 
                    placeholder="Max height"
                    />
                    {errors.max_height && (
                                    <p className={styles.error}>{errors.max_height}</p>
                                )} 
                </div>

                <div className={styles.pesos}>
                <label>Weight (Kg.)</label>
                <input className={styles.formInputs}
                        type="min_weight"
                        value={input.min_weight}
                        name="min_weight"
                        onChange={(e)=>handleChange(e)}
                        placeholder="Min weight"
                        required
                    />
                    {errors.min_weight && (
                                    <p className={styles.error}>{errors.min_weight}</p>
                                )} 
                                <input className={styles.formInputs}
                                onChange={(e) => handleChange(e)} 
                                name="max_weight" type="max_weight" 
                                value={input.max_weight} 
                                placeholder="Max weight"
                                />
                                {errors.max_weight && (
                                    <p className={styles.error}>{errors.max_weight}</p>
                                )}
                    <br />
                    
                </div>

                <div className={styles.life_span}>
                <label>Life Span (years)</label>
                    <input className={styles.formInputs}
                        type='text'
                        value={input.life_span}
                        name="life_span"
                        onChange={(e)=>handleChange(e)}
                        placeholder="Life Span"
                        required
                    />
                    {errors.life_span && <p className={styles.error}>{errors.life_span}</p>}
                </div>
                
                <div className={styles.image}>
                <label>Image...</label>
                
                    <input className={styles.formInputs}
                        type='url'
                        value={input.image}
                        name="image"
                        key="image"
                        placeholder="Insert URL image"
                        onChange={(e)=>handleChange(e)}
                        
                    />
                    {errors.image && <p className={styles.error}>{errors.image}</p>}
                </div>

                <select className={styles.tempContainer}  onChange={(e) => handleSelect(e)}>
                {temperaments && temperaments.map((el)=>(
                        <option value= {el.name} key={el.id}>{el.name}</option>
                    ))}
                </select>


                <div className={styles.buttonBreed}>
            <button
            type= "submit"
            >CREATE BREED!
            </button>
                </div>
                    <br />

</div>
</form>
{input.temperament.map(el => 
                <div className={styles.divTemp}key={el}>
                    <p>{el}</p>
                    <button className='xButton' onClick={() => handleDelete(el)}>x</button>
                </div>
                )}

</div>
</div>
            </React.Fragment>
    )
}