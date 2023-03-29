import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink, Link} from 'react-router-dom'
import { getDogs, getTemperaments, alphaOrder, weightOrder, filterDogCreated, filterByTemperaments } from '../../Redux/actions';
import Card from '../Card/Card.jsx';
import Paginado from '../Paginado/Paginado.jsx';
import SearchBar from '../Searchbar/SearchBar.jsx';
import style from './home.module.css';


export default function Home(){ 
    const dispatch= useDispatch();  //despacho mis acciones con esta constante
    const allDogs= useSelector((state)=> state.dogs);// me traigo el estado de dogs (=mapstatetoprops)
    const allTemps= useSelector((state)=> state.temperaments);


//paginado
const [currentPage, setCurrentPage] = useState(1); //guardo estado local actual(1)
// eslint-disable-next-line 
const [dogsPerPage, setDogsPerPage] = useState(8); //cantidad de dogs por página
const indexLastDog = currentPage * dogsPerPage ;
const indexFirstDog = indexLastDog - dogsPerPage;
const currentDogs = allDogs.slice(indexFirstDog, indexLastDog); //dogs en la página actual
const paginado = (numberOfPage) => {
    setCurrentPage(numberOfPage);
};

// eslint-disable-next-line 
const [order, setOrder]= useState(""); //estado local arranca vacío, luego se ordena. Hook de ordenamiento. Me setea un estado local para que me haga el renderizado alfabético
// eslint-disable-next-line
const [order2, setOrder2]= useState("");  // estado para renderizar ordenamiento por peso
//To change page


//TODO: traigo los perros cuando el componente se monta
useEffect(()=>{
    dispatch(getDogs());
}, [dispatch]);  //para evitar loop infinito

useEffect(()=>{
    dispatch(getTemperaments())
},[]);


//TODO: Handles to dispatch actions

//TODO: handle to reload dogs
function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
    };
    
    //TODO: handle to filter dogs created
    function handleFilterByCreated(e) {
    e.preventDefault();
    dispatch(filterDogCreated(e.target.value));
    }

    //TODO: handle filtered temperaments
    function handlefilterByTemperaments(e){
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value))
    } 
    //console.log(temperaments);
    
    //TODO: handle alphabetic order
    function handleOrderByName(e) {
    e.preventDefault();
    dispatch(alphaOrder(e.target.value));
    setCurrentPage(1); // pido que me setee en la primera página 
    setOrder(`${e.target.value}`); //se modifica estado local
    e.target.value= 'default';
    setOrder2(`${e.target.value}`);

    
    }

    //TODO: handle weight order
    function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(weightOrder(e.target.value));
    setCurrentPage(1);
    setOrder2(`${e.target.value}`);
    e.target.value= 'default';
    setOrder(`${e.target.value}`)
    }

    return(
        <React.Fragment>
            <div className={style.body}>
            
                <div className={style.head}>
                    <h1>Find your body to love!</h1>
                </div>

            <div className= {style.cita}>
                <h1> "What is a dog but a machine for loving?<br/>
You introduce him to a human being giving him the mission to love.<br/>
And however ugly, perverse, deformed or stupid this human being might be<br/>
the dog loves him (or her)" Iggy Pop</h1>
            </div>

    <div className={style.created}>
        <Link to='/dog'>
    <button className={style.button}>Create New Breed</button></Link>
    </div>

    <div className={style.created}>
    <button className={style.button} onClick={(e) => handleClick(e)}>Reload Dogs</button>
    </div>
        
    <SearchBar></SearchBar>

    <div >
    <select  className={style.select} onClick={(e)=>handleOrderByName(e)}defaultValue="default">
            <option value="default" disabled="disabled">Names</option>
            <option value="Asc" key="Asc">A to Z</option>
            <option value="Desc" key="Desc">Z to A</option>
        </select>

        <select className={style.select} onClick={e=>handleOrderByWeight(e)} defaultValue="default">
            <option value="default" disabled="disabled">Weight</option>
            <option value="Weight1" key="Weight1">Smaller</option>
            <option value="Weight2" key="Weight2">Bigger</option>
        </select>

        <select className={style.select} onClick={(e)=>handlefilterByTemperaments(e)} defaultValue="default">
         <option value='default' disabled='disabled' >Temperaments</option>
        <option value=""  key="AllT">Temperaments</option> 
        {allTemps && allTemps.map((temp) => (
          <option key={temp.id} value={temp.name}>{temp.name}</option>
        ))}
        </select>

        <select className={style.select} onClick={(e)=>handleFilterByCreated(e)} defaultValue="default">
            <option value='default' disabled='disabled'>Source</option> 
            <option value="All" key="All">All</option>
            <option value='Created' key="Created">Created</option>
            </select>

            <div className={style.Pagination}></div>
                {allDogs.length > 8 ? 
                (
                    <Paginado
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        paginado={paginado}
                        currentPage={currentPage}
                    />
                ): null}
            
            </div> 

            <div className={style.divCards}>
        {currentDogs && currentDogs.map((c)=>{  
            return(
                <div   key={c.id}className={style.Card}>
                <NavLink to={`/dogs/${c.id}`} >
                    <Card 
                    name={c.name} 
                    image={(c.image) || null}  
                    weight={c.weight}
                   
                    temperament={
                        c.temperament
                        ? c.temperament
                        : c.temperaments && c.temperaments.map((temp)=>temp.name.concat(" "))
                    }
                    />
                </NavLink>
                </div>
            )
        })
        }
            </div>
    </div>
        </React.Fragment>

    )


}