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

//Listeners
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

//Background
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

/*const loadParticles = configSrc => {
  const particles = document.createElement('script');
  particles.onload = () => {
    particlesJS.load('particles-area', configSrc);
  };
  particles.src = '../scripts/external/particles.min.js';
  document.head.appendChild(particles);
};*/

const ajaxPost = (url, payload) => {
  let req = new XMLHttpRequest();
  req.onreadystatechange = data => {
    console.log(data);
  }
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
};

const genUserHash = () => {
  const n = window.navigator;
  let str = n.appCodeName + n.appVersion + n.language + n.platform + n.productSub;
  let hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};

window.submitContactForm = function() {
  const ctKey = 'JtdContactFormSubmissionCt';
  let subCt = parseInt(window.localStorage[ctKey]);
  if(!subCt) {
    subCt = 0;
  } else if(subCt > 10) {
    return;
  }
  subCt += 1;
  window.localStorage[ctKey] = subCt;

  const hashKey = 'JtdUserHashIdentifier';
  let hash = window.localStorage[hashKey];
  if(!hash) {
    hash = genUserHash();
    window.localStorage[hashKey] = hash;
  }

  const name = document.getElementById('contact-name').value;
  const inquiry = document.getElementById('contact-text').value;
  ajaxPost(window.location.origin + '/contact', {name, inquiry, hash});

  const notifyArea = document.querySelector('.notify-area');
  notifyArea.style.display = 'block';
  notifyArea.classList.add('fadein-now');
  setTimeout(() => {
    notifyArea.style.display = 'none';
  }, 3000);
};

//Init
(() => {
  mainContainer.style.transition = 'background 1.2s';
  //loadParticles('../media/particles/homeParticles.json');
})();