/* empty css              */import"./modulepreload-polyfill-Btlm8H0F.js";var e=JSON.parse(localStorage.getItem(`usuarioLogado`));e||(window.location.href=`login.html`),document.getElementById(`nomeUsuario`).textContent=`Nome: ${e.nome||``}`,document.getElementById(`empresaUsuario`).textContent=`Empresa: ${e.empresa||``}`,document.getElementById(`tipoUsuario`).textContent=`Cargo: ${e.tipo||``}`,document.getElementById(`setorUsuario`).textContent=`Setor: ${e.setor||``}`,document.getElementById(`logout`).addEventListener(`click`,()=>{localStorage.removeItem(`usuarioLogado`),window.location.href=`index.html`}),document.getElementById(`abrirQuiz`).addEventListener(`click`,()=>{window.location.href=`quiz-manager.html`}),document.getElementById(`gerenciarQuizzes`).addEventListener(`click`,()=>{window.location.href=`gerenciar-quizzes.html`}),document.getElementById(`abrirLeaderboard`).addEventListener(`click`,()=>{window.location.href=`leaderboard.html`}),document.getElementById(`abrirArquivados`).addEventListener(`click`,()=>{window.location.href=`quizzesArquivados.html`}),document.getElementById(`gerarFuncionario`).addEventListener(`click`,()=>{let t=Math.random().toString(36).substring(2,8).toUpperCase(),n=JSON.parse(localStorage.getItem(`codigos`))||[];n.push({codigo:t,empresaId:e.empresaId,empresa:e.empresa,setor:e.setor}),localStorage.setItem(`codigos`,JSON.stringify(n));let r=document.getElementById(`resultado`);r.innerHTML=`
          <div style="
            margin-top:16px;
            padding:14px;
            border-radius:12px;
            background:#ecfeff;
            border:1px solid #99f6e4;
            color:#115e59;
            font-weight:700;
          ">
            Código gerado:
            <span style="font-size:18px">
              ${t}
            </span>
          </div>
        `});