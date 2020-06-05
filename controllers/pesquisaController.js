const { Usuario } = require('../models');
const { Op } = require('sequelize');

const index = async (req, res) => {

    // Busca usuário pelo nome ou nickname
    const usuarios = await Usuario.findAll();

    const usuarioLogado = await Usuario.findByPk(req.session.usuario.id)
    let favoritosUsuarioLogado = await usuarioLogado.getFavorito()
    favoritosUsuarioLogado = favoritosUsuarioLogado.map(f => f.id)

    return res.render('pesquisa', { title: "Pesquisar Usuários", css: "style-pesquisa.css", usuarios, favoritosUsuarioLogado });
};

const mostrarUsuarios = async (req, res) => {

    const { pesquisarUsuario } = req.body;

    // Busca usuário pelo nome ou nickname
    const usuarios = await Usuario.findAll({
        where: {
            [Op.or]: {
                nome: {
                    [Op.like]: `%${pesquisarUsuario}%`
                },
                nickname: {
                    [Op.like]: `%${pesquisarUsuario}%`
                },
            },
        }
    });

    const usuarioLogado = await Usuario.findByPk(req.session.usuario.id)
    let favoritosUsuarioLogado = await usuarioLogado.getFavorito()
    favoritosUsuarioLogado = favoritosUsuarioLogado.map(f => f.id)

    return res.render('pesquisa', { title: "Pesquisar Usuários", css: "style-pesquisa.css", usuarios, favoritosUsuarioLogado });
}

module.exports = { index, mostrarUsuarios }