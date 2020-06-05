const { Curtida,Post } = require('../models')

const store = async (req, res) => {



  const { id } = req.session.usuario
  const post_id = req.params.id

  const postCompleto = await Post.findByPk(post_id);
  //const titularPost = await postCompleto.getUsuario();
  //const imagens = await postCompleto.getImagens();
  const curtidas = await postCompleto.getCurtidas();

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

 
    return res.status(200).json({qtdCurtida:curtidas.length})
  

}

module.exports = {
  store
}