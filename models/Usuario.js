module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuarios', {
        nome: DataTypes.STRING,
        nickname: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        foto_perfil: DataTypes.STRING,
        biografia: DataTypes.STRING
    })
    return Usuario
}