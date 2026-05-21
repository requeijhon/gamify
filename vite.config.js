import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        login: 'login.html',
        cadastro: 'cadastro.html',
        dashboard: 'dashboard.html',
        dono: 'dono.html',
        gerente: 'gerente.html',
        leaderboard: 'leaderboard.html',
        quiz: 'quiz.html',
        quizes: 'quizzes.html',
        quizManager: 'quiz-manager.html',
        quizzesArquivados: 'quizzesArquivados.html',
        gerenciarQuizzes: 'gerenciar-quizzes.html',
        editarSetores: 'editar-setores.html',
        cadastrarEmpresa: 'cadastrar-empresa.html',
        registro: 'registro.html'
      }
    }
  }
})