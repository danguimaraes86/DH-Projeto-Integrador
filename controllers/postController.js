const { Usuario, Post, Imagem } = require('../models')

const create = (req, res) => {
    return res.render('criar-post',{title:"Criar Post", css:"style-criar-post.css"});
}

const store = async (req, res) => {

    const { usuario_id } = req.params
    const { caminho, titulo, descricao } = req.body

    const post = await Post.create({
        usuario_id,
        titulo,
        descricao
    })

    const imagem = await Imagem.create({
        caminho,
        post_id: post.id
    })

    return res.json({post, imagem})
}

const show = async (req, res) => {

    const { usuario_id } = req.params

    const posts = await Post.findAll({
        where: { usuario_id },
        include: Usuario 
    })

    return res.json(posts);
}




module.exports = { 
    create,
    store,
    show 
}