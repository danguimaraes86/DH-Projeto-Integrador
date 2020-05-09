const create = (req, res) => {
    return res.render('criar-post',{title:"Criar Post", css:"style-criar-post.css"});
}

const store = (req, res) => {
   return res.send(`Post criado`)
}

const show = (req, res) => {
    return res.render('post-completo',{title:"Post Completo", css:"style-post-completo.css"});
}




module.exports = { 
    create,
    store,
    show 
}