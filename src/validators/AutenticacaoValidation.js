const { body } = require('express-validator')

module.exports = {

   validate(method) {

      switch (method) {
         case 'login':
            return [
               body('username', 'O Campo CPF/CNPJ é obrigatório').exists().not().isEmpty(),
               body('password', 'O campo Senha é obrigatório.').exists().not().isEmpty(),
               body('radio').exists().isInt()
            ]
         
         case 'recuperar': 
            return [
               body('username', 'O Campo CPF/CNPJ é obrigatório').exists().not().isEmpty(),
               body('radio').exists().isInt()
            ]
      }
   },
}