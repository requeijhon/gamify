import {
  pegarQuizzes,
  salvarQuizzes,
  pegarQuizzesFeitos,
  pegarUsuarios,
  salvarUsuarios
} from './storage.js'

const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null')

if (!usuario) {
  window.location.href = 'login.html'
}

const grid = document.getElementById('gridArquivados')

function removerXpDoQuiz(quiz) {
  const quizzesFeitos = pegarQuizzesFeitos()
  const usuarios = pegarUsuarios()

  const registros = quizzesFeitos.filter(item => String(item.quizId) === String(quiz.id))

  registros.forEach(registro => {
    const usuarioIndex = usuarios.findIndex(u => u.email === registro.email)

    if (usuarioIndex === -1) return

    usuarios[usuarioIndex].xp -= Number(registro.xpGanho || 0)

    if (usuarios[usuarioIndex].xp < 0) {
      usuarios[usuarioIndex].xp = 0
    }
  })

  salvarUsuarios(usuarios)
}

function devolverXpDoQuiz(quiz) {
  const quizzesFeitos = pegarQuizzesFeitos()
  const usuarios = pegarUsuarios()

  const registros = quizzesFeitos.filter(item => String(item.quizId) === String(quiz.id))

  registros.forEach(registro => {
    const usuarioIndex = usuarios.findIndex(u => u.email === registro.email)

    if (usuarioIndex === -1) return

    usuarios[usuarioIndex].xp += Number(registro.xpGanho || 0)
  })

  salvarUsuarios(usuarios)
}

function renderizarArquivados() {
  const quizzes = pegarQuizzes()

  const arquivados = quizzes.filter(
    quiz =>
      quiz.empresaId === usuario.empresaId &&
      quiz.setor === usuario.setor &&
      quiz.arquivado === true
  )

  grid.innerHTML = ''

  if (arquivados.length === 0) {
    grid.innerHTML = `<p style="color:#9ca3af">Nenhum quiz arquivado</p>`
    return
  }

  arquivados.forEach(quiz => {
    const card = document.createElement('div')
    card.className = 'quizCard'

    card.innerHTML = `
      <div>
        <h2>${quiz.titulo}</h2>
        <p>${quiz.perguntas.length} perguntas</p>

        <p style="margin-top:10px">
          XP:
          <strong style="color:${quiz.xpAtivo ? '#16A34A' : '#DC2626'}">
            ${quiz.xpAtivo ? 'Ativado' : 'Desativado'}
          </strong>
        </p>
      </div>

      <div class="acoesQuiz">
        <button class="editarQuiz">Restaurar</button>
        <button class="btn-teal btnXp">
          ${quiz.xpAtivo ? 'Desativar XP' : 'Ativar XP'}
        </button>
        <button class="excluirQuiz">Excluir</button>
      </div>
    `

    const btnRestaurar = card.querySelector('.editarQuiz')
    const btnXp = card.querySelector('.btnXp')
    const btnExcluir = card.querySelector('.excluirQuiz')

    btnRestaurar.addEventListener('click', () => {
      quiz.arquivado = false
      salvarQuizzes(quizzes)
      renderizarArquivados()
    })

    btnXp.addEventListener('click', () => {
      quiz.xpAtivo = !quiz.xpAtivo

      if (quiz.xpAtivo) {
        devolverXpDoQuiz(quiz)
      } else {
        removerXpDoQuiz(quiz)
      }

      salvarQuizzes(quizzes)
      renderizarArquivados()
    })

    btnExcluir.addEventListener('click', () => {
      const confirmar = confirm('Deseja excluir este quiz permanentemente?')
      if (!confirmar) return

      const indiceReal = quizzes.findIndex(q => String(q.id) === String(quiz.id))

      if (indiceReal !== -1) {
        quizzes.splice(indiceReal, 1)
      }

      salvarQuizzes(quizzes)
      renderizarArquivados()
    })

    grid.appendChild(card)
  })
}

renderizarArquivados()