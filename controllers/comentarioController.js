const { Comentario } = require('../models')

const store = async (req, res) => {
  
  const { id } = req.session.usuario
  const { post } = req.query

  const { descricao } = req.body

  const comentario = await Comentario.create({
    post_id: post,
    usuario_id: id,
    descricao
  })

  return res.redirect('/home#' + post_id)
}

module.exports = {
  store
}