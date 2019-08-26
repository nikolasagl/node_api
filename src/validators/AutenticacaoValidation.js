const { check } = require('express-validator')

module.exports = {

   validate(method) {

      switch (method) {
         case 'login':
            return [
               check('username', 'O Campo CPF/CNPJ é obrigatório')
                  .exists()
                  .not().isEmpty(),

               check('password', 'O campo Senha é obrigatório.')
                  .exists()
                  .not().isEmpty(),

               check('radio')
                  .exists()
                  .isInt()
            ]
         
         case 'recuperar': 
            return [
               check('username', 'O Campo CPF/CNPJ é obrigatório')
                  .exists()
                  .not().isEmpty(),

               check('radio')
                  .exists()
                  .isInt()
            ]
      }
   }
}