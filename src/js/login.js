import { pegarUsuarios, salvarUsuarios } from './storage.js'

const btnLogin = document.getElementById('btnLogin')
const btnCriarConta = document.getElementById('btnCriarConta')
const btnEmpresa = document.getElementById('btnEmpresa')

btnCriarConta.addEventListener('click', () => {
  window.location.href = 'registro.html'
})

btnEmpresa.addEventListener('click', () => {
  window.location.href = 'cadastrar-empresa.html'
})

btnLogin.addEventListener('click', () => {
  const email = document.getElementById('email').value.trim()
  const senha = document.getElementById('senha').value.trim()
  const mensagem = document.getElementById('mensagem')

  mensagem.innerText = ''

  if (!email || !senha) {
    mensagem.innerText = 'Preencha email e senha'
    return
  }

  const usuarios = pegarUsuarios()

  // Remove usuarios corrompidos (sem nome/email/senha)
  const usuariosValidos = usuarios.filter(u =>
    u.nome?.trim() && u.email?.trim() && u.senha?.trim()
  )
  if (usuariosValidos.length !== usuarios.length) {
    salvarUsuarios(usuariosValidos)
  }

  const encontrado = usuariosValidos.find(u =>
    u.email.trim().toLowerCase() === email.toLowerCase() &&
    u.senha.trim() === senha
  )

  if (encontrado) {
    localStorage.setItem('usuarioLogado', JSON.stringify(encontrado))
    mensagem.innerText = 'Login realizado!'

    setTimeout(() => {
      if (encontrado.tipo === 'dono') {
        window.location.href = 'dono.html'
      } else if (encontrado.tipo === 'gerente') {
        window.location.href = 'gerente.html'
      } else {
        window.location.href = 'dashboard.html'
      }
    }, 800)
  } else {
    mensagem.innerText = 'Email ou senha incorretos'
  }
})
