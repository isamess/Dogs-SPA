const initialState = {
    dogs : [],
    allDogs : [],   
    orderDogs : [],
    weightDogs : [], 
    temperament : [],
    details : [],

};


// reducer evalúa las modificaciones
//no lleva brake porque cada caso retorna algo: un estado. 
//Crea un nuevo estado global y lo retorna
function rootReducer(state= initialState, action){ // siempre recibe un state (estado actual) y una action
    switch(action.type){    //switch cambia dependiendo del tipo de acción necesaria
        case'GET_DOGS':
        return{
            ...state,
            dogs: action.payload,
            allDogs: action.payload
        };

        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperament: action.payload
            };

            case 'FILTER_DOG_CREATED':
                const dogsFiltered = action.payload === 'Created' ? state.allDogs.filter(d => d.createdInDb) 
                : state.allDogs.filter(d => !d.createdInDb);
                return{
                    ...state,
                    dogs: action.payload === 'All'? state.allDogs : dogsFiltered
                }
                case 'DOG_DETAIL':
                return {
                    ...state,
                    details: action.payload
                };
    
            case 'GET_DOGS_NAME':
                return {
                    ...state,
                    dogs: action.payload
                };
    
            case 'POST_DOG': 
                return {
                    ...state,
    
                };


                case 'ALPHA_ORDER':
                    const orderDogs = action.payload === 'Asc' ? //si el value es 'Asc'
            state.dogs.sort(function(a, b) { //ordeno de A a Z
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }) ://o de Z a A
            state.dogs.sort(function(a, b) {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            });
            return {    
                ...state,
                dogs: orderDogs
            };

            case 'WEIGHT_ORDER':
                const weightDogs = action.payload === 'Weight 1' ? 
                state.dogs.sort(function(a, b) { 
                    if(typeof action.payload.weight === 'string'){
                        if (a.weight > b.weight) return 1
                        if (a.weight < b.weight) return -1
                        return 0;
                    } else {//lo paso a num para la comparativa
                        if (parseInt(a.weight) > parseInt(b.weight)) return 1
                        if (parseInt(a.weight) < parseInt(b.weight)) return -1
                        return 0;
                    }
                }) :
                //si el valor de la acción no es 'weight 1' 
                state.dogs.sort(function(a, b) {//ordeno de mayor a menor
                    if(typeof action.payload.weight === 'string'){
                        if (a.weight > b.weight) return -1
                        if (a.weight < b.weight) return 1
                        return 0;
                    } else {
                        if (parseInt(a.weight) > parseInt(b.weight)) return -1
                        if (parseInt(a.weight) < parseInt(b.weight)) return 1
                        return 0
                    }
                }); 
                return { 
                    ...state,
                    dogs: weightDogs
                };

                case 'FILTER_BY_TEMPERAMENTS':
                    let filterByTemp;
                    if(action.payload==='All'){
                        filterByTemp=state.allDogs;
                    }else{
                        filterByTemp = state.allDogs.filter((d)=>d.temperament).filter((dfiltered)=>dfiltered.temperament.includes(action.payload));
                    }
                    return{
                        ...state,
                        dogs: filterByTemp
                    };
                    case 'CLEAN_DETAIL':
                        return{
                            ...state,
                            details:[]
                        }

        default:
            return state;


    }

};

export default rootReducer;