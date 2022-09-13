const { Router } = require('express');

const dogsRouter= require('./dogs.js');
const dogRouter= require('./dog.js');
const temperamentRouter= require('./temperament.js')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRouter);
router.use("/temperament", temperamentRouter)
router.use("/dog", dogRouter);


module.exports = router;
