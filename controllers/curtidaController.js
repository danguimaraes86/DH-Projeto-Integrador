const { Curtida } = require('../models')

const store = async (req, res) => {
  const { id } = req.session.usuario
  const post_id = req.params.id

  const verificaSeJaCurtiu = await Curtida.findOne({
    where: { usuario_id: id, post_id }
  })
  console.log(verificaSeJaCurtiu)

  if(verificaSeJaCurtiu) {
    await Curtida.destroy({
      where: { usuario_id: id, post_id }
    })
  } else {
    await Curtida.create({
      post_id,
      usuario_id: id
    })
  }


  return res.redirect('/home#' + post_id)
}

module.exports = {
  store
}