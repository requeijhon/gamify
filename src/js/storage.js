function lerStorage(chave, valorPadrao = []) {
  try {
    const valor = localStorage.getItem(chave)

    if (valor === null) {
      return valorPadrao
    }

    return JSON.parse(valor)
  } catch (erro) {
    console.error(erro)
    return valorPadrao
  }
}

function salvarStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor))
}

export function pegarUsuarios() {
  return lerStorage('usuarios', [])
}

export function salvarUsuarios(usuarios) {
  salvarStorage('usuarios', usuarios)
}

export function pegarEmpresas() {
  return lerStorage('empresas', [])
}

export function salvarEmpresas(empresas) {
  salvarStorage('empresas', empresas)
}

export function pegarCodigos() {
  return lerStorage('codigos', [])
}

export function salvarCodigos(codigos) {
  salvarStorage('codigos', codigos)
}

export function pegarQuizzes() {
  const quizzes = lerStorage('quizzes', [])

  return quizzes.map(quiz => ({
    arquivado: false,
    xpAtivo: true,
    ...quiz
  }))
}

export function salvarQuizzes(quizzes) {
  salvarStorage('quizzes', quizzes)
}

export function pegarQuizzesFeitos() {
  return lerStorage('quizzesFeitos', [])
}

export function salvarQuizzesFeitos(quizzesFeitos) {
  salvarStorage('quizzesFeitos', quizzesFeitos)
}