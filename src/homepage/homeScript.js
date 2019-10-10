const uiState = {
  background: 0,
  bgShiftTimer: null
};

const siteWrapper = document.querySelector('.site-wrapper');
const mainContainer = document.querySelector('.main-container');
const contentViews = document.querySelectorAll('.content-view');

let contentHeight = contentViews[0].clientHeight;

const clearBgShift = () => {
  clearInterval(uiState.bgShiftTimer);
  uiState.bgShiftTimer = undefined;
};

const startBgShift = v => {
  //Home #4B4E6D, Imposter #334152, Survive #40333b, Pistolwhip #284c4a
  let c = '#4B4E6D';
  if(v === 1) {
    c = '#334152';
  } else if(v === 2) {
    c = '#451119';
  } else if(v === 3) {
    c = '#284c4a';
  }
  if(uiState.bgShiftTimer) {
    clearBgShift();
  }
  uiState.background = v;
  uiState.bgShiftTimer = setTimeout(() => {
    console.log('settin to ' + v);
    mainContainer.style.background = c;
    clearBgShift();
  }, 2000);
};

const resizeUpdate = () => {
  contentHeight = contentViews[0].clientHeight;
};
window.addEventListener('resize', resizeUpdate);

const scrollUpdate = () => {
  const ypos = (siteWrapper.pageYOffset || siteWrapper.scrollTop) - 96; //Banner = 96px
  //console.log(ypos);
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

//Init
(() => {
  mainContainer.style.background = '#4B4E6D';
  //loadParticles('../media/particles/homeParticles.json');
})();