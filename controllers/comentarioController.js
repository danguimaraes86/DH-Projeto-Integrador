const { Comentario } = require('../models')

const store = async (req, res) => {

    const url = req.header('Referer')

    const { id } = req.session.usuario
    const { post } = req.query

    const { descricao } = req.body

    const comentario = await Comentario.create({
        post_id: post,
        usuario_id: id,
        descricao
    })

    if (url.includes('/home')) {
        return res.redirect(`${url}#${post}`)
    } else {
        return res.redirect(url)
    }

}

const excluirComentario = async (req, res) => {

    const url = req.header('Referer')

    const { id } = req.params;

    await Comentario.destroy({ where: {id}})
    
    return res.redirect(url)

}

module.exports = {
    store,
    excluirComentario
}