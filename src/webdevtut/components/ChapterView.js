import React from 'react';
import PropTypes from 'prop-types';
import ScrollInHeader from './ScrollInHeader';
import PartOneRouter from '../parts/web/1/PartOneRouter';

const getRouter = props => {
  switch(props.part) {
    case 1:
      return <PartOneRouter part={1} {...props} />;
    default:
      return <ScrollInHeader text={'404 Not Found'} />
  }
};

const ChapterView = props => {
  return (
    <section id="chapter-view">
      {getRouter(props)}
    </section>
  );
};

ChapterView.propTypes = {
  part: PropTypes.number,
  header: PropTypes.string
};

export default ChapterView;