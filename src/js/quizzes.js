import { pegarQuizzes, pegarQuizzesFeitos } from './storage.js'

const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null')

if (!usuario) {
  window.location.href = 'login.html'
}

const visualizarQuizzes = document.getElementById('visualizarQuizzes')
if (visualizarQuizzes) {
  visualizarQuizzes.addEventListener('click', () => {
    window.location.href = 'quizzes.html'
  })
}

const voltar = document.getElementById('voltarGerente')
if (voltar) {
  voltar.addEventListener('click', () => {
    if (usuario.tipo === 'gerente') {
      window.location.href = 'gerente.html'
    } else {
      window.location.href = 'dashboard.html'
    }
  })
}

const grid = document.getElementById('gridQuizzes')

if (grid) {
  const quizzesSalvos = pegarQuizzes()

  const quizzesFiltrados = quizzesSalvos.filter(quiz =>
    String(quiz.empresaId) === String(usuario.empresaId) &&
    String(quiz.setor).trim().toLowerCase() === String(usuario.setor).trim().toLowerCase()
  )

  const mapaUnicos = new Map()

  quizzesFiltrados.forEach(quiz => {
    const chave =
      quiz.id
        ? `id:${String(quiz.id)}`
        : `titulo:${String(quiz.empresaId)}::${String(quiz.setor).trim().toLowerCase()}::${String(quiz.titulo).trim().toLowerCase()}`

    if (!mapaUnicos.has(chave)) {
      mapaUnicos.set(chave, quiz)
    }
  })

  const quizzes = [...mapaUnicos.values()]
  const quizzesFeitos = pegarQuizzesFeitos()

  if (quizzes.length === 0) {
    grid.innerHTML = `<p style="color:#9ca3af">Nenhum quiz disponível para seu setor</p>`
  } else {
    grid.innerHTML = ''

    quizzes.forEach((quiz) => {
      const arquivado = quiz.arquivado === true

      const feito = quizzesFeitos.some(item =>
        item.email === usuario.email &&
        (
          (item.quizId && quiz.id && String(item.quizId) === String(quiz.id)) ||
          (!item.quizId && item.titulo === quiz.titulo)
        )
      )

      grid.innerHTML += `
        <div class="quizCard ${arquivado ? 'quizCard--arquivado' : ''}">
          <div class="quizTopo">
            <div class="${arquivado ? 'statusAmarelo' : feito ? 'statusVerde' : 'statusAmarelo'}"></div>
            <h2>${quiz.titulo}</h2>
          </div>

          <p>Setor: ${quiz.setor}</p>
          <p>${quiz.perguntas.length} perguntas</p>

          ${arquivado ? `<p class="quizStatusArquivado">Quiz arquivado — indisponível no momento</p>` : ''}

          <button
            class="btnIniciar ${arquivado ? 'btnIniciar--disabled' : ''}"
            data-id="${quiz.id || ''}"
            data-titulo="${quiz.titulo}"
            ${arquivado ? 'disabled' : ''}
          >
            ${arquivado ? 'Quiz arquivado' : feito ? 'Refazer Quiz' : 'Iniciar Quiz'}
          </button>
        </div>
      `
    })

    document.querySelectorAll('.btnIniciar').forEach(botao => {
      botao.addEventListener('click', () => {
        if (botao.disabled) return

        const quizId = botao.dataset.id
        const quizTitulo = botao.dataset.titulo

        const quizSelecionado = quizzes.find(q => {
          if (quizId && q.id) {
            return String(q.id) === String(quizId)
          }
          return q.titulo === quizTitulo
        })

        if (!quizSelecionado || quizSelecionado.arquivado === true) return

        localStorage.setItem('quizAtual', JSON.stringify(quizSelecionado))
        window.location.href = 'quiz.html'
      })
    })
  }
}