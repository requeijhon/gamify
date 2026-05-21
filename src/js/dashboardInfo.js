import { pegarEmpresas } from './storage.js'

const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null')

if (!usuario) {
  window.location.href = 'login.html'
}

const empresas = pegarEmpresas()
const empresa = empresas.find(item => item.id === usuario?.empresaId)

function set(id, texto) {
  const el = document.getElementById(id)
  if (el) el.innerText = texto
}

set('nomeUsuario', `Nome: ${usuario?.nome || '-'}`)
set('empresaUsuario', `Empresa: ${empresa?.nome || 'Não encontrada'}`)
set('tipoUsuario', `Cargo: ${usuario?.tipo || '-'}`)
set('setorUsuario', `Setor: ${usuario?.setor || '-'}`)

const abrirQuiz = document.getElementById('abrirQuiz')
if (abrirQuiz) {
  abrirQuiz.addEventListener('click', () => {
    window.location.href = 'quiz-manager.html'
  })
}

const gerenciarQuizzes = document.getElementById('gerenciarQuizzes')
if (gerenciarQuizzes) {
  gerenciarQuizzes.addEventListener('click', () => {
    window.location.href = 'gerenciar-quizzes.html'
  })
}

const abrirLeaderboard = document.getElementById('abrirLeaderboard')
if (abrirLeaderboard) {
  abrirLeaderboard.addEventListener('click', () => {
    window.location.href = 'leaderboard.html'
  })
}