const { Usuario } = require('../models')

const index = (req, res) => {
    return res.render('login', {title: " - Login"});
}

const create = (req, res) => {
    
}

module.exports = {
    index,
    create
}