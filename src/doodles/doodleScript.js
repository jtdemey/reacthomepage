import "regenerator-runtime/runtime";

const uiState = {
  doodlesLoaded: 0,
  doodleTotal: 21
};

const loadDoodle = async ind => {
  const uri = `${window.location.origin}/media/doodles/`;
  const dood = new Image();
  dood.src = `${uri}img${ind}.jpg`; 

  const link = document.createElement('a');
  link.href = `${uri}img${ind}.jpg`;
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.appendChild(dood);

  const card = document.createElement('article');
  card.classList.add('drawing');
  card.appendChild(link);

  const cards = document.querySelector('.drawings');
  cards.appendChild(card);
};

const loadDoodles = amt => {
  const s = uiState.doodlesLoaded;
  for(let i = s; i < (s + amt); i++) {
    if(uiState.doodlesLoaded < uiState.doodleTotal) {
      uiState.doodlesLoaded += 1;
      loadDoodle(i);
    } else {
      document.querySelector('#load-doodles-btn').style.display = 'none';
    }
  }
};

const setBtnListener = () => {
  const moreBtn = document.querySelector('.content-btn');
  moreBtn.addEventListener('click', () => {
    loadDoodles(4);
  });
};

//Init
(() => {
  loadDoodles(4);
  setBtnListener();
})();