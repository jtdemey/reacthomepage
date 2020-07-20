import { makeRoad, makeView } from '../../../util/viewHelpers';

const r = makeRoad;
const v = makeView;

const scene = {
  roadmap: [
    r(0, 0, 'Using this tool'),
    r(1, 1, 'Audience'),
    r(2, 1, 'Accessibility'),
    r(3, 1, 'Options')
  ],
  views: [
    v(0, 'TitleSplash'),
    v(1, 'TitleSplash'),
    v(2, 'TitleSplash'),
    v(2, 'ImageView', {
      images: [{
        src: 'media/chrome-logo.svg'
      }, {
        src: 'media/notepad-icon-7.png'
      }]
    }),
    v(3, 'ImageView', {
      images: [{
        src: 'media/matrix-guns.gif',
        height: '24rem'
      }]
    }),
  ]
};

export default scene;