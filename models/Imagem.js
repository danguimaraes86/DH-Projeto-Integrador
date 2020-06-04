module.exports = (sequelize, DataTypes) => {
    const Imagem = sequelize.define('imagens', {
        caminho: DataTypes.STRING,
        arquivo: DataTypes.STRING
    })
    return Imagem
}