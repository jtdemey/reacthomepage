import React from 'react';
import { makeRoad, makeView } from '../../../util/viewHelpers';
import TitleSplash from '../../../components/TitleSplash';

const r = makeRoad;
const v = makeView;

const chapterData = {
  roadmap: [
    r(0, 0, 'Using this tool'),
    r(1, 1, 'Audience'),
    r(2, 1, 'Accessibility'),
    r(3, 1, 'Options')
  ],
  views: [
    v(0, () => <TitleSplash />),
  ]
};

export default chapterData;