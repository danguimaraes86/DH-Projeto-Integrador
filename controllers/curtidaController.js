const { Curtida, Post } = require('../models')

const store = async (req, res) => {

    const { id } = req.session.usuario
    const post_id = req.params.id

    let statusCurtida = '';

    const verificaSeJaCurtiu = await Curtida.findOne({
        where: { usuario_id: id, post_id }
    })

    if (verificaSeJaCurtiu) {
        await Curtida.destroy({
            where: { usuario_id: id, post_id }
        })
        statusCurtida = ''
    } else {
        await Curtida.create({
            post_id,
            usuario_id: id
        })
        statusCurtida = 'curtida'
    }

    const postCompleto = await Post.findByPk(post_id);
    const curtidas = await postCompleto.getCurtidas();
    
    return res.status(200).json({
        qtdCurtida: curtidas.length,
        status: statusCurtida
    })

}

module.exports = {
    store
}