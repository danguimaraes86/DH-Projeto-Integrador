const { Usuario } = require('../models');

const index = (req, res) => {
    return res.render('configuracao-conta', { title: "Configuração", css: "style-configuracao-conta.css" });

}

const update = async (req, res) => {

    const { id } = req.session.usuario
    const { novoNickname, novoEmail, novaSenha, senhaAtual } = req.body;


    if (req.session.usuario.senha === senhaAtual) {

        const usuarioLogado = await Usuario.findByPk(id)

        // Verifica se nickname já existe no banco
        const nickname = await Usuario.findOne({
            where: { nickname: novoNickname }
        })
        // Verifica se email já existe no banco
        const email = await Usuario.findOne({
            where: { email: novoEmail }
        })

        // verifica se existe e se campo não veio vazio e faz a troca do nickname
        if (!nickname && novoNickname != "") {
            usuarioLogado.nickname = novoNickname;
            await usuarioLogado.save();
            req.session.usuario = usuarioLogado
        } else if (nickname) {
            const resposta = { msg: "Nickname já existe!" }
            return res.render('configuracao-conta',
                {
                    title: "Configuração",
                    css: "style-configuracao-conta.css",
                    resposta
                });
        }

        // verifica se existe e se campo não veio vazio e faz a troca do email
        if (!email && novoEmail != "") {
            usuarioLogado.email = novoEmail;
            await usuarioLogado.save();
            req.session.usuario = usuarioLogado
        } else if (email) {
            const resposta = { msg: "Email já existe!" }
            return res.render('configuracao-conta',
                {
                    title: "Configuração",
                    css: "style-configuracao-conta.css",
                    resposta
                });
        }

        if (novaSenha != "") {
            usuarioLogado.senha = novaSenha;
            await usuarioLogado.save();
        }

        const resposta = { msg: "Dados alterados com sucesso!" }
        return res.render('configuracao-conta',
            {
                title: "Configuração",
                css: "style-configuracao-conta.css",
                resposta
            });



    } else {
        const resposta = { msg: "Senha incorreta, tente novamente!" }
        return res.render('configuracao-conta',
            {
                title: "Configuração",
                css: "style-configuracao-conta.css",
                resposta
            });
    }
}

module.exports = { index, update }