import React from "react";
import style from './paginado.module.css';



export default function Paginado({dogsPerPage, allDogs, paginado, currentPage}){
    const numberOfPage=[];

    const maxPage= Math.ceil(allDogs/dogsPerPage);
    for(let i=1; i<= maxPage; i++){
        numberOfPage.push(i)
    }
    return(
        <div className={style.body}>
            <nav className={style.nav}>
                <ul className={style.ul}>
                    {currentPage >1 ?(
                        <li onClick={()=> paginado(currentPage - 1)}>
                            <button className={style.li}>Prev</button>
                        </li>
                    ): null}
                    <li onClick={()=> paginado(currentPage)}>
                        <button className= {style.button}>{currentPage}</button>
                    </li>

                    {currentPage < allDogs/dogsPerPage ?(
                        <li onClick={()=> paginado(currentPage + 1)}>
                            <button className= {style.li}>Next</button>
                        </li>
                    ): null}
                    
                    
                </ul>
            </nav>
        </div>
    );
    
}