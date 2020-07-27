import React from 'react';
import PropTypes from 'prop-types';
import ScrollInHeader from './ScrollInHeader';
import chapterData from '../parts/chapterData';
import StaggeredLinkList from './StaggeredLinkList';

const ChapterBrowser = props => {
  return (
    <section id="chapter-browser">
      <ScrollInHeader text={props.header} />
      <StaggeredLinkList  baseUri={`/${chapterData[props.part - 1].uri}`}
                          listItems={chapterData[props.part - 1].titles}
                          spanColor={chapterData[props.part - 1].colors.primary} />
    </section>
  );
};

ChapterBrowser.propTypes = {
  part: PropTypes.number,
  header: PropTypes.string
};

export default ChapterBrowser;