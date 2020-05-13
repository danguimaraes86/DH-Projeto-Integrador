const config = require('../configs/database')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(config)

const Usuario = require('./Usuario')(sequelize, DataTypes)
const Post = require('./Post')(sequelize, DataTypes)
const Imagem = require('./Imagem')(sequelize, DataTypes)

Usuario.belongsToMany(Usuario, { as: 'favorito', through: 'favoritos' })

// Relacionamentos Posts
Usuario.hasMany(Post , { foreignKey: 'usuario_id' })
Post.belongsTo(Usuario)

Post.hasMany(Imagem, { foreignKey: 'post_id' })
Imagem.belongsTo(Post)

module.exports = {
    Usuario,
    Post,
    Imagem
}