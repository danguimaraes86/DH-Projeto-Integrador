const bcrypt = require('bcryptjs')

module.exports = {
  gerarHashDaSenha: async (senha) => {
    try {
      const hash = await bcrypt.hash(senha, 8)

      return hash
    } catch (error) {
      return error
    }
  },

  compararHashDaSenha: async (senha, hash) => {
    const comparedHash = await bcrypt.compare(senha, hash)
    
    return comparedHash
  }
}
