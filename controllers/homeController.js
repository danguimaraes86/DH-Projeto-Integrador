const { Post, Imagem, Usuario, Curtida } = require('../models')
const moment = require('moment')

const index = async (req, res) => {
       
    const { id } = req.session.usuario

    const posts = await Post.findAll({
        order: [['created_at', 'DESC']],
        include: [
            Usuario,
            Imagem,
            Curtida
        ]
    })

    const usuarioLogado = await Usuario.findByPk(id)
    const favoritos = await usuarioLogado.getFavorito()    

    return res.render('home', {title:"Home", css:"style-home.css", posts, favoritos, moment});
}

module.exports = { index }