import {
  pegarQuizzes,
  salvarQuizzes,
  pegarQuizzesFeitos,
  pegarUsuarios,
  salvarUsuarios
} from './storage.js'

const usuario = JSON.parse(
  localStorage.getItem('usuarioLogado') || 'null'
)

if (!usuario) {
  window.location.href = 'login.html'
}

function pegarQuizzesGerente() {
  return pegarQuizzes().filter(quiz =>
    quiz.empresaId === usuario.empresaId &&
    quiz.setor === usuario.setor &&
    quiz.arquivado !== true
  )
}

const grid = document.getElementById('gridQuizzes')

const modal = document.getElementById('modalExcluirQuiz')

const modalTitulo =
  document.getElementById('modalTitulo')

const modalTexto =
  document.getElementById('modalTexto')

const btnCancelarModal =
  document.getElementById('btnCancelarModal')

const btnArquivarQuiz =
  document.getElementById('btnArquivarQuiz')

const btnArquivarQuizXp =
  document.getElementById('btnArquivarQuizXp')

let quizSelecionado = null

function abrirModalExclusao(quiz) {

  quizSelecionado = quiz

  if (!modal || !modalTitulo || !modalTexto) {
    return
  }

  modalTitulo.textContent = 'Arquivar quiz'

  modalTexto.innerHTML = `
    Você deseja arquivar o quiz
    <strong>${quiz.titulo}</strong>?<br><br>

    O quiz será movido para a área
    de quizzes arquivados,
    onde você poderá:
    <br>• restaurar o quiz;
    <br>• ativar/desativar XP;
    <br>• excluir permanentemente.
  `

  modal.classList.add('show')
}

function fecharModalExclusao() {

  quizSelecionado = null

  if (modal) {
    modal.classList.remove('show')
  }
}

function removerXpDoQuiz(quiz) {

  const quizzesFeitos = pegarQuizzesFeitos()

  const usuarios = pegarUsuarios()

  const registrosDoQuiz = quizzesFeitos.filter(
    item => item.titulo === quiz.titulo
  )

  registrosDoQuiz.forEach(registro => {

    const idx = usuarios.findIndex(
      u => u.email === registro.email
    )

    if (idx === -1) return

    let xpAtual = Number(
      usuarios[idx].xp || 0
    )

    let nivelAtual = Number(
      usuarios[idx].nivel || 1
    )

    let xpRemover = Number(
      registro.xpGanho || 0
    )

    while (xpRemover > 0) {

      if (xpAtual >= xpRemover) {

        xpAtual -= xpRemover
        xpRemover = 0

      } else {

        if (nivelAtual > 1) {

          xpRemover -= xpAtual
          nivelAtual--
          xpAtual = 100

        } else {

          xpAtual = Math.max(
            0,
            xpAtual - xpRemover
          )

          xpRemover = 0
        }
      }
    }

    usuarios[idx].xp = Math.max(0, xpAtual)

    usuarios[idx].nivel = Math.max(
      1,
      nivelAtual
    )
  })

  salvarUsuarios(usuarios)
}

function arquivarQuiz(
  quiz,
  removerXp = false
) {

  const todos = pegarQuizzes()

  const indiceReal = todos.findIndex(
    q => q.titulo === quiz.titulo
  )

  if (indiceReal !== -1) {

    todos[indiceReal].arquivado = true

    if (removerXp) {

      todos[indiceReal].xpAtivo = false

      removerXpDoQuiz(quiz)
    }

    salvarQuizzes(todos)
  }

  fecharModalExclusao()

  renderizarQuizzes()
}

function renderizarQuizzes() {

  const quizzesGerente =
    pegarQuizzesGerente()

  grid.innerHTML = ''

  if (quizzesGerente.length === 0) {

    grid.innerHTML = `
      <p style="color:#9ca3af">
        Nenhum quiz criado ainda
      </p>
    `

    return
  }

  quizzesGerente.forEach(
    (quiz, index) => {

      const card = document.createElement('div')

      card.className = 'quizCard'

      card.innerHTML = `
        <h2>${quiz.titulo}</h2>

        <p>
          ${quiz.perguntas.length} perguntas
        </p>

        <div class="acoesQuiz">

          <button class="editarQuiz">
            Editar
          </button>

          <button class="excluirQuiz">
            Arquivar
          </button>

        </div>
      `

      const btnEditar =
        card.querySelector('.editarQuiz')

      const btnArquivar =
        card.querySelector('.excluirQuiz')

      btnEditar.addEventListener('click', () => {

        localStorage.setItem(
  'quizEdicao',
  JSON.stringify(quiz)
)

        window.location.href =
          'quiz-manager.html'
      })

      btnArquivar.addEventListener('click', () => {

        abrirModalExclusao(quiz)
      })

      grid.appendChild(card)
    }
  )
}

btnCancelarModal?.addEventListener(
  'click',
  fecharModalExclusao
)

btnArquivarQuiz?.addEventListener(
  'click',
  () => {

    if (!quizSelecionado) return

    arquivarQuiz(
      quizSelecionado,
      false
    )
  }
)

btnArquivarQuizXp?.addEventListener(
  'click',
  () => {

    if (!quizSelecionado) return

    arquivarQuiz(
      quizSelecionado,
      true
    )
  }
)

window.addEventListener('click', evento => {

  if (evento.target === modal) {
    fecharModalExclusao()
  }
})

renderizarQuizzes()