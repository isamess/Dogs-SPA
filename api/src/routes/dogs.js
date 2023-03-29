const { Router } = require('express');
const router = Router();
const {getAllDogs}= require('../controllers/controllers')
const axios= require('axios');
const { Dog} = require('../db');


//TODO:get dogs and look for a query name
router.get('/', async (req, res)=>{
    try {
        const {name}= req.query             
     const dogsTotal= await getAllDogs();
    //  console.log(dogsTotal)
        if(name){
            const dogName= await dogsTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
            dogName.length?
            res.status(200).send(dogName):
            res.status(404).send("We are sorry, don't have that dog");
        }else{
    //if there is not query send them all
            res.status(200).send(dogsTotal)   
        }
    } catch (error) {
        console.log(error)
    }
});

//TODO:Look for ID.Express takes ID as parameter
router.get("/:id", async (req, res, next) => {
    try {
    const {id}= req.params;

    if (typeof id === "string" && id.length > 8) {
    let dogDetails = await Dog.findByPk(id);
    console.log(dogDetails)
    res.json({
        name: dogDetails.name,
        id: dogDetails.id,
        height: dogDetails.height,
        weight: dogDetails.weight,
        life_span: dogDetails.life_span,
        temperament: dogDetails.temperament,
        image: dogDetails.image,
    });
    } else {
    let dog = await axios.get("https://api.thedogapi.com/v1/breeds?");
    let dogDetails = dog.data.find((d) => d.id === parseInt(id));
    return res.json({
        name: dogDetails.name,
        id: dogDetails.id,
        height: dogDetails.height.metric,
        weight: dogDetails.weight.metric.split(" - ")[0],
        life_span: dogDetails.life_span,
        temperament: dogDetails.temperament,
        image: dogDetails.image.url,
    });
    }
} catch (error) {
    next(error);
}
});

module.exports= router;