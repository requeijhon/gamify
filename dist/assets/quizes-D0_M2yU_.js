/* empty css              */import"./modulepreload-polyfill-Dezn_h7o.js";import{i as e,r as t}from"./storage-C9Bo3sGM.js";var n=JSON.parse(localStorage.getItem(`usuarioLogado`)||`null`);n||(window.location.href=`login.html`);var r=document.getElementById(`visualizarQuizzes`);r&&r.addEventListener(`click`,()=>{window.location.href=`quizzes.html`});var i=document.getElementById(`voltarGerente`);i&&i.addEventListener(`click`,()=>{n.tipo===`gerente`?window.location.href=`gerente.html`:window.location.href=`dashboard.html`});var a=document.getElementById(`gridQuizzes`);if(a){let r=t().filter(e=>String(e.empresaId)===String(n.empresaId)&&String(e.setor).trim().toLowerCase()===String(n.setor).trim().toLowerCase()),i=new Map;r.forEach(e=>{let t=e.id?`id:${String(e.id)}`:`titulo:${String(e.empresaId)}::${String(e.setor).trim().toLowerCase()}::${String(e.titulo).trim().toLowerCase()}`;i.has(t)||i.set(t,e)});let o=[...i.values()],s=e();o.length===0?a.innerHTML=`<p style="color:#9ca3af">Nenhum quiz disponível para seu setor</p>`:(a.innerHTML=``,o.forEach(e=>{let t=e.arquivado===!0,r=s.some(t=>t.email===n.email&&(t.quizId&&e.id&&String(t.quizId)===String(e.id)||!t.quizId&&t.titulo===e.titulo));a.innerHTML+=`
        <div class="quizCard ${t?`quizCard--arquivado`:``}">
          <div class="quizTopo">
            <div class="${t?`statusAmarelo`:r?`statusVerde`:`statusAmarelo`}"></div>
            <h2>${e.titulo}</h2>
          </div>

          <p>Setor: ${e.setor}</p>
          <p>${e.perguntas.length} perguntas</p>

          ${t?`<p class="quizStatusArquivado">Quiz arquivado — indisponível no momento</p>`:``}

          <button
            class="btnIniciar ${t?`btnIniciar--disabled`:``}"
            data-id="${e.id||``}"
            data-titulo="${e.titulo}"
            ${t?`disabled`:``}
          >
            ${t?`Quiz arquivado`:r?`Refazer Quiz`:`Iniciar Quiz`}
          </button>
        </div>
      `}),document.querySelectorAll(`.btnIniciar`).forEach(e=>{e.addEventListener(`click`,()=>{if(e.disabled)return;let t=e.dataset.id,n=e.dataset.titulo,r=o.find(e=>t&&e.id?String(e.id)===String(t):e.titulo===n);!r||r.arquivado===!0||(localStorage.setItem(`quizAtual`,JSON.stringify(r)),window.location.href=`quiz.html`)})}))}