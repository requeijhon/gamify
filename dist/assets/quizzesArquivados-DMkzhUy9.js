/* empty css              */import"./modulepreload-polyfill-Btlm8H0F.js";import{a as e,c as t,i as n,r,u as i}from"./storage-CAu5-KaA.js";var a=JSON.parse(localStorage.getItem(`usuarioLogado`)||`null`);a||(window.location.href=`login.html`);var o=document.getElementById(`gridArquivados`);function s(t){let r=n(),a=e();r.filter(e=>String(e.quizId)===String(t.id)).forEach(e=>{let t=a.findIndex(t=>t.email===e.email);t!==-1&&(a[t].xp-=Number(e.xpGanho||0),a[t].xp<0&&(a[t].xp=0))}),i(a)}function c(t){let r=n(),a=e();r.filter(e=>String(e.quizId)===String(t.id)).forEach(e=>{let t=a.findIndex(t=>t.email===e.email);t!==-1&&(a[t].xp+=Number(e.xpGanho||0))}),i(a)}function l(){let e=r(),n=e.filter(e=>e.empresaId===a.empresaId&&e.setor===a.setor&&e.arquivado===!0);if(o.innerHTML=``,n.length===0){o.innerHTML=`<p style="color:#9ca3af">Nenhum quiz arquivado</p>`;return}n.forEach(n=>{let r=document.createElement(`div`);r.className=`quizCard`,r.innerHTML=`
      <div>
        <h2>${n.titulo}</h2>
        <p>${n.perguntas.length} perguntas</p>

        <p style="margin-top:10px">
          XP:
          <strong style="color:${n.xpAtivo?`#16A34A`:`#DC2626`}">
            ${n.xpAtivo?`Ativado`:`Desativado`}
          </strong>
        </p>
      </div>

      <div class="acoesQuiz">
        <button class="editarQuiz">Restaurar</button>
        <button class="btn-teal btnXp">
          ${n.xpAtivo?`Desativar XP`:`Ativar XP`}
        </button>
        <button class="excluirQuiz">Excluir</button>
      </div>
    `;let i=r.querySelector(`.editarQuiz`),a=r.querySelector(`.btnXp`),u=r.querySelector(`.excluirQuiz`);i.addEventListener(`click`,()=>{n.arquivado=!1,t(e),l()}),a.addEventListener(`click`,()=>{n.xpAtivo=!n.xpAtivo,n.xpAtivo?c(n):s(n),t(e),l()}),u.addEventListener(`click`,()=>{if(!confirm(`Deseja excluir este quiz permanentemente?`))return;let r=e.findIndex(e=>String(e.id)===String(n.id));r!==-1&&e.splice(r,1),t(e),l()}),o.appendChild(r)})}l();