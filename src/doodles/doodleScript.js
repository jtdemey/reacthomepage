import "regenerator-runtime/runtime";

const uiState = {
  doodleCt: 22
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

//Init
(() => {
  for(let i = 0; i < uiState.doodleCt; i++) {
    loadDoodle(i);
  }
})();