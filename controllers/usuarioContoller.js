const login = (req, res) => {
    return res.render('login');
}

const cadastro = (req, res) => {
    return res.render('cadastro');
}

const store = (req, res) => {
    return res.send(`usuario cadastrado`)
}

const editar = (req, res) => {
    return res.render('editar-perfil');
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