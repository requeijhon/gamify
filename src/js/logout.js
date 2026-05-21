const logout = document.getElementById('logout')

if (logout) {
  logout.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado')
    window.location.href = 'login.html'
  })
}
