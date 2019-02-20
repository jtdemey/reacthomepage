//const HTML_FILE = require('file-loader?name=[name].[ext]!../html/home.html');

//Utility methods
const hasCssClass = (classList, cssClass) => {
  for(let i = 0; i < classList.length; i++) {
    if(classList[i] === cssClass) {
      return true;
    }
  }
  return false;
};

//Window events
const scrollUpdate = () => {
  let ypos = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
  let navArea = document.querySelector('.nav-area');
  let navHighlights = document.querySelectorAll('.nav-highlight');
  let highlightIndex = 0;
  if(ypos > 99) {
    if(!hasCssClass(navArea.classList, 'nav-fixed')) {
      navArea.classList.add('nav-fixed');
    }
    console.log(parseInt(getComputedStyle(navHighlights[0]).top));
  } else {
    if(hasCssClass(navArea.classList, 'nav-fixed')) {
      navArea.classList.remove('nav-fixed');
    }
    if(parseInt(getComputedStyle(navHighlights[0]).top) !== 0) {
      for(let i = 0; i < navHighlights.length; i++) {
        navHighlights[i].style.top = `${highlightIndex}px`;
        highlightIndex += 86;
      }
    }
  }
};
scrollUpdate();

window.addEventListener('scroll', scrollUpdate);