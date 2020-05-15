module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define('comentarios', {
      descricao: DataTypes.STRING
  })
  return Comentario
}