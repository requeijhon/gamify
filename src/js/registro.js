import { pegarCodigos } from './storage.js'

const btn = document.getElementById('btnCodigo')

btn.addEventListener('click', () => {
  const codigo = document.getElementById('codigo').value.trim().toUpperCase()
  const mensagem = document.getElementById('mensagem')

  if (!codigo) {
    mensagem.innerText = 'Digite o código'
    return
  }

  const codigos = pegarCodigos()
  const codigoEncontrado = codigos.find(item => item.codigo === codigo)

  if (codigoEncontrado) {
    localStorage.setItem('codigoAtual', JSON.stringify(codigoEncontrado))
    mensagem.style.color = '#4ade80'
    mensagem.innerText = 'Código válido! Redirecionando...'
    setTimeout(() => {
      window.location.href = 'cadastro.html'
    }, 800)
  } else {
    mensagem.style.color = '#f87171'
    mensagem.innerText = 'Código inválido ou expirado'
  }
})
