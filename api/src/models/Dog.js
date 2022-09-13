const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {                                  //columnas de nuestra DB
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, 
      primaryKey : true
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type:DataTypes.STRING,
      allowNull:false,
      
    },
    weight:{
      type:DataTypes.STRING,
      allowNull:false,
      
    },
    life_span:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb:{  //esta prop me facilita traer a los personajes que creo en mi DB
      type:DataTypes.BOOLEAN,
      allowNull: true,
      defaultvalue: true,
    },

  }, { timestamps: false});
};
