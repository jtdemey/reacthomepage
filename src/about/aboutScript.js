const uiState = {
  background: 0,
  bgShiftTimer: null
};

//Home #4B4E6D, Imposter #334152, Survive #451119, Pistolwhip #284c4a
//About #595F62, Skills #7F9C96, Contact #92BEA6, Doodles #6C474F
const bgColors = [
  '#4B4E6D',
  '#334152',
  '#451119',
  '#284c4a',
  '#595f62',
  '#7f9c96',
  '#92bea6',
  '#6c474f'
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
  //Home #4B4E6D, Imposter #334152, Survive #451119, Pistolwhip #284c4a
  //About #595F62, Skills #7F9C96, Contact #92BEA6, Doodles #6C474F
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
  if(window.location.href.indexOf('/about') !== -1) {
    viewInd += 4;
  }
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