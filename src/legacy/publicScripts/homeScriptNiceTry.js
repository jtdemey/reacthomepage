//const HTML_FILE = require('file-loader?name=[name].[ext]!../html/home.html');
import '../css/home.css';

window.onload = () => {

  //UI State
  const uiState = {
    bannerVisible: true,
    scrollCooldown: false,
    scrollInterval: null,
    viewIndex: null
  };
  console.log('herro');

  //Refs
  const contentView = document.querySelector('.content-area');

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
  const resizeUpdate = () => {
    const width = window.innerWidth;
    console.log(window.innerWidth);
  };
  //resizeUpdate();
  //window.addEventListener('resize', resizeUpdate);

  uiState.scrollInterval = setInterval(() => {
    if(uiState.scrollCooldown === true) {
      uiState.scrollCooldown = false;
    }
  }, 800);
  const scrollUpdate = () => {
    if(uiState.scrollCooldown === false) {
      uiState.scrollCooldown = true;
      const ypos = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
      const mainContainer = document.querySelector('.main-container');
      const contentView = document.querySelector('.content-area');
      if(ypos > 95 && uiState.bannerVisible) {
        uiState.bannerVisible = false;
        contentView.style.overflowY = 'scroll';

      } else if(ypos < 96 && !uiState.bannerVisible) {
        uiState.bannerVisible = true;
        contentView.style.overflowY = 'hidden';
      }
    }
  };
  //window.addEventListener('scroll', scrollUpdate);
  //scrollUpdate();

  //Content events
  const contentScrollUpdate = () => {
    const viewHeight = document.querySelector('.home-content').clientHeight
      || document.querySelector('.home-content').offsetHeight;
    const viewId = Math.abs(parseInt((contentView.scrollTop + 150) / viewHeight));
    if(viewId !== uiState.viewIndex) {
      const navTitles = document.querySelectorAll('.nav-title');
      const mNavTitles = document.querySelectorAll('.mnav-title');
      uiState.viewIndex = viewId;
      for(let i = 0; i < navTitles.length; i++) {
        if(navTitles[i].classList.contains('nav-focus')) {
          navTitles[i].classList.remove('nav-focus');
        }
        if(mNavTitles[i].classList.contains('nav-focus')) {
          mNavTitles[i].classList.remove('nav-focus');
        }
      }
      navTitles[viewId].classList.add('nav-focus');
      mNavTitles[viewId].classList.add('nav-focus');
    }
  };
  //contentView.addEventListener('scroll', contentScrollUpdate);
};
