/* empty css              */import"./modulepreload-polyfill-Btlm8H0F.js";import{a as e,c as t,i as n,r,u as i}from"./storage-CAu5-KaA.js";var a=JSON.parse(localStorage.getItem(`usuarioLogado`)||`null`);a||(window.location.href=`login.html`);function o(){return r().filter(e=>e.empresaId===a.empresaId&&e.setor===a.setor&&e.arquivado!==!0)}var s=document.getElementById(`gridQuizzes`),c=document.getElementById(`modalExcluirQuiz`),l=document.getElementById(`modalTitulo`),u=document.getElementById(`modalTexto`),d=document.getElementById(`btnCancelarModal`),f=document.getElementById(`btnArquivarQuiz`),p=document.getElementById(`btnArquivarQuizXp`),m=null;function h(e){m=e,!(!c||!l||!u)&&(l.textContent=`Arquivar quiz`,u.innerHTML=`
    Você deseja arquivar o quiz
    <strong>${e.titulo}</strong>?<br><br>

    O quiz será movido para a área
    de quizzes arquivados,
    onde você poderá:
    <br>• restaurar o quiz;
    <br>• ativar/desativar XP;
    <br>• excluir permanentemente.
  `,c.classList.add(`show`))}function g(){m=null,c&&c.classList.remove(`show`)}function _(t){let r=n(),a=e();r.filter(e=>e.titulo===t.titulo).forEach(e=>{let t=a.findIndex(t=>t.email===e.email);if(t===-1)return;let n=Number(a[t].xp||0),r=Number(a[t].nivel||1),i=Number(e.xpGanho||0);for(;i>0;)n>=i?(n-=i,i=0):r>1?(i-=n,r--,n=100):(n=Math.max(0,n-i),i=0);a[t].xp=Math.max(0,n),a[t].nivel=Math.max(1,r)}),i(a)}function v(e,n=!1){let i=r(),a=i.findIndex(t=>t.titulo===e.titulo);a!==-1&&(i[a].arquivado=!0,n&&(i[a].xpAtivo=!1,_(e)),t(i)),g(),y()}function y(){let e=o();if(s.innerHTML=``,e.length===0){s.innerHTML=`
      <p style="color:#9ca3af">
        Nenhum quiz criado ainda
      </p>
    `;return}e.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`quizCard`,n.innerHTML=`
        <h2>${e.titulo}</h2>

        <p>
          ${e.perguntas.length} perguntas
        </p>

        <div class="acoesQuiz">

          <button class="editarQuiz">
            Editar
          </button>

          <button class="excluirQuiz">
            Arquivar
          </button>

        </div>
      `;let r=n.querySelector(`.editarQuiz`),i=n.querySelector(`.excluirQuiz`);r.addEventListener(`click`,()=>{localStorage.setItem(`quizEdicao`,JSON.stringify(e)),window.location.href=`quiz-manager.html`}),i.addEventListener(`click`,()=>{h(e)}),s.appendChild(n)})}d?.addEventListener(`click`,g),f?.addEventListener(`click`,()=>{m&&v(m,!1)}),p?.addEventListener(`click`,()=>{m&&v(m,!0)}),window.addEventListener(`click`,e=>{e.target===c&&g()}),y();