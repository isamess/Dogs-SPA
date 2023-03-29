const axios= require ('axios');
const { Dog, Temperament}= require('../db');

//TODO: get all dogs from API
const getApiInfo= async()=>{
    const apiUrl= await axios.get('https://api.thedogapi.com/v1/breeds?');
    console.log(apiUrl);
    const appiInfo= await apiUrl.data.map(dogui=>{
         return {
            id:dogui.id,
            name:dogui.name,
            minHeight: Number(dogui.height.metric.split("-")[0] || 0),
            maxHeight: Number(dogui.height.metric.split("-")[1] || 0),
            minWeight: Number(dogui.weight.metric.split("-")[0] || 0),
            maxWeight: Number(dogui.weight.metric.split("-")[1] || 0),
            life_span:dogui.life_span,
            temperament:dogui.temperament?.includes(",")
            ?dogui.temperament?.split(",").map((temp) => temp.trim())
            :dogui.temperament?.split(),
            image:dogui.image.url,
        };
    });
    // console.log("LO QUE ME DEVUELVE LA API: ", appiInfo);
    return appiInfo;
   
};

//TODO: controller to bring info from DB
const getDbInfo=async()=>{
    return await Dog.findAll({   //esperamos que nuestro modelo haga un findAll
        include:{
            model:Temperament,
            attributes:['name'],
            through:{
                attributes:[],  //comprobación de los atributos
            },
        }
    })
};


//TODO: run functions an concat all info
const getAllDogs= async()=>{
    const appiInfo= await getApiInfo();
    const dbInfo= await getDbInfo();
    const infoTotal= appiInfo.concat(dbInfo);
    return infoTotal;
}

const getTemperaments= async(req, res) => {
    try {
        const temperamentApi = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
        
        let temperaments = temperamentApi.map((a) => a.temperament).join().split(',').filter(t => t);
        temperaments = [...new Set(temperaments)].sort();
        
        console.log(temperaments)
        temperaments= temperaments.map((t)=>{
            return {
                name: t,
            };
        }).filter((e)=>e.name)

        const allTemperaments= await Temperament.bulkCreate(temperaments);
        res.send(allTemperaments);
    } catch (error){
        console.log(error)

    }
};

module.exports= {
    getDbInfo,
    getAllDogs,
    getTemperaments
};
