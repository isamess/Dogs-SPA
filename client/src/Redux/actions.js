import axios from 'axios';

export function getDogs(){   //conexión con el back
    return async function (dispatch){
        const json= await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getDogsName(name){  //me traigo los names del back para la SearchBar
    return async function(dispatch){
        try {
            let json= await axios.get('http://localhost:3001/dogs?name=' + name);
            return dispatch({
                type: 'GET_DOGS_NAME',
                payload: json.data
            });
        } catch (error) {
            console.log(error)
        }
    }
};

export function getTemperaments(){
    return async function(dispatch){
        try {
            let json= await axios.get('http://localhost:3001/temperament/');
            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function postDogs(payload) { 
    console.log(payload)
return async function (dispatch){
   
    let json = await axios.post("http://localhost:3001/dog/", payload); 
    
    return json;
}
};


export function dogDetail(id) { 
    return async function(dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/dogs/'+ id);
            console.log(json.data)
            return dispatch({
                type: 'DOG_DETAIL', 
                payload: json.data
            })
        } catch (error){
            console.log(error);
        }
    }
};
export function cleanDetail(){
    return{
        type:'CLEAN_DETAIL'
    }
}

export function filterDogCreated(payload){  //filtro por raza (API) o creadas (FORM)
    return {
        type: 'FILTER_DOG_CREATED',
        payload
    }
};

export function filterByTemperaments(payload){
    return {
        type: 'FILTER_BY_TEMPERAMENTS',
        payload
    }
};

export function alphaOrder(payload){
    return{
        type: 'ALPHA_ORDER',
        payload
    }
};

export function weightOrder(payload){
    return{
        type: 'WEIGHT_ORDER',
        payload
    }
};




