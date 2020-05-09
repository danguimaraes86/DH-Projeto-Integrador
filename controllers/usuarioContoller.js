const login = (req, res) => {
    return res.render('login', {title: " - Login"});
}

const cadastro = (req, res) => {
    return res.render('cadastro', {title: " - Cadastro"});
}

const store = (req, res) => {
    return res.send(`usuario cadastrado`)
}

const editar = (req, res) => {
    return res.render('editar-perfil', { title:"Editar Perfil", css:"style-editar-perfil.css"});
}

const upDate = (req, res) => {
    
}

module.exports = { 
    login,
    cadastro,
    store,
    editar,
    upDate
 }