import "regenerator-runtime/runtime";

const uiState = {
  background: 0,
  bgShiftTimer: null,
  doodleCt: 22
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

// F l A i R 
/*const loadParticles = configSrc => {
  const particles = document.createElement('script');
  particles.onload = () => {
    particlesJS.load('particles-area', configSrc);
  };
  particles.src = '../scripts/external/particles.min.js';
  document.head.appendChild(particles);
};*/

//Contact
const ajaxPost = (url, payload) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    if(!res.ok) {
      console.error(res.status);
    }
  });
};

const genUserHash = () => {
  const n = window.navigator;
  let str = n.appCodeName + n.appVersion + n.language + n.platform + n.productSub;
  let hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
};

const sanitize = str => {
  const charMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return str.replace(reg, m => charMap[m]);
};

const setBtnStyle = () => {
  const contactSubmit = document.querySelector('.contact-submit');
  const contactText = document.querySelector('.contact-submit > h5');
  contactSubmit.style.background = '#5e8c57';
  contactSubmit.style.boxShadow = '4px 4px #1a1a1a';
  contactText.innerText = 'Submitted';
  contactText.setAttribute('onclick', null);
};

window.submitContactForm = function() {
  const hash = genUserHash();
  const name = sanitize(document.getElementById('contact-name').value);
  const inquiry = sanitize(document.getElementById('contact-text').value);
  if(name === '' || inquiry === '') {
    return;
  }
  ajaxPost(window.location.origin + '/contact', {name, inquiry, hash});
  setBtnStyle();
};

//Doodles
const loadDoodle = async ind => {
  const uri = `${window.location.origin}/media/doodles/`;
  const dood = new Image();
  dood.src = `${uri}thumbs/img${ind}.jpg`; 

  const link = document.createElement('a');
  link.href = `${uri}img${ind}.jpg`;
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.appendChild(dood);

  const card = document.createElement('article');
  card.classList.add('doodle-card');
  card.appendChild(link);

  const cards = document.querySelector('.doodle-cards');
  cards.appendChild(card);
};

const loadDoodles = () => {
  const randInts = [];
  while(randInts.length < 5) {
    const ind = Math.floor(Math.random() * uiState.doodleCt);
    if(!randInts.some(int => int === ind)) {
      randInts.push(ind);
    }
  }
  for(let i = 0; i < randInts.length; i++) {
    loadDoodle(randInts[i]);
  }
};

//Init
(() => {
  mainContainer.style.transition = 'background 1.2s';
  //loadParticles('../media/particles/homeParticles.json');
  loadDoodles();
})();