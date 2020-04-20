export const getClientDims = () => {
  const siteWrapper = document.querySelector('#site-wrapper');
  const w = siteWrapper.clientWidth;
  const h = siteWrapper.clientHeight;
  return {
    width: w,
    height: h 
  };
};

export const getRandBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};