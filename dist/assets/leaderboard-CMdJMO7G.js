/* empty css              */import"./modulepreload-polyfill-Btlm8H0F.js";var e=JSON.parse(localStorage.getItem(`usuarioLogado`)||`null`);e||(window.location.href=`login.html`);var t=JSON.parse(localStorage.getItem(`usuarios`))||[],n=JSON.parse(localStorage.getItem(`quizzes`))||[],r=JSON.parse(localStorage.getItem(`quizzesFeitos`))||[],i=document.getElementById(`voltarPagina`),a=document.getElementById(`tituloLeaderboard`),o=document.getElementById(`subtituloLeaderboard`),s=document.getElementById(`leaderboardBody`),c=document.getElementById(`mensagemLeaderboard`);i&&i.addEventListener(`click`,()=>{e.tipo===`dono`?window.location.href=`dono.html`:e.tipo===`gerente`?window.location.href=`gerente.html`:window.location.href=`dashboard.html`});function l(e){if(!e||e<=0)return`-`;let t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}`}function u(e){if(e.length===0)return 0;let t=0,r=0;return e.forEach(e=>{t+=Number(e.acertos||0);let i=n.find(t=>t.titulo===e.titulo);i&&(r+=i.perguntas.length)}),r===0?0:Math.round(t/r*100)}function d(e){if(e.length===0)return 0;let t=e.reduce((e,t)=>e+Number(t.tempo||0),0);return Math.round(t/e.length)}function f(e){return e>=80?`badgeSucesso`:e>=50?`badgeAviso`:`badgePerigo`}function p(e){return e===0?`badgeSucesso`:e<=2?`badgeAviso`:`badgePerigo`}function m(e){return e===0?`badgeNeutro`:e<=60?`badgeSucesso`:e<=120?`badgeAviso`:`badgePerigo`}function h(e){return e===0?`<span class="medalha medalhaOuro">🥇 1º</span>`:e===1?`<span class="medalha medalhaPrata">🥈 2º</span>`:e===2?`<span class="medalha medalhaBronze">🥉 3º</span>`:`<span class="rankNumero">${e+1}º</span>`}function g(){let n=t.filter(t=>t.tipo===`funcionario`&&t.empresaId===e.empresaId);return e.tipo===`dono`?(a.innerText=`Ranking geral da empresa`,o.innerText=`Todos os funcionários da empresa`,n):e.tipo===`gerente`?(a.innerText=`Ranking do setor`,o.innerText=`Funcionários do setor ${e.setor}`,n.filter(t=>t.setor===e.setor)):(a.innerText=`Ranking do seu setor`,o.innerText=`Comparativo entre funcionários do setor ${e.setor}`,n.filter(t=>t.setor===e.setor))}function _(e){return n.filter(t=>t.empresaId===e.empresaId&&t.setor===e.setor)}function v(){return g().map(e=>{let t=r.filter(t=>t.email===e.email),n=_(e),i=t.length,a=Math.max(n.length-i,0),o=u(t),s=d(t);return{nome:e.nome,email:e.email,setor:e.setor,nivel:Number(e.nivel||1),xp:Number(e.xp||0),quizzesFeitos:i,quizzesPendentes:a,taxaAcertoNumero:o,tempoMedioNumero:s}}).sort((e,t)=>t.nivel===e.nivel?t.xp===e.xp?e.quizzesPendentes===t.quizzesPendentes?t.taxaAcertoNumero===e.taxaAcertoNumero?e.nome.localeCompare(t.nome):t.taxaAcertoNumero-e.taxaAcertoNumero:e.quizzesPendentes-t.quizzesPendentes:t.xp-e.xp:t.nivel-e.nivel)}function y(){let t=v();if(s.innerHTML=``,c.innerText=``,t.length===0){c.innerText=`Nenhum funcionário encontrado para este ranking`;return}t.forEach((t,n)=>{let r=t.email===e.email?`linhaAtual`:``;s.innerHTML+=`
      <tr class="${r}">
        <td>${h(n)}</td>
        <td>
          <div class="nomeRanking">
            <strong>${t.nome}</strong>
            ${t.email===e.email?`<span class="tagVoce">Você</span>`:``}
          </div>
        </td>
        <td>
          <span class="badgeTabela badgeNeutro">${t.setor}</span>
        </td>
        <td>
          <span class="badgeTabela badgeNivel">Nv. ${t.nivel}</span>
        </td>
        <td>
          <span class="badgeTabela badgeXp">${t.xp}/100</span>
        </td>
        <td>
          <span class="badgeTabela badgeSucesso">${t.quizzesFeitos}</span>
        </td>
        <td>
          <span class="badgeTabela ${p(t.quizzesPendentes)}">
            ${t.quizzesPendentes}
          </span>
        </td>
        <td>
          <span class="badgeTabela ${f(t.taxaAcertoNumero)}">
            ${t.taxaAcertoNumero}%
          </span>
        </td>
        <td>
          <span class="badgeTabela ${m(t.tempoMedioNumero)}">
            ${l(t.tempoMedioNumero)}
          </span>
        </td>
      </tr>
    `})}y();