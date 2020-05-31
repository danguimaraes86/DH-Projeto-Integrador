const { Usuario } = require('../models');
const { validationResult } = require('express-validator');
const { compararHashDaSenha } = require('../utils/hashing')


const index = (req, res) => {
    return res.render('login', { title: " - Login", css:'style-login-cadastro.css' });
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    let listaErros = validationResult(req);
    
    if (!listaErros.isEmpty()) {
        
        return res.render('login', { 
                title: " - Login",
                erros: listaErros.errors,
                css:'style-login-cadastro.css'
             });
        
    }

    const usuario = await Usuario.findOne( { where: {email} });     
    
    if (usuario && await compararHashDaSenha(senha, usuario.senha)) {
        
        req.session.usuario = usuario;
        
        return res.redirect("/home");        
    }

    return res.render('login', { 
        title: " - Login",
        erros: [{ msg: "Usuario ou senha inválida." }],
        css:'style-login-cadastro.css'
        });
    
};

module.exports = { index, login };
