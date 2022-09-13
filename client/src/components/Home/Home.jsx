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
    const dispatch= useDispatch();  //despacho acciones con esta constante
    const allDogs= useSelector((state)=> state.dogs);// me traigo el estado de dogs
    const temperament= useSelector((state)=> state.temperament);


//paginado
const [currentPage, setCurrentPage] = useState(1); //guardo estado local actual(1)
// eslint-disable-next-line 
const [dogsPerPage, setDogsPerPage] = useState(8); //cantidad de dogs por página
// eslint-disable-next-line 
const [order, setOrder]= useState(""); //estado local arranca vacío, luego se ordena. Hook de ordenamiento

//To get current dogs
const indexLastDog = currentPage * dogsPerPage ;
const indexFirstDog = indexLastDog - dogsPerPage;

const currentDogs = allDogs.slice(indexFirstDog, indexLastDog); //dogs en la página actual

//To change page
const paginado = (numberOfPage) => {
    setCurrentPage(numberOfPage);
};

//TODO: traigo los perros cuando el componente se monta
useEffect(()=>{
    dispatch(getDogs());
}, [dispatch]);  //para evitar loop infinito

useEffect(()=>{
    dispatch(getTemperaments())
},[dispatch]);


//TODO: Handles to dispatch actions


function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
    };
    
    //TODO: handle to filter dogs created
    function handleFilter(e) {
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
    function handleOrder(e) {
    e.preventDefault();
    dispatch(alphaOrder(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    }

    //TODO: handle weight order
    function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(weightOrder(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`); //cambia estado local a ordenado
    }

    return(
        <React.Fragment>
            <div className={style.body}>
            
                <div className={style.head}>
                    <h1>Find your new best friend!</h1>
                </div>

            <div className= {style.cita}>
                <h1> "What is a dog but a machine for loving?<br/>
You introduce him to a human being giving him the mission to love.<br/>
And however ugly, perverse, deformed or stupid this human being might be<br/>
the dog loves him (or her)" Iggy Pop</h1>
            </div>

    <div className={style.created}>
    <button className={style.button}>
    <Link to='/dog'>Create New Dog</Link>
        </button>
    </div>

    <div>
    <button className={style.button} onClick={(e) => handleClick(e)}>Recharge Page</button>
    </div>

    
        
    <SearchBar></SearchBar>

    <div >
    <select onChange={e=>handleOrder(e)}>
            <option value="Asc">A to Z</option>
            <option value="desc">Z to A</option>
        </select>

        <select onChange={e=>handleOrderByWeight(e)}>
            <option value="Weight 1">Smaller</option>
            <option value="Weight 2">Bigger</option>
        </select>
        <select onChange={handlefilterByTemperaments}>
        <option value="All">Temperament</option>
        {temperament && temperament.map((e)=>{
            return(
            <option value={e.name} key={e.id}>{e.name}</option>
            )
            })}
        </select>
        <select onChange={(e)=>handleFilter(e)}>
            <option value="All">All</option>
            <option value='Created'>Created</option>
            </select>

            <div className={style.Pagination}></div>
                {allDogs.length > 8 ? (
                    <Paginado
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        paginado={paginado}
                        currentPage={currentPage}
                    />
                ): null}
            
            </div> 
            <div className={style.backCards}>
                
        {currentDogs && currentDogs.map((c)=>{  
            // console.log(c.id)
            return(
                <div className={style.Card}>
                <NavLink to={"/home" + c.id} key={c.name}>
                    <Card name={c.name} 
                    image={(c.image) || null}  
                    temperament={c.temperament}
                    weight={c.weight} 
                    key={c.id}
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