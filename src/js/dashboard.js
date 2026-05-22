import { pegarEmpresas, pegarUsuarios } from './storage.js'

function normalizarTipo(tipo, usuario) {
  const valor = String(tipo || '').trim().toLowerCase()

  if (valor === 'funcionario' || valor === 'funcionário') return 'Funcionário'
  if (valor === 'gerente') return 'Gerente'
  if (valor === 'dono') return 'Dono'

  if (!valor && usuario?.setor) return 'Funcionário'

  return 'Não definido'
}

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null')

if (!usuarioLogado) {
  window.location.href = 'login.html'
}

const usuarios = pegarUsuarios()
const empresas = pegarEmpresas()

const usuario = usuarios.find(item => item.email === usuarioLogado.email) || usuarioLogado
const empresa = empresas.find(item => Number(item.id) === Number(usuario?.empresaId))

const xpAtual = Math.max(0, Math.min(Number(usuario?.xp || 0), 100))
const nivelAtual = Number(usuario?.nivel || 1)
const tipoFormatado = normalizarTipo(usuario?.tipo, usuario)

const nomeUsuario = document.getElementById('nomeUsuario')
const empresaUsuario = document.getElementById('empresaUsuario')
const tipoUsuario = document.getElementById('tipoUsuario')
const setorUsuario = document.getElementById('setorUsuario')
const barraXP = document.getElementById('barraXP')
const xpTexto = document.getElementById('xpTexto')
const abrirLeaderboard = document.getElementById('abrirLeaderboard')
const visualizarQuizzes = document.getElementById('visualizarQuizzes')
const logout = document.getElementById('logout')

if (nomeUsuario) {
  nomeUsuario.innerText = `Nome: ${usuario?.nome || '-'}`
}

if (empresaUsuario) {
  empresaUsuario.innerText = `Empresa: ${empresa?.nome || 'Não encontrada'}`
}

if (tipoUsuario) {
  tipoUsuario.innerText = `Tipo: ${tipoFormatado}`
}

if (setorUsuario) {
  setorUsuario.innerText = `Setor: ${usuario?.setor || '-'}`
}

if (barraXP) {
  barraXP.style.width = `${xpAtual}%`
}

if (xpTexto) {
  xpTexto.innerText = `Nível ${nivelAtual} — ${xpAtual}/100 XP`
}

if (abrirLeaderboard) {
  abrirLeaderboard.addEventListener('click', () => {
    window.location.href = 'leaderboard.html'
  })
}

if (visualizarQuizzes) {
  visualizarQuizzes.addEventListener('click', () => {
    window.location.href = 'quizzes.html'
  })
}

if (logout) {
  logout.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado')
    window.location.href = 'login.html'
  })
}