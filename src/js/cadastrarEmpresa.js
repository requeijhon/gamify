import { pegarEmpresas, salvarEmpresas, pegarUsuarios, salvarUsuarios } from './storage.js'

const btn = document.getElementById('btnCadastrarEmpresa')

btn.addEventListener('click', () => {
  const nomeEmpresa = document.getElementById('nomeEmpresa').value.trim()
  const setoresRaw = document.getElementById('setores').value.trim()
  const nome = document.getElementById('nome').value.trim()
  const email = document.getElementById('email').value.trim()
  const senha = document.getElementById('senha').value.trim()
  const mensagem = document.getElementById('mensagem')

  mensagem.innerText = ''

  if (!nomeEmpresa || !nome || !email || !senha) {
    mensagem.style.color = '#f87171'
    mensagem.innerText = 'Preencha todos os campos obrigatórios'
    return
  }

  const setores = setoresRaw
    ? setoresRaw.split(',').map(s => s.trim()).filter(Boolean)
    : ['Administração']

  const empresas = pegarEmpresas()

  // Garante ID único
  const empresaId = empresas.length > 0
    ? Math.max(...empresas.map(e => e.id)) + 1
    : 1

  empresas.push({ id: empresaId, nome: nomeEmpresa, setores })
  salvarEmpresas(empresas)

  const usuarios = pegarUsuarios()
  const emailJaExiste = usuarios.some(u =>
    u.email?.trim().toLowerCase() === email.toLowerCase()
  )

  if (emailJaExiste) {
    mensagem.style.color = '#f87171'
    mensagem.innerText = 'Este email já está em uso'
    return
  }

  usuarios.push({
    nome,
    email,
    senha,
    empresaId,
    tipo: 'dono',
    setor: 'Administração',
    xp: 0,
    nivel: 1
  })

  salvarUsuarios(usuarios)

  mensagem.style.color = '#4ade80'
  mensagem.innerText = 'Empresa criada com sucesso!'

  setTimeout(() => {
    window.location.href = 'login.html'
  }, 800)
})
