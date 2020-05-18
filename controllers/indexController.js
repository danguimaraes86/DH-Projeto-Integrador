const index = (req, res) => {

    req.session.destroy();
    
    return res.render('index');
}

module.exports = { index }