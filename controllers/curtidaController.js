const { Curtida } = require('../models')

const store = async (req, res) => {
  const { usuario_id, post_id } = req.params

  const curtida = await Curtida.create({
    post_id,
    usuario_id
  })

  return res.json(curtida)
}

module.exports = {
  store
}