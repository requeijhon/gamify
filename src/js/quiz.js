import { pegarQuizzes, pegarQuizzesFeitos, salvarQuizzesFeitos } from './storage.js'

const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null')

if (!usuario) {
  window.location.href = 'login.html'
}

const quizAtualRaw = localStorage.getItem('quizAtual')
let quiz = null

try {
  const quizParseado = JSON.parse(quizAtualRaw)

  if (quizParseado && typeof quizParseado === 'object' && quizParseado.titulo) {
    quiz = quizParseado
  }
} catch (erro) {
  quiz = null
}

if (!quiz) {
  const quizId = Number(quizAtualRaw)

  if (!Number.isNaN(quizId)) {
    const quizzesFiltrados = pegarQuizzes().filter(item =>
      item.empresaId === usuario.empresaId &&
      item.setor === usuario.setor
    )

    quiz = quizzesFiltrados[quizId] || null
  }
}

if (!quiz || !Array.isArray(quiz.perguntas) || quiz.perguntas.length === 0) {
  window.location.href = 'quizzes.html'
}

const tituloQuiz = document.getElementById('tituloQuiz')
const timer = document.getElementById('timer')
const progressoVertical = document.getElementById('progressoVertical')
const textoProgresso = document.getElementById('textoProgresso')
const contadorPergunta = document.getElementById('contadorPergunta')
const perguntaEl = document.getElementById('pergunta')
const alternativasEl = document.getElementById('alternativas')
const proximaPerguntaBtn = document.getElementById('proximaPergunta')
const quizCardGrande = document.querySelector('.quizCardGrande')

if (!tituloQuiz || !timer || !progressoVertical || !textoProgresso || !contadorPergunta || !perguntaEl || !alternativasEl || !proximaPerguntaBtn || !quizCardGrande) {
  window.location.href = 'quizzes.html'
}

tituloQuiz.innerText = quiz.titulo

let perguntaAtual = 0
let respostasUsuario = []
let segundos = 0

const intervaloTimer = setInterval(() => {
  segundos++
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  timer.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}, 1000)

function atualizarBarra() {
  const pct = Math.floor((perguntaAtual / quiz.perguntas.length) * 100)
  progressoVertical.style.height = `${pct}%`
  textoProgresso.innerText = `${pct}%`
}

function renderizarPergunta() {
  atualizarBarra()

  const pergunta = quiz.perguntas[perguntaAtual]

  if (!pergunta) {
    finalizarQuiz()
    return
  }

  contadorPergunta.innerText = `Pergunta ${perguntaAtual + 1} de ${quiz.perguntas.length}`
  perguntaEl.innerText = pergunta.pergunta || ''

  alternativasEl.innerHTML = ''

  ;(pergunta.respostas || []).forEach((resposta, index) => {
    alternativasEl.innerHTML += `
      <label class="alternativa">
        <input type="radio" name="alternativa" value="${index}">
        ${resposta}
      </label>
    `
  })
}

function calcularBonusTempo(seg, bonusMax, limite) {
  return seg <= limite ? bonusMax : 0
}

function aplicarXpComNivel(usuarioBase, xpGanho) {
  let xp = Number(usuarioBase.xp || 0) + xpGanho
  let nivel = Number(usuarioBase.nivel || 1)

  while (xp >= 100) {
    xp -= 100
    nivel++
  }

  return { xp, nivel }
}

function finalizarQuiz() {
  clearInterval(intervaloTimer)
  perguntaAtual = quiz.perguntas.length
  atualizarBarra()

  let acertos = 0

  quiz.perguntas.forEach((p, i) => {
    if (respostasUsuario[i] === p.correta) {
      acertos++
    }
  })

  const cfg = quiz.configXp || {
    xpPorAcerto: 10,
    bonusTempoRapido: 0,
    tempoLimiteBonus: 60
  }

  const xpAcertos = acertos * Number(cfg.xpPorAcerto || 0)
  const bonus = calcularBonusTempo(
    segundos,
    Number(cfg.bonusTempoRapido || 0),
    Number(cfg.tempoLimiteBonus || 60)
  )

  const quizzesFeitos = pegarQuizzesFeitos()
  const jaFeito = quizzesFeitos.some(
    item => item.email === usuario.email && item.titulo === quiz.titulo
  )

  const xpGanho = jaFeito ? 0 : xpAcertos + bonus

  if (!jaFeito) {
    quizzesFeitos.push({
      email: usuario.email,
      titulo: quiz.titulo,
      tempo: segundos,
      acertos,
      xpGanho
    })

    salvarQuizzesFeitos(quizzesFeitos)

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const idx = usuarios.findIndex(u => u.email === usuario.email)

    if (idx !== -1) {
      const res = aplicarXpComNivel(usuarios[idx], xpGanho)
      usuarios[idx].xp = res.xp
      usuarios[idx].nivel = res.nivel

      usuario.xp = res.xp
      usuario.nivel = res.nivel

      localStorage.setItem('usuarios', JSON.stringify(usuarios))
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
    }
  }

  quizCardGrande.innerHTML = `
    <h1>Quiz Finalizado!</h1>
    <h2>Você acertou ${acertos} de ${quiz.perguntas.length}</h2>
    <p>Tempo: ${timer.innerText}</p>
    <p>XP por acertos: ${xpAcertos}</p>
    <p>Bônus de tempo: ${jaFeito ? 0 : bonus}</p>
    <p><strong>XP ganho: ${xpGanho}</strong></p>
    <p>Nível atual: ${usuario.nivel || 1} — ${usuario.xp || 0}/100 XP</p>
    ${jaFeito ? '<p style="color:#f59e0b">⚠️ Quiz já realizado — XP não concedido novamente</p>' : ''}
    <button id="btnVoltarQuizzes" type="button" style="margin-top:20px">Voltar aos Quizzes</button>
  `

  const btnVoltar = document.getElementById('btnVoltarQuizzes')
  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      localStorage.removeItem('quizAtual')
      window.location.href = 'quizzes.html'
    })
  }
}

proximaPerguntaBtn.addEventListener('click', () => {
  const selecionada = document.querySelector('input[name="alternativa"]:checked')

  if (!selecionada) {
    alert('Selecione uma resposta')
    return
  }

  respostasUsuario.push(Number(selecionada.value))
  perguntaAtual++

  if (perguntaAtual < quiz.perguntas.length) {
    renderizarPergunta()
  } else {
    finalizarQuiz()
  }
})

renderizarPergunta()