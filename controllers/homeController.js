const { Post, Imagem, Usuario, Curtida } = require('../models')
const moment = require('moment')

const index = async (req, res) => {

    const { id } = req.session.usuario

    const usuarioLogado = await Usuario.findByPk(id)
    const favoritos = await usuarioLogado.getFavorito();

    const favoritoID = favoritos.map(curr => {
        return curr.id
    });

    const feedFavorito = true;
    
    let posts
    if (feedFavorito) {
        posts = await Post.findAll({
            where: {usuario_id: favoritoID },
            order: [['created_at', 'DESC']],
            include: [
                Usuario,
                Imagem,
                Curtida
            ]
        })
    } else {
        posts = await Post.findAll({
            order: [['created_at', 'DESC']],
            include: [
                Usuario,
                Imagem,
                Curtida
            ]
        })
    }

    return res.render('home', { title: "Home", css: "style-home.css", posts, favoritos, moment });
}

module.exports = { index }