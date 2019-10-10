window.onload = function() {
  setTimeout(function() {
    const title = document.querySelector('.title');
    title.classList.add('fadein-now');
  }, 1000);
  setTimeout(function() {
    const subtitle = document.querySelector('.subtitle');
    subtitle.classList.add('fadein-now');
  }, 2500);

  particlesJS.load('particles-area', '../media/particles/sandboxParticles.json', function() {
    console.log('callback - particles.js config loaded');
  });
};