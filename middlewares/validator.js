const { check, body } = require('express-validator')

exports.validarCadastro =  [
  check("nome")
      .exists()
      .isLength({min: 1 , max: 50}).withMessage('Tamanho maximo 50 characters'),
       
  body("email")
      .exists()
      .isEmail().withMessage('utilize um formato de e-mail'),
  
  body("nickname").isAlphanumeric()
      .isLength({ min: 3, max: 15 }).withMessage('Cadastre um nick de 3 a 15 caracters!')
      .notEmpty(),
  
      check("senha", "Senha é obrigatório!")
      .notEmpty()
      .isLength({
        min: 6
      })
      .withMessage("A senha precisa de no minimo 6 characters!")

] 

exports.validarLogin = [
  check('email').isEmail().withMessage("Digite um email!"),
  check('senha').isLength({min:3}).withMessage("A senha deve conter no minímo 3 caracteres"),
]
