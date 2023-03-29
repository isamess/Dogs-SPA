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
        const obj= {name, height, weight, life_span, image, createdInDb} //no se pasa temperamento porque tengo que hacer la relacion aparte
        const dogCreated= await Dog.create(obj);
        
        let tempsDB = await Temperament.findAll({ //busco temperamento en la DB según el modelo que me llega por body
            where: {
              name: temperament,  //trae temperaments q conciden con el modelo que estoy pasando por body
            },
          });
        dogCreated.addTemperament(tempsDB)  // método de sql
        console.log(dogCreated)
        res.status(200).send("Dog created succesfully")
        }catch(error){
        console.log(error)
    }
});




module.exports = router;