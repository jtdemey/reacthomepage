window.onload = () => {
  const overlay = document.getElementById('main-overlay');
  const exitMobileNav = () => {
    document.querySelector('.mobile-nav').style.width = '0';
    overlay.style.backgroundColor = 'transparent';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 400);
    overlay.removeEventListener('click', () => exitMobileNav());
  };
  document.querySelector('.mobile-header > span').addEventListener('click', () => {
    document.querySelector('.mobile-nav').style.width = '12rem';
    overlay.style.display = 'block';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.addEventListener('click', () => exitMobileNav());
  });
};