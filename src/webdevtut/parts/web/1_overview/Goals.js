import React from 'react';
import PageView from '../../../components/PageView';
import FadeParagraph from '../../../components/common/FadeParagraph';

const text = [
  `The goal of this series as a whole is to teach you how to learn.`,
  `Web development has many roads, and the MERN stack is just one "stack" of technology.`,
];

const Goals = props => {
  return (
    <PageView {...props}>
      <FadeParagraph text="The goal of this series as a whole is to equip you" />
    </PageView>
  );
};

export default Goals;