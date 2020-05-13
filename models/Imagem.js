module.exports = (sequelize, DataTypes) => {
    const Imagem = sequelize.define('imagens', {
        caminho: DataTypes.STRING
    })
    return Imagem
}