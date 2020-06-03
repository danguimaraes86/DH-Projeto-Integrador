const { Usuario, Post, Imagem } = require('../models')
const fs = require('fs')
const path = require('path')
const moment = require('moment')

const create = (req, res) => {
    return res.render('criar-post', { title: "Criar Post", css: "style-criar-post.css" });
}

const store = async (req, res) => {

    const { id } = req.session.usuario
    const { titulo, descricao } = req.body
    const fotoPost = () => {
        if (req.files.length > 0) {
            return `images/fotos-post/${req.files[0].filename}`
        } else {
            return "null"
        }
    }

    const post = await Post.create({
        usuario_id: id,
        titulo,
        descricao
    })

    const imagem = await Imagem.create({
        caminho: fotoPost(),
        post_id: post.id
    })

    return res.redirect('/home')
}

const mostrarPostCompleto = async (req, res) => {

    const { post } = req.query

    const postCompleto = await Post.findByPk(post);
    const titularPost = await postCompleto.getUsuario();
    const imagens = await postCompleto.getImagens();
    const curtidas = await postCompleto.getCurtidas();

    const comentarios = await postCompleto.getComentarios({
        include: Usuario
    });

    return res.render('post-completo',
        {
            title: postCompleto.titulo,
            css: 'style-post-completo.css',
            postCompleto,
            imagens,
            comentarios,
            curtidas,
            titularPost,
            moment
    });
}

const editarPost = async (req, res) => {

    const { post_id } = req.params
    const { titulo, descricao } = req.body;
    const fotoPost = req.files;  

    // buscar post no banco
    const post = await Post.findByPk(post_id);
    const imagem = await Imagem.findOne({where: {post_id}})
    let verificaAlteracao = false;

    // Verfica se o titulo vai ser alterado   
    if(post.titulo != titulo && titulo != "") {
        post.titulo = titulo;
        verificaAlteracao = true
    };
    
    // Verifica se a descricao vai ser alterada
    if(post.descricao != descricao) {
        post.descricao = descricao;
        verificaAlteracao = true;
    };

    if (verificaAlteracao) {
        await post.save()
    }
    
    // Verfica se o usuário selecionou uma foto para altera-la
    if(fotoPost.length > 0){     

        await fs.unlinkSync(path.join('public', imagem.caminho))

        await Imagem.update({ caminho: `images/fotos-post/${fotoPost[0].filename}` }, {
            where: {
              post_id
            }
        });
    };

    return res.redirect('/home')
}

const excluirPost = async (req, res) => {

    const { id } = req.session.usuario
    const { post_id } = req.params

    const post = await Post.findByPk(post_id);

    if (post.usuario_id == id) {
        await Post.destroy({ where: {id: post_id}})
    }

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

const mostrarTodasCurtidasPost = async (req, res) => {
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
    mostrarTodosPostsDoSeusFavoritos,
    mostrarPostCompleto,
    editarPost,
    excluirPost
}