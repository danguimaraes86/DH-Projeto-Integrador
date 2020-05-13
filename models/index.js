const config = require('../configs/database')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(config)

const Usuario = require('./Usuario')(sequelize, DataTypes)

Usuario.belongsToMany(Usuario, { as: 'favorito', through: 'favoritos' })


module.exports = {
    Usuario
}