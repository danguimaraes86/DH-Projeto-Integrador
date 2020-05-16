const { Usuario } = require('../models')

const index = (req, res) => {
    return res.render('login', {title: " - Login"});
}

const create = async (req, res) => {
    const {email, senha} = req.body

    const usuario = await Usuario.findOne({
        where:{
            email:email
        }
    });
   // console.log(usuario)
    if (!usuario || usuario.senha != senha) {
        return res.render('login', {title: " - Login"});
    }else{
        req.session.usuario = {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        }
        //res.locals.usuario = usuario;
        return res.redirect('/home');
        //return res.render('home',{title: " - Home", css: "style-home.css"})
    }
}

module.exports = {
    index,
    create
}