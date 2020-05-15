const { Comentario } = require('../models')

const store = async (req, res) => {
  const { usuario_id, post_id } = req.params
  const { descricao } = req.body

  const comentario = await Comentario.create({
    post_id,
    usuario_id,
    descricao
  })

  return res.json(comentario)
}

module.exports = {
  store
}