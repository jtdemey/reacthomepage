window.onload = () => {
  console.log('hehe');
  const makeHeaderRect = () => {
    const rect = document.querySelector('.header > div');
    const getHeight = selector => {
      const h = document.defaultView.getComputedStyle(document.querySelector(selector)).height;

    };
    const height = getHeight('.header > h5')
    const height = document.defaultView.getComputedStyle(document.querySelector());
    console.log(getHeight(rect));
  };
  makeHeaderRect();
};