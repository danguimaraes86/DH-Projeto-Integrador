const { Curtida } = require('../models')

const store = async (req, res) => {

  const url = req.header('Referer')

  const { id } = req.session.usuario
  const post_id = req.params.id

  const verificaSeJaCurtiu = await Curtida.findOne({
    where: { usuario_id: id, post_id }
  })

  if (verificaSeJaCurtiu) {
    await Curtida.destroy({
      where: { usuario_id: id, post_id }
    })
  } else {
    await Curtida.create({
      post_id,
      usuario_id: id
    })
  }

  if (url.includes('/home')) {
    return res.redirect(`${url}#${post_id}`)
  } else {
    return res.redirect(url)
  }

}

module.exports = {
  store
}