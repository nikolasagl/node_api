const { body } = require('express-validator')

module.exports = {

   validate(method) {

      switch (method) {
         case 'editar':
            return [
               body('dtnascimento_pes', 'O campo Data de Nascimento é obrigatório.').exists().not().isEmpty(),
               body('cpf_pes', 'O Campo CPF é obrigatório').exists().not().isEmpty(),
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