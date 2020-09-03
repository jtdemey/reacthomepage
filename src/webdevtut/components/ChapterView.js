import React from 'react';
import PropTypes from 'prop-types';
import partMetadata from '../parts/partMetadata';
import ChapterRouter from '../parts/ChapterRouter';

const ChapterView = props => {
  return (
    <section id="chapter-view">
      {props.part ? <ChapterRouter part={props.part} /> : <partMetadata text={'404 Not Found'} />}
    </section>
  );
};

ChapterView.propTypes = {
  part: PropTypes.number,
  header: PropTypes.string
};

export default ChapterView;