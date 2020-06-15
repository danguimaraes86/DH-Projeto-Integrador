const { Usuario } = require('../models');
const { validationResult } = require('express-validator');
const { compararHashDaSenha } = require('../utils/hashing')

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "554100096158-ps2ij57f92h7p9e0jdtqa6ennu50mscg.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

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

const verify = async (req, res) => {

    try{

        const { token } = req.body
    
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    
        const usuarioCadastrado = await Usuario.findOne({ where: { email: payload.email } })
    
        if (!usuarioCadastrado) {
            const usuario = await Usuario.create({
                nome: payload.name,
                nickname: payload.email.split('@')[0],
                email: payload.email,
                senha: userid,
                foto_perfil: payload.picture
            });
    
            req.session.usuario = usuario;
            
            return res.redirect("/home");     
        }

        req.session.usuario = usuarioCadastrado;

        return res.redirect('/home');
        
    }catch(erro){
        return res.status(400).json(erro)
    }
}

module.exports = { index, login, verify };
