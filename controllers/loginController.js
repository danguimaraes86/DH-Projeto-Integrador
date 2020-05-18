const { Usuario } = require('../models');
const { check, validationResult, body } = require('express-validator');

const index = (req, res) => {
    return res.render('login', { title: " - Login" });
};

const login = async (req, res) => {

    let listaErros = validationResult(req);

    if (listaErros.isEmpty()) {

        const { email, senha } = req.body;
        
        const usuario = await Usuario.findOne( { where: {email} });          
        
        if (!usuario || usuario.senha != senha) {
            const erros = [
                {
                    msg: "Email ou senha errados!"
                }
            ]
            return res.render('login', { title: " - Login", erros: erros });
        };
    
        req.session.usuario = usuario;

        return res.redirect("/home");        

    } else {
        return res.render('login', { title: " - Login", erros: listaErros.errors });
    };
};

module.exports = { index, login };