import { salvarEmpresas, salvarUsuarios } from './storage.js'

// BUG FIX: setup.js não era importado em nenhuma página.
// Agora é importado em index.html para inicializar os dados padrão.

if (!localStorage.getItem('empresas')) {
  const empresas = [
    {
      id: 1,
      nome: 'Empresa Modelo',
      // BUG FIX: setores ausentes causava crash em cadastro.js
      // (empresa.setores.forEach → TypeError)
      setores: ['Administração', 'Comercial', 'TI']
    }
  ]
  salvarEmpresas(empresas)
}

if (!localStorage.getItem('usuarios')) {
  const usuarios = [
    {
      nome: 'Administrador',
      email: 'admin@gmail.com',
      senha: '123',
      empresaId: 1,
      tipo: 'dono',
      setor: 'Administração',
      xp: 0,
      nivel: 1
    }
  ]
  salvarUsuarios(usuarios)
}
