const uiState = {
  background: 0,
  bgShiftTimer: null
};

//About #595F62, Skills #7F9C96, Contact #92BEA6, Doodles #6C474F
const bgColors = [
  '#45050C',
  '#011936',
  '#6B7F82',
  '#175873'
];

const siteWrapper = document.querySelector('.site-wrapper');
const mainContainer = document.querySelector('.main-container');
const contentViews = document.querySelectorAll('.content-view');

let contentHeight = contentViews[0].clientHeight;

const clearBgShift = () => {
  clearInterval(uiState.bgShiftTimer);
  uiState.bgShiftTimer = undefined;
};

const startBgShift = v => {
  const c = bgColors[v];
  if(uiState.bgShiftTimer) {
    clearBgShift();
  }
  uiState.background = v;
  uiState.bgShiftTimer = setTimeout(() => {
    mainContainer.style.background = c;
    clearBgShift();
  }, 420);
};

const resizeUpdate = () => {
  contentHeight = contentViews[0].clientHeight;
};
window.addEventListener('resize', resizeUpdate);

const scrollUpdate = () => {
  const ypos = (siteWrapper.pageYOffset || siteWrapper.scrollTop) - 96; //Banner = 96px
  let viewInd = Math.floor(ypos / contentHeight) < 0 ? 0 : Math.floor((ypos + (contentHeight / 2)) / contentHeight);
  if(viewInd !== uiState.background) {
    startBgShift(viewInd);
  }
};
siteWrapper.addEventListener('scroll', scrollUpdate);

/*const loadParticles = configSrc => {
  const particles = document.createElement('script');
  particles.onload = () => {
    particlesJS.load('particles-area', configSrc);
  };
  particles.src = '../scripts/external/particles.min.js';
  document.head.appendChild(particles);
};*/

submitContactForm = function () {
  const name = document.getElementById('contact-name').value;
  const inquiry = document.getElementById('contact-form').value;
};

//Init
(() => {
  mainContainer.style.transition = 'background 1.2s';
  //loadParticles('../media/particles/homeParticles.json');
})();