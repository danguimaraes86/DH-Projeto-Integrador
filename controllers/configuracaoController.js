const { Usuario } = require('../models');
const { compararHashDaSenha } = require('../utils/hashing');
const { gerarHashDaSenha } = require('../utils/hashing');
const { validationResult } = require("express-validator");
const nodemailer = require('../configs/emailController');
require("dotenv").config();

const index = (req, res) => {
    return res.render('configuracao-conta', { title: "Configuração", css: "style-configuracao-conta.css" });

}

const update = async (req, res) => {

    const { novoNickname, novoEmail, novaSenha, senhaAtual } = req.body;
    const { senha } = req.session.usuario;
    let dadosValidacao = [];
    
    if (await compararHashDaSenha(senhaAtual, senha)) {

        const erros = validationResult(req);
        
        if (!erros.isEmpty()) {
            
            const {errors: [...listaErros]} = erros

            return res.render('configuracao-conta',
                {
                    title: "Configuração",
                    css: "style-configuracao-conta.css",
                    dadosValidacao: listaErros
                });
        }

        const { id } = req.session.usuario;
        const usuarioLogado = await Usuario.findByPk(id);

        // Verifica se nickname já existe no banco
        const nickname = await Usuario.findOne({
            where: { nickname: novoNickname }
        })
        // Verifica se email já existe no banco
        const email = await Usuario.findOne({
            where: { email: novoEmail }
        })

        // verifica se existe e se campo não veio vazio e faz a troca do nickname
        if (!nickname && novoNickname !== "") {
            usuarioLogado.nickname = novoNickname;
            await usuarioLogado.save();
            dadosValidacao.push({ msg: "Nickname alterado com sucesso" });
        } else if (nickname) {
            dadosValidacao.push({ msg: "Nickname já existe !" });
        }

        // verifica se existe e se campo não veio vazio e faz a troca do email
        if (!email && novoEmail !== "") {
            usuarioLogado.email = novoEmail;
            await usuarioLogado.save();
            dadosValidacao.push({ msg: "Email alterado com sucesso" });
        } else if (email) {
            dadosValidacao.push({ msg: "Email já existe !" });
        }

        // verifica se existe e se campo não veio vazio e se tem mais de 3 caracteres e faz a troca da senha
        if (novaSenha) {
            usuarioLogado.senha = await gerarHashDaSenha(novaSenha);
            await usuarioLogado.save();
            dadosValidacao.push({ msg: "Senha alterada com sucesso" });
        }

        if (!dadosValidacao) {
            return res.redirect('/configuracao/usuario');
        }

        req.session.usuario = usuarioLogado;

        return res.render('configuracao-conta',
            {
                title: "Configuração",
                css: "style-configuracao-conta.css",
                dadosValidacao
            });

    } else {
        dadosValidacao.push({ msg: "Senha incorreta, tente novamente!" });
        return res.render('configuracao-conta',
            {
                title: "Configuração",
                css: "style-configuracao-conta.css",
                dadosValidacao
            });
    }
}

const destroy = async (req, res) => {

    const { senhaAtual } = req.body;
    const { senha } = req.session.usuario;

    let dadosValidacao = [];

    if (await compararHashDaSenha(senhaAtual, senha)) {
        const { id } = req.session.usuario;
        Usuario.destroy({
            where: { id: id }
        })
        return res.redirect('/')

    } else {
        dadosValidacao.push({ msg: "Senha incorreta, tente novamente!" });
        return res.render('configuracao-conta',
            {
                title: "Configuração",
                css: "style-configuracao-conta.css",
                dadosValidacao
            });
    }
}

const recuperarSenha = async (req, res) => {

    const { email } = req.body;    
    const usuario = await Usuario.findOne({where:{email}})
    
    if(!usuario){
        return res.render('login', { 
            title: " - Login",
            erros: [{ msg: "Email não encontrado." }],
            css:'style-login-cadastro.css'
            });
    }

    const url = `${process.env.BASE_URL_APP}/configuracao/senha/alterar`
    
    let emailEnvio = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Veg.me recuperação de senha',
        text: `Ola ${usuario.nome} segue seu token: ${usuario.senha}
        acesse o link: ${url}`,
        html: `<h1>Ola ${usuario.nome}</h1><p>segue seu token: ${usuario.senha}</p><p>acesse o link para alterar sua senha:<a href="${url}"> ${url} </a> </p>`
    }
  
    nodemailer.sendMail(emailEnvio, (error)=>{
        if(error){
            console.log(error);           
        }else{
            console.log('Email enviado com sucesso!');            
        }
    })    
    return res.render('login', { 
        title: " - Login",
        erros: [{ msg: "Token enviado para seu email" }],
        css:'style-login-cadastro.css'
        });
    }

    const indexAlterarSenha = async (req, res) => {
        return res.render('alterar-senha', { title: " - Alterar senha", css:'style-login-cadastro.css' });
    }

    const alterarSenha = async (req, res) => {

        const { token, novaSenha } = req.body

        const usuario = await Usuario.findOne({where: { senha:token }})

        if(!usuario){
            return res.render('alterar-senha', { 
                title: " - Alterar senha",
                erros: [{ msg: "Token invalido." }],
                css:'style-login-cadastro.css'
                });
        }
        
        if (novaSenha && novaSenha.length >= 6) {
            usuario.senha = await gerarHashDaSenha(novaSenha);
            await usuario.save();
            return res.render('alterar-senha', { 
                title: " - Alterar senha",
                erros: [{ msg: "Senha alterada com sucesso." }],
                css:'style-login-cadastro.css'
                });            
        }else{
            return res.render('alterar-senha', { 
                title: " - Alterar senha",
                erros: [{ msg: "A senha deve conter no minímo 6 caracteres." }],
                css:'style-login-cadastro.css'
                }); 
        }
    }

module.exports = { index, update, destroy, recuperarSenha, indexAlterarSenha, alterarSenha }