const { Usuario } = require('../models');
const { Op } = require('sequelize');

const index = (req, res) => {
    return res.render('pesquisa', { title: "Pesquisar Usuários", css: "style-pesquisa.css" });
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

    return res.render('pesquisa', { title: "Pesquisar Usuários", css: "style-pesquisa.css", usuarios});
}

module.exports = { index, mostrarUsuarios }