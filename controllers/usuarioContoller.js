const { Usuario } = require('../models')

const login = (req, res) => {
    return res.render('login', {title: " - Login"});
}

const cadastro = (req, res) => {
    return res.render('cadastro', {title: " - Cadastro"});
}

const store = async (req, res) => {

    const { nome, nickname, email, senha, foto_perfil } = req.body

    const usuario = await Usuario.create({
      nome,
      nickname,
      email,
      senha, 
      foto_perfil
    })

    return res.json(usuario)

    // return res.send(`usuario cadastrado`)
}

const editar = (req, res) => {
    return res.render('editar-perfil', { title:"Editar Perfil", css:"style-editar-perfil.css"});
}

const update = (req, res) => {
    
}

const adicionarFavorito = async (req, res) => {

    const { usuario_id, favorito_id } = req.params

    const usuarioLogado = await Usuario.findByPk(usuario_id)
    const favorito = await Usuario.findByPk(favorito_id)

    const resposta = await usuarioLogado.addFavorito(favorito)

    return res.json(resposta)

}

const exibirFavoritos = async (req, res) => {

    const { usuario_id } = req.params
    const usuarioLogado = await Usuario.findByPk(usuario_id)

    const favoritos = await usuarioLogado.getFavorito()

    return res.json(favoritos)
}

module.exports = { 
    login,
    cadastro,
    store,
    editar,
    update,
    adicionarFavorito,
    exibirFavoritos
}