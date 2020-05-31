const { Usuario } = require('../models')
const { validationResult } = require("express-validator")

const cadastro = (req, res) => {
    return res.render('cadastro', {title: " - Cadastro", css:'style-login-cadastro.css' });
};

const store = async (req, res) => {

    const { nome, nickname, email, senha, foto_perfil } = req.body;
    
    const fotoPerfil = ()=> {
        if(req.files.length > 0){
            return `images/fotos-perfil/${req.files[0].filename}`
        }else{
            return "images/padrao/user.jpg"
        }
    };

    const erros = validationResult(req);

    if (!erros.isEmpty()) {

        return res.render('cadastro', { 
            title: " - Cadastro",
            erros: erros.array(),
            css:'style-login-cadastro.css'
         });
    }

    const verificaSeNickNameExiste = await Usuario.findOne({
        where: { nickname }
    });

    const verificaSeEmailExiste = await Usuario.findOne({
        where: { email }
    });

    if(verificaSeNickNameExiste || verificaSeEmailExiste) {

        return res.send("email ou nickname ja existe");

    }
    
    const usuario = await Usuario.create({
      nome,
      nickname,
      email,
      senha, 
      foto_perfil: fotoPerfil()
    });

    // cria usuário na sessão ao cadastrar
    req.session.usuario = usuario;
    
    return res.redirect('/home');
}

const editar = (req, res) => {
    const { usuario } = req.session;
    return res.render('editar-perfil', { title:"Editar Perfil", css:"style-editar-perfil.css", usuario});
}

const update = async (req, res) => {

    const { nome, biografia, foto_perfil } = req.body;
    const  {id}  = req.session.usuario;
    const fotoPerfil = req.files;  

    // buscar usuário no banco
    const usuario = await Usuario.findByPk(id);    

    // Verfica se o nome vai ser alterado   
    if(usuario.nome != nome && nome != "") {
        usuario.nome = nome;
        await usuario.save();
    };

    // Verifica se a biografia vai ser alterada
    if(usuario.biografia != biografia && biografia != "") {
        usuario.biografia = biografia;
        await usuario.save();
    };    
    
    // Verfica se o usuário selecionou uma foto para altera-la
    if(fotoPerfil.length > 0){                
        if(usuario.foto_perfil != `images/fotos-perfil/${fotoPerfil[0].filename}` ) {
            usuario.foto_perfil = `images/fotos-perfil/${fotoPerfil[0].filename}`;
            await usuario.save();
        };
    };
    // Grava novos dados do usuário na sessão
    req.session.usuario = usuario
    
    return res.redirect('/home')
}

const configuracaoConta = async (req, res) => {

    const { usuario } = req.session

    return res.render('configuracao-conta', { title: 'Configurações', css: 'style-configuracao-conta.css', usuario})
}

const adicionarFavorito = async (req, res) => {

    const { id } = req.session.usuario;
    const favorito_id = req.params.id  ;  

    const usuarioLogado = await Usuario.findByPk(id);
    const favorito = await Usuario.findByPk(favorito_id) ;    
    
    await usuarioLogado.addFavorito(favorito);   

    return res.redirect('/home');
}

const removerFavorito = async (req, res) => {

    const { id } = req.session.usuario;
    const favorito_id = req.params.id  ;  

    const usuarioLogado = await Usuario.findByPk(id);
    const favorito = await Usuario.findByPk(favorito_id) ;    
   
    await usuarioLogado.removeFavorito(favorito);

    return res.redirect('/home');
}


module.exports = { 
    cadastro,
    store,
    editar,
    update,
    configuracaoConta,
    adicionarFavorito,
    removerFavorito
}