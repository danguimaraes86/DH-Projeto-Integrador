const index = (req, res) => {

    req.session.destroy();
    
    return res.render('index', { title:'veg.me', css:"style-index.css"});
}

module.exports = { index }