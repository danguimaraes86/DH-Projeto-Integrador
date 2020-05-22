const { Curtida } = require('../models')
// const { pegarIdDoPost } = require('../public/js/pegarIdPost')

const store = async (req, res) => {
  const { id } = req.session.usuario
  const post_id = req.params.id
  // const post_id = pegarIdDoPost()

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