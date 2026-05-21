import {
  pegarQuizzes,
  salvarQuizzes
} from './storage.js'

const usuario = JSON.parse(
  localStorage.getItem('usuarioLogado') || 'null'
)

if (!usuario) {
  window.location.href = 'login.html'
}

const quizEditando = JSON.parse(
  localStorage.getItem('quizEditando') || 'null'
)

const tituloQuiz =
  document.getElementById('tituloQuiz')

const perguntaInput =
  document.getElementById('pergunta')

const respostasContainer =
  document.getElementById('respostas')

const btnAdicionarResposta =
  document.getElementById('adicionarResposta')

const btnAdicionarPergunta =
  document.getElementById('adicionarPergunta')

const btnSalvarQuiz =
  document.getElementById('salvarQuiz')

const listaPerguntas =
  document.getElementById('listaPerguntas')

let perguntas = []

function criarCampoResposta(
  texto = '',
  correta = false
) {

  const div = document.createElement('div')

  div.className = 'respostaItem'

  div.innerHTML = `
    <input
      type="radio"
      name="respostaCorreta"
      ${correta ? 'checked' : ''}
    >

    <input
      type="text"
      placeholder="Digite uma resposta"
      value="${texto}"
    >
  `

  respostasContainer.appendChild(div)
}

function limparCamposPergunta() {

  perguntaInput.value = ''

  respostasContainer.innerHTML = ''

  for (let i = 0; i < 4; i++) {
    criarCampoResposta()
  }
}

function renderizarPerguntas() {

  listaPerguntas.innerHTML = ''

  perguntas.forEach((pergunta, index) => {

    const card = document.createElement('div')

    card.className = 'quizCard'

    card.innerHTML = `
      <h2>
        ${index + 1}. ${pergunta.pergunta}
      </h2>

      <p>
        ${pergunta.respostas.length} respostas
      </p>
    `

    listaPerguntas.appendChild(card)
  })
}

function adicionarPergunta() {

  const pergunta = perguntaInput.value.trim()

  if (!pergunta) {
    alert('Digite a pergunta')
    return
  }

  const respostas = []

  let respostaCorreta = -1

  const itensResposta =
    respostasContainer.querySelectorAll(
      '.respostaItem'
    )

  itensResposta.forEach((item, index) => {

    const texto =
      item.querySelector(
        'input[type=\"text\"]'
      ).value.trim()

    const radio =
      item.querySelector(
        'input[type=\"radio\"]'
      )

    if (texto) {

      respostas.push(texto)

      if (radio.checked) {
        respostaCorreta = respostas.length - 1
      }
    }
  })

  if (respostas.length < 2) {
    alert('Adicione ao menos duas respostas')
    return
  }

  if (respostaCorreta === -1) {
    alert('Selecione a resposta correta')
    return
  }

  perguntas.push({
    pergunta,
    respostas,
    correta: respostaCorreta
  })

  renderizarPerguntas()

  limparCamposPergunta()
}

function salvarQuizFinal() {

  const titulo = tituloQuiz.value.trim()

  if (!titulo) {
    alert('Digite o título do quiz')
    return
  }

  if (perguntas.length === 0) {
    alert('Adicione ao menos uma pergunta')
    return
  }

  const quizzes = pegarQuizzes()

  const novoQuiz = {
    titulo,
    perguntas,
    setor: usuario.setor,
    empresaId: usuario.empresaId,
    arquivado: false,
    xpAtivo: true
  }

  if (quizEditando) {

    const indiceQuiz = quizzes.findIndex(
      q => q.titulo === quizEditando.titulo
    )

    if (indiceQuiz !== -1) {

      quizzes[indiceQuiz] = {
        ...quizEditando,
        ...novoQuiz
      }
    }

    localStorage.removeItem('quizEditando')

  } else {

    quizzes.push(novoQuiz)
  }

  salvarQuizzes(quizzes)

  alert(
    quizEditando
      ? 'Quiz atualizado com sucesso!'
      : 'Quiz criado com sucesso!'
  )

  window.location.href =
    'gerenciar-quizzes.html'
}

btnAdicionarResposta?.addEventListener(
  'click',
  () => {
    criarCampoResposta()
  }
)

btnAdicionarPergunta?.addEventListener(
  'click',
  adicionarPergunta
)

btnSalvarQuiz?.addEventListener(
  'click',
  salvarQuizFinal
)

if (quizEditando) {

  tituloQuiz.value =
    quizEditando.titulo || ''

  perguntas = [
    ...(quizEditando.perguntas || [])
  ]

  renderizarPerguntas()
}

limparCamposPergunta()