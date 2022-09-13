const { DataTypes } = require('sequelize');// nos permite darle datos a nuestras columnas de la tabla de la DB

module.exports = (sequelize) => {

sequelize.define('temperament', {
name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Intelligent, Alert",
},
},  { timestamps: false});
};
