
const { Usuario, Post } = require('../models')
const index = async (req, res) => {
    const usuario_id = req.session.usuario.id;

    const usuarios = await Usuario.findByPk(usuario_id);
    

    const usuario = {
        nome: usuarios.nome,
        foto_perfil:usuarios.foto_perfil,
        biografia: usuarios.biografia,
    }
    
    const posts = await Post.findAll({
        order: [['created_at', 'DESC']]
    })

    console.log(post)
    return res.render('home', {title:"Home", css:"style-home.css",usuario});
}

module.exports = { index }