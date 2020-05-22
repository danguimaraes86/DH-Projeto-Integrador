const { Post , Imagem, Usuario } = require('../models')
const moment = require('moment')

const index = async (req, res) => {
       
    const { usuario } = req.session;

    const posts = await Post.findAll({
        order: [['created_at', 'DESC']],
        include: [
            Usuario,
            Imagem
        ]
    })

    return res.render('home', {title:"Home", css:"style-home.css", posts, moment});
}

module.exports = { index }