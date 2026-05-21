import { pegarEmpresas } from './storage.js'

const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null')

if (!usuario) {
  window.location.href = 'login.html'
}

const empresas = pegarEmpresas()
const empresa = empresas.find(item => item.id === usuario?.empresaId)

const xpAtual = Number(usuario?.xp || 0)
const nivelAtual = Number(usuario?.nivel || 1)

document.getElementById('nomeUsuario').innerText = `Nome: ${usuario?.nome}`
document.getElementById('empresaUsuario').innerText = `Empresa: ${empresa?.nome || 'Não encontrada'}`
document.getElementById('tipoUsuario').innerText = `Tipo: ${usuario?.tipo}`
document.getElementById('setorUsuario').innerText = `Setor: ${usuario?.setor}`
document.getElementById('barraXP').style.width = `${xpAtual}%`
document.getElementById('xpTexto').innerText = `Nível ${nivelAtual} — ${xpAtual}/100 XP`

const abrirLeaderboard = document.getElementById('abrirLeaderboard')
if (abrirLeaderboard) {
  abrirLeaderboard.addEventListener('click', () => {
    window.location.href = 'leaderboard.html'
  })
}

const visualizarQuizzes = document.getElementById('visualizarQuizzes')
if (visualizarQuizzes) {
  visualizarQuizzes.addEventListener('click', () => {
    window.location.href = 'quizzes.html'
  })
}

const logout = document.getElementById('logout')
if (logout) {
  logout.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado')
    window.location.href = 'login.html'
  })
}
