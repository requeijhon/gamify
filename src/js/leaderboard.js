const usuario = JSON.parse(
  localStorage.getItem('usuarioLogado') || 'null'
)

if (!usuario) {
  window.location.href = 'login.html'
}

const usuarios = JSON.parse(
  localStorage.getItem('usuarios')
) || []

const quizzes = JSON.parse(
  localStorage.getItem('quizzes')
) || []

const quizzesFeitos = JSON.parse(
  localStorage.getItem('quizzesFeitos')
) || []

const voltarPagina =
  document.getElementById('voltarPagina')

const tituloLeaderboard =
  document.getElementById('tituloLeaderboard')

const subtituloLeaderboard =
  document.getElementById('subtituloLeaderboard')

const leaderboardBody =
  document.getElementById('leaderboardBody')

const mensagemLeaderboard =
  document.getElementById('mensagemLeaderboard')

if (voltarPagina) {
  voltarPagina.addEventListener('click', () => {
    if (usuario.tipo === 'dono') {
      window.location.href = 'dono.html'
    } else if (usuario.tipo === 'gerente') {
      window.location.href = 'gerente.html'
    } else {
      window.location.href = 'dashboard.html'
    }
  })
}

function formatarTempo(segundos) {
  if (!segundos || segundos <= 0) {
    return '-'
  }

  const minutos = Math.floor(segundos / 60)
  const resto = segundos % 60

  return `${String(minutos).padStart(2, '0')}:${String(resto).padStart(2, '0')}`
}

function calcularTaxaAcertoNumero(registrosUsuario) {
  if (registrosUsuario.length === 0) {
    return 0
  }

  let totalAcertos = 0
  let totalPerguntas = 0

  registrosUsuario.forEach(registro => {
    totalAcertos += Number(registro.acertos || 0)

    const quiz = quizzes.find(item =>
      item.titulo === registro.titulo
    )

    if (quiz) {
      totalPerguntas += quiz.perguntas.length
    }
  })

  if (totalPerguntas === 0) {
    return 0
  }

  return Math.round((totalAcertos / totalPerguntas) * 100)
}

function calcularTempoMedioNumero(registrosUsuario) {
  if (registrosUsuario.length === 0) {
    return 0
  }

  const somaTempo = registrosUsuario.reduce((total, item) => {
    return total + Number(item.tempo || 0)
  }, 0)

  return Math.round(somaTempo / registrosUsuario.length)
}

function obterClasseAcerto(taxa) {
  if (taxa >= 80) return 'badgeSucesso'
  if (taxa >= 50) return 'badgeAviso'
  return 'badgePerigo'
}

function obterClassePendencia(pendentes) {
  if (pendentes === 0) return 'badgeSucesso'
  if (pendentes <= 2) return 'badgeAviso'
  return 'badgePerigo'
}

function obterClasseTempo(tempoMedio) {
  if (tempoMedio === 0) return 'badgeNeutro'
  if (tempoMedio <= 60) return 'badgeSucesso'
  if (tempoMedio <= 120) return 'badgeAviso'
  return 'badgePerigo'
}

function obterMedalha(posicao) {
  if (posicao === 0) {
    return '<span class="medalha medalhaOuro">🥇 1º</span>'
  }

  if (posicao === 1) {
    return '<span class="medalha medalhaPrata">🥈 2º</span>'
  }

  if (posicao === 2) {
    return '<span class="medalha medalhaBronze">🥉 3º</span>'
  }

  return `<span class="rankNumero">${posicao + 1}º</span>`
}

function filtrarFuncionariosVisiveis() {
  const funcionarios = usuarios.filter(item =>
    item.tipo === 'funcionario' &&
    item.empresaId === usuario.empresaId
  )

  if (usuario.tipo === 'dono') {
    tituloLeaderboard.innerText = 'Ranking geral da empresa'
    subtituloLeaderboard.innerText =
      'Todos os funcionários da empresa'
    return funcionarios
  }

  if (usuario.tipo === 'gerente') {
    tituloLeaderboard.innerText = 'Ranking do setor'
    subtituloLeaderboard.innerText =
      `Funcionários do setor ${usuario.setor}`
    return funcionarios.filter(item =>
      item.setor === usuario.setor
    )
  }

  tituloLeaderboard.innerText = 'Ranking do seu setor'
  subtituloLeaderboard.innerText =
    `Comparativo entre funcionários do setor ${usuario.setor}`

  return funcionarios.filter(item =>
    item.setor === usuario.setor
  )
}

function obterQuizzesDisponiveis(funcionario) {
  return quizzes.filter(quiz =>
    quiz.empresaId === funcionario.empresaId &&
    quiz.setor === funcionario.setor
  )
}

function montarDadosLeaderboard() {
  const funcionarios = filtrarFuncionariosVisiveis()

  return funcionarios.map(funcionario => {
    const registrosUsuario = quizzesFeitos.filter(item =>
      item.email === funcionario.email
    )

    const quizzesDisponiveis =
      obterQuizzesDisponiveis(funcionario)

    const quizzesFeitosCount =
      registrosUsuario.length

    const quizzesPendentes =
      Math.max(
        quizzesDisponiveis.length - quizzesFeitosCount,
        0
      )

    const taxaAcertoNumero =
      calcularTaxaAcertoNumero(registrosUsuario)

    const tempoMedioNumero =
      calcularTempoMedioNumero(registrosUsuario)

    return {
      nome: funcionario.nome,
      email: funcionario.email,
      setor: funcionario.setor,
      nivel: Number(funcionario.nivel || 1),
      xp: Number(funcionario.xp || 0),
      quizzesFeitos: quizzesFeitosCount,
      quizzesPendentes,
      taxaAcertoNumero,
      tempoMedioNumero
    }
  }).sort((a, b) => {
    if (b.nivel !== a.nivel) {
      return b.nivel - a.nivel
    }

    if (b.xp !== a.xp) {
      return b.xp - a.xp
    }

    if (a.quizzesPendentes !== b.quizzesPendentes) {
      return a.quizzesPendentes - b.quizzesPendentes
    }

    if (b.taxaAcertoNumero !== a.taxaAcertoNumero) {
      return b.taxaAcertoNumero - a.taxaAcertoNumero
    }

    return a.nome.localeCompare(b.nome)
  })
}

function renderizarLeaderboard() {
  const dados = montarDadosLeaderboard()

  leaderboardBody.innerHTML = ''
  mensagemLeaderboard.innerText = ''

  if (dados.length === 0) {
    mensagemLeaderboard.innerText =
      'Nenhum funcionário encontrado para este ranking'
    return
  }

  dados.forEach((item, index) => {
    const linhaUsuarioLogado =
      item.email === usuario.email ? 'linhaAtual' : ''

    leaderboardBody.innerHTML += `
      <tr class="${linhaUsuarioLogado}">
        <td>${obterMedalha(index)}</td>
        <td>
          <div class="nomeRanking">
            <strong>${item.nome}</strong>
            ${item.email === usuario.email ? '<span class="tagVoce">Você</span>' : ''}
          </div>
        </td>
        <td>
          <span class="badgeTabela badgeNeutro">${item.setor}</span>
        </td>
        <td>
          <span class="badgeTabela badgeNivel">Nv. ${item.nivel}</span>
        </td>
        <td>
          <span class="badgeTabela badgeXp">${item.xp}/100</span>
        </td>
        <td>
          <span class="badgeTabela badgeSucesso">${item.quizzesFeitos}</span>
        </td>
        <td>
          <span class="badgeTabela ${obterClassePendencia(item.quizzesPendentes)}">
            ${item.quizzesPendentes}
          </span>
        </td>
        <td>
          <span class="badgeTabela ${obterClasseAcerto(item.taxaAcertoNumero)}">
            ${item.taxaAcertoNumero}%
          </span>
        </td>
        <td>
          <span class="badgeTabela ${obterClasseTempo(item.tempoMedioNumero)}">
            ${formatarTempo(item.tempoMedioNumero)}
          </span>
        </td>
      </tr>
    `
  })
}

renderizarLeaderboard()