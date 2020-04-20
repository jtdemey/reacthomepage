window.onload = () => {
  const fighterNames = ['Tierwhore', 'Dair', 'Shlice', 'Turnips', 'Knee guy', 'Shrek'];
  const timeoutCap = 250;
  const bleeps = new Audio('../media/bleeps.mp3');

  let lastRolled = 0;
  let startRollListener;

  const cards = document.querySelectorAll('.fighter-card > img');
  const btn = document.querySelector('.roll-btn');
  const btnText = document.querySelector('.roll-btn > h5');

  const getRandExcluding = (max, doNotMatch) => {
    let res;
    do {
      res = Math.floor(Math.random() * max);
    } while(res === doNotMatch);
    return res;
  };

  const selectWinner = () => {
    let ind = 0;
    cards.forEach(c => {
      if(!c.classList.contains('highlight')) {
        c.parentElement.classList.add('hidden');
      } else {
        btnText.innerHTML = fighterNames[ind];
        c.parentElement.classList.remove('fighter-card');
        c.parentElement.classList.add('winner-card');
        new Audio('../media/dingdingding.mp3').play();
        setInterval(() => {
          c.classList.toggle('highlight');
        }, 300);
        btn.removeEventListener('click', startRollListener);
        btn.addEventListener('click', () => location.reload());
      }
      ind++;
    });
  };

  const rollFighter = timeout => {
    cards.forEach(c => {
      c.classList.remove('highlight');
    });
    const x = getRandExcluding(6, lastRolled);
    lastRolled = x;
    cards[x].classList.add('highlight');
    if(timeout < timeoutCap) {
      let t = timeout + 5;
      bleeps.play();
      setTimeout(() => rollFighter(t, timeoutCap), timeout);
    } else {
      selectWinner();
    }
  };

  const startRollSeq = () => {
    rollFighter(10, timeoutCap);
    btnText.classList.remove('p-t-1r');
    btnText.classList.add('p-t-2r');
    btnText.innerHTML = '<button class="spinny-wheel"></button>';
  };
  startRollListener = () => startRollSeq();

  btn.addEventListener('click', startRollListener);
};