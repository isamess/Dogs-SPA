const { Router } = require("express");
const router = Router();
const { Dog, Temperament } = require('../db');
const axios= require('axios');

//Route to POST a new dog, data from body 
router.post('/', async(req, res)=>{
    const{
        name,
        height,
        weight,
        life_span,
        image,
        temperament,
        createdInDb,
    }=req.body     //destructuramos desde el body
    console.log(req.body)
    if(!name || !height || !weight)res.status(400).json({msg:"Missing data"})
    try{
        const obj= {name, height, weight, life_span, image, createdInDb}
        const dogCreated= await Dog.create(obj);
        
        let temps = await Temperament.findAll({
            where: {
              name: temperament,
            },
          });
        dogCreated.addTemperament(temps)
        console.log(dogCreated)
        res.status(200).send(dogCreated)
        }catch(error){
        console.log(error)
    }
});

// router.post('/', async(req, res)=>{
//     const{name, height, weight, life_span, image, temperament, createdInDb}=req.body
//     if(!name || !height || !weight)res.status(400).json({msg:"Missing data"})
//     try {
//         const obj={name, height, weight, life_span, image, temperament, createInDb}
//         const newDog= await Dog.create(obj)
//         newDog.addTemperament(temperament)
//         res.send(newDog)
//     } catch (error) {
//         console.log(error)
//     }
// });


module.exports = router;