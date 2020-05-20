const { Post , Imagem } = require('../models')
const moment = require('moment')

const index = async (req, res) => {
       
    const { usuario } = req.session;

    const posts = await Post.findAll({
        order: [['created_at', 'DESC']],
        include: Imagem 
    })

    return res.render('home', {title:"Home", css:"style-home.css", posts:posts, moment});
}

module.exports = { index }