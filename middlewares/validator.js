const { check, body } = require('express-validator')

exports.validarCadastro =  [
  check("nome")
      .exists()
      .isLength({min: 1 , max: 50})
      .withMessage('Tamanho maximo 50 characters'),
  
  check("nickname")
      .exists()
      .isLength({ min: 3, max: 15 })
      .withMessage('Cadastre um nick de 3 a 15 caracters!'),

  check("email")
      .exists()
      .isEmail()
      .withMessage('utilize um formato de e-mail'),
  
  check("senha", "Senha é obrigatório!")
      .notEmpty()
      .isLength({
        min: 6
      })
      .withMessage("A senha precisa de no minimo 6 characters!")

] 

exports.validarLogin = [
  check('email').isEmail().withMessage("Digite um email!"),
  check('senha').isLength({min:3}).withMessage("A senha deve conter no minímo 6 caracteres"),
]

exports.validarConfiguracao = [
  check("novoNickname")
      .optional({ checkFalsy: true })
      .exists()
      .isLength({ min: 3, max: 15 })
      .withMessage('Cadastre um nick de 3 a 15 caracters!'),
  check('novoEmail')
      .optional({ checkFalsy: true })
      .isEmail()
      .withMessage("Digite um email!"),
  check("novaSenha", "Senha é obrigatório!")
      .optional({ checkFalsy: true })
      .isLength({
        min: 6
      })
      .withMessage("A senha precisa de no minimo 6 characters!")
]