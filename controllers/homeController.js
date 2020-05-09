const index = (req, res) => {
    return res.render('home', {title:"Home", css:"style-home.css"});
}

module.exports = { index }