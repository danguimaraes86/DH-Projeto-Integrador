const { Usuario, Post, Imagem } = require('../models')

const create = (req, res) => {
    return res.render('criar-post',{title:"Criar Post", css:"style-criar-post.css"});
}

const store = async (req, res) => {

    const { id } = req.session.usuario
    const { titulo, descricao } = req.body
    const fotoPost = ()=> {
        if(req.files.length > 0){
            return `images/fotos-post/${req.files[0].filename}`
        }else{
            return "null"
        }
    }    

    const post = await Post.create({
        usuario_id:id,
        titulo,
        descricao
    })
    
    const imagem = await Imagem.create({
        caminho:fotoPost(),
        post_id: post.id
    })

    return res.redirect('/home')
}

// Pega todos os posts de um usario para mostra lo no perfil do usuario que estamos visitando
const mostrarTodosPostsDeUmUsuario = async (req, res) => {

    const { usuario_id } = req.params

    const posts = await Post.findAll({
        where: { usuario_id },
        include: Usuario,
        limit: 10 
    })

    return res.json(posts);
}

const mostrarTodosPostsNoFeed = async (req, res) => {

    const posts = await Post.findAll({
        order: [['created_at', 'DESC']],
        limit: 10 
    })

    return res.json(posts);
}

const mostrarTodosPostsDoSeusFavoritos = async (req, res) => {
    
    const { usuario_id } = req.params // usuario logado
    const usuarioLogado = await Usuario.findByPk(usuario_id)

    const favoritos = await usuarioLogado.getFavorito()

    const favorito_id = favoritos.map(favorito => {
       return favorito.id
    });
    
    const postsDosFavoritos = await Post.findAll({
        where: {
            usuario_id: favorito_id
        },
        order: [['created_at', 'DESC']],
        limit: 10
    })

    return res.json(postsDosFavoritos)
}

const mostrarTodasCurtidasPost = async (req ,res) => {
    const { post_id } = req.params
  
    const post = await Post.findByPk(post_id)
  
    const curtidas = await post.getCurtidas()
    
    const quantidadeCurtidas = curtidas.length

    const usuario_id = curtidas.map(usuario => {
        return usuario.usuario_id
    })
 
    const usuarioQueCurtiu = await Usuario.findAll({
        where: { id: usuario_id }
    })

    const nomeUsuario = usuarioQueCurtiu.map(usuario => {
        return usuario.nome
    })

    return res.json({ quantidadeCurtidas, nomeUsuario })
}

const mostrarTodosComentariosDeUmPost = async (req, res) => {
    const { post_id } = req.params

    const post = await Post.findByPk(post_id)

    const comentarios = await post.getComentarios()

    return res.json(comentarios)
}



module.exports = { 
    create,
    store,
    mostrarTodosPostsDeUmUsuario,
    mostrarTodasCurtidasPost,
    mostrarTodosComentariosDeUmPost,
    mostrarTodosPostsNoFeed,
    mostrarTodosPostsDoSeusFavoritos
}