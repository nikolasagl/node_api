const UsuarioHelper = {
   
   setCpfMask: (valor) => {
      return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
  },

  setCnpjMask: (valor) => {
      return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
  }
}

module.exports = UsuarioHelper