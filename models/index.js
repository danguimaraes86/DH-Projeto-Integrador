const config = require('../configs/database')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(config)

const Usuario = require('./Usuario')(sequelize, DataTypes)
const Post = require('./Post')(sequelize, DataTypes)
const Imagem = require('./Imagem')(sequelize, DataTypes)
const Curtida = require('./Curtida')(sequelize, DataTypes)
const Comentario = require('./Comentario')(sequelize, DataTypes)

Usuario.belongsToMany(Usuario, { as: 'favorito', through: 'favoritos' })

// Relacionamentos Posts
Usuario.hasMany(Post , { foreignKey: 'usuario_id' })
Post.belongsTo(Usuario)

Post.hasMany(Imagem, { foreignKey: 'post_id' })
Imagem.belongsTo(Post)

// Relacionamentos Curitdas
Usuario.hasMany(Curtida, { foreignKey: 'usuario_id' })
Curtida.belongsTo(Usuario)

Post.hasMany(Curtida, { foreignKey: 'post_id' })
Curtida.belongsTo(Post)

// Relacionamentos Comentarios

Usuario.hasMany(Comentario, { foreignKey: 'usuario_id' })
Comentario.belongsTo(Usuario)

Post.hasMany(Comentario, { foreignKey: 'post_id' })
Comentario.belongsTo(Post)

module.exports = {
    Usuario,
    Post,
    Imagem,
    Curtida,
    Comentario
}