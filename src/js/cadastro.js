import { pegarUsuarios, salvarUsuarios, pegarEmpresas } from './storage.js'

const codigoAtual = JSON.parse(localStorage.getItem('codigoAtual') || 'null')
const mensagem = document.getElementById('mensagem')
const selectSetor = document.getElementById('setor')
const btn = document.getElementById('btnCadastrar')

if (!codigoAtual) {
  mensagem.style.color = '#f87171'
  mensagem.innerText = 'Código de cadastro inválido. Volte e use um código válido.'
} else {
  const empresas = pegarEmpresas()
  const empresa = empresas.find(item => item.id === codigoAtual.empresaId)

  if (!empresa) {
    mensagem.style.color = '#f87171'
    mensagem.innerText = 'Empresa não encontrada'
  } else {
    // BUG FIX: empresa.setores pode ser undefined se criada sem setores
    const setores = Array.isArray(empresa.setores) ? empresa.setores : []

    if (setores.length === 0) {
      selectSetor.innerHTML += `<option value="Geral">Geral</option>`
    } else {
      setores.forEach(setor => {
        const s = setor.trim()
        if (s) {
          selectSetor.innerHTML += `<option value="${s}">${s}</option>`
        }
      })
    }

    btn.addEventListener('click', () => {
      const nome = document.getElementById('nome').value.trim()
      const email = document.getElementById('email').value.trim()
      const senha = document.getElementById('senha').value.trim()
      const setor = document.getElementById('setor').value.trim()

      mensagem.innerText = ''

      if (!nome || !email || !senha || !setor) {
        mensagem.style.color = '#f87171'
        mensagem.innerText = 'Preencha todos os campos'
        return
      }

      const usuarios = pegarUsuarios()
      const emailJaExiste = usuarios.some(u =>
        u.email?.trim().toLowerCase() === email.toLowerCase()
      )

      if (emailJaExiste) {
        mensagem.style.color = '#f87171'
        mensagem.innerText = 'Este email já está cadastrado'
        return
      }

      usuarios.push({
        nome,
        email,
        senha,
        setor,
        empresaId: codigoAtual.empresaId,
        tipo: codigoAtual.tipo,
        xp: 0,
        nivel: 1
      })

      salvarUsuarios(usuarios)
      localStorage.removeItem('codigoAtual')

      mensagem.style.color = '#4ade80'
      mensagem.innerText = 'Conta criada com sucesso!'

      setTimeout(() => {
        window.location.href = 'login.html'
      }, 800)
    })
  }
}
