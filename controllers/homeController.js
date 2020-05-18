const index = (req, res) => {
       
    const { usuario } = req.session;
    
    return res.render('home', {title:"Home", css:"style-home.css"});
}

module.exports = { index }