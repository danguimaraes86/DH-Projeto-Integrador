const { Usuario } = require('../models')


const index = async (req, res) => {
  
    return res.render('index');
}

module.exports = { index }