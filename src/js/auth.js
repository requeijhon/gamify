import { pegarCodigos, salvarCodigos } from './storage.js'

// BUG FIX: usuario era lido no topo sem null check.
// Se a página abria sem sessão, usuario.empresaId causava crash.
const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

if (!usuario) {
  window.location.href = 'login.html'
}

function gerarCodigo() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let codigo = ''
  for (let i = 0; i < 6; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
  }
  return codigo
}

function criarCodigo(tipo) {
  const codigos = pegarCodigos()
  const novoCodigo = gerarCodigo()

  codigos.push({
    codigo: novoCodigo,
    empresaId: usuario.empresaId,
    tipo
  })

  salvarCodigos(codigos)

  const resultado = document.getElementById('resultado')
  if (resultado) {
    resultado.innerHTML = `
      <div style="margin-top:16px; background:#374151; padding:16px; border-radius:12px;">
        <p style="font-size:13px; color:#9ca3af; margin-bottom:8px;">Código gerado (${tipo}):</p>
        <h2 style="letter-spacing:6px; color:#60a5fa; font-size:28px;">${novoCodigo}</h2>
        <p style="font-size:12px; color:#6b7280; margin-top:8px;">Compartilhe este código com o usuário para cadastro.</p>
      </div>
    `
  }
}

const btnGerente = document.getElementById('gerarGerente')
if (btnGerente) {
  btnGerente.addEventListener('click', () => criarCodigo('gerente'))
}

const btnFuncionario = document.getElementById('gerarFuncionario')
if (btnFuncionario) {
  btnFuncionario.addEventListener('click', () => criarCodigo('funcionario'))
}
