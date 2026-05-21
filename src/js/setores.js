import { pegarEmpresas, salvarEmpresas } from './storage.js'

const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null')

if (!usuario) {
  window.location.href = 'login.html'
}

const editarSetores = document.getElementById('editarSetores')
if (editarSetores) {
  editarSetores.addEventListener('click', () => {
    window.location.href = 'editar-setores.html'
  })
}

const listaSetores = document.getElementById('listaSetores')

if (listaSetores) {
  const empresas = pegarEmpresas()
  const empresa = empresas.find(item => Number(item.id) === Number(usuario.empresaId))

  if (!empresa) {
    alert('Empresa não encontrada')
    window.location.href = 'login.html'
  } else {
    const voltar = document.getElementById('voltar')
    if (voltar) {
      voltar.addEventListener('click', () => {
        window.location.href = 'dono.html'
      })
    }

    function renderizarSetores() {
      listaSetores.innerHTML = ''

      const setores = Array.isArray(empresa.setores) ? empresa.setores : []

      if (setores.length === 0) {
        listaSetores.innerHTML = `<p style="color:#9ca3af">Nenhum setor cadastrado</p>`
        return
      }

      setores.forEach((setor, index) => {
        listaSetores.innerHTML += `
          <div class="setorCard">
            <span>${setor}</span>
            <button class="btnExcluir" data-id="${index}" type="button">Excluir</button>
          </div>
        `
      })

      document.querySelectorAll('.btnExcluir').forEach(botao => {
        botao.addEventListener('click', () => {
          const index = Number(botao.dataset.id)
          empresa.setores.splice(index, 1)
          salvarEmpresas(empresas)
          renderizarSetores()
        })
      })
    }

    renderizarSetores()

    const adicionarSetor = document.getElementById('adicionarSetor')
    if (adicionarSetor) {
      adicionarSetor.addEventListener('click', event => {
        event.preventDefault()

        const inputNovoSetor = document.getElementById('novoSetor')
        const mensagem = document.getElementById('mensagem')
        const novoSetor = inputNovoSetor.value.trim()

        if (!novoSetor) {
          mensagem.style.color = '#ef4444'
          mensagem.innerText = 'Digite o nome do setor'
          return
        }

        if (!empresa.setores) empresa.setores = []

        if (empresa.setores.includes(novoSetor)) {
          mensagem.style.color = '#ef4444'
          mensagem.innerText = 'Setor já existe'
          return
        }

        empresa.setores.push(novoSetor)
        salvarEmpresas(empresas)
        inputNovoSetor.value = ''
        mensagem.style.color = '#4ade80'
        mensagem.innerText = 'Setor adicionado!'
        renderizarSetores()
      })
    }
  }
}