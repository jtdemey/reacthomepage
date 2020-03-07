//--- State ---//
const uiState = {
  background: 0,
  bgShiftTimer: null,
  contentHeight: null,
  lastScrollPos: 0,
  mNavFixed: false,
  mNavTop: false,
  mobileCheckTimer: undefined,
  mobile: true
};

//--- Const ---//
//Home #4B4E6D, Imposter #334152, Survive #451119, Pistolwhip #284c4a
const bgColors = [
  '#4B4E6D',
  '#334152',
  '#451119',
  '#284c4a'
];

//--- Refs ---//
const siteWrapper = document.querySelector('.site-wrapper');
const mainContainer = document.querySelector('.main-container');
const mobileNav = document.querySelector('.mnav-area');
const contentViews = document.querySelectorAll('.content-view');

//--- Background ---//
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

//--- Events ---//
const resizeUpdate = () => {
  uiState.contentHeight = contentViews[0].clientHeight;
  if(uiState.mobileCheckTimer === undefined) {
    uiState.mobileCheckTimer = setTimeout(() => {
      uiState.mobile = window.getComputedStyle(mobileNav).display !== 'block' ? false : true;
      uiState.mobileCheckTimer = undefined;
    }, 1000);
  }
};

const scrollUpdate = () => {
  const ypos = siteWrapper.pageYOffset || siteWrapper.scrollTop;
  if(uiState.mobile) {
    if(uiState.lastScrollPos > ypos) {
      if(ypos < 301 && uiState.mNavFixed) {
        setTimeout(() => {
          mobileNav.classList.remove('mnav-fixed');
          uiState.mNavFixed = false;
        }, 200);
        mobileNav.classList.remove('mnav-top');
        uiState.mNavTop = false;
      } else if(ypos > 300) {
        if(!uiState.mNavFixed) {
          mobileNav.classList.add('mnav-fixed');
          uiState.mNavFixed = true;
        }
        mobileNav.classList.add('mnav-top');
        uiState.mNavTop = true;
      }
    } else if(uiState.lastScrollPos < ypos) {
      if(ypos > 300 && !uiState.mNavFixed) {
        mobileNav.classList.add('mnav-fixed');
        uiState.mNavFixed = true;
      }
      mobileNav.classList.remove('mnav-top');
      uiState.mNavTop = false;
    }
  }
  let viewInd = Math.floor(ypos / uiState.contentHeight) < 0 ? 0 : Math.floor(((ypos - 96) + (uiState.contentHeight / 2)) / uiState.contentHeight);
  if(viewInd !== uiState.background) {
    startBgShift(viewInd);
  }
  uiState.lastScrollPos = ypos;
};

//--- Pahticles ---//
/*const loadParticles = configSrc => {
  const particles = document.createElement('script');
  particles.onload = () => {
    particlesJS.load('particles-area', configSrc);
  };
  particles.src = '../scripts/external/particles.min.js';
  document.head.appendChild(particles);
};*/

//--- Init ---//
(() => {
  if(window.getComputedStyle(mobileNav).display !== 'block') {
    uiState.mobile = false;
  }
  setInterval(() => scrollUpdate(), 500);
  window.addEventListener('resize', resizeUpdate);
  uiState.contentHeight = contentViews[0].clientHeight;
  mainContainer.style.transition = 'background 1.2s';
  //loadParticles('../media/particles/homeParticles.json');
})();