module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('posts', {
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
    })
    return Post
}