const { Curtida } = require('../models')

const store = async (req, res) => {
  const { id } = req.session.usuario
  const post_id = req.params.id

  console.log(post_id)

  const curtida = await Curtida.create({
    post_id,
    usuario_id: id
  })
  console.log(curtida)

  return res.send(curtida)
}

module.exports = {
  store
}