import React from 'react';
import PropTypes from 'prop-types';
import ScrollInHeader from './ScrollInHeader';
import StaggeredList from './StaggeredList';

const ChapterView = props => {
  return (
    <section id="chapter-view">
      <ScrollInHeader text={props.header} />
      <StaggeredList listItems={['hey', 'uh', 'ok']} />
    </section>
  );
};

ChapterView.propTypes = {
  chapter: PropTypes.string,
  header: PropTypes.string
};

export default ChapterView;