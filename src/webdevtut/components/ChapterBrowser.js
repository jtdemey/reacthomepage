import React from 'react';
import PropTypes from 'prop-types';
import ScrollInHeader from './ScrollInHeader';
import chapterData from '../parts/chapterData';
import StaggeredLinkList from './StaggeredLinkList';
import { useDispatch, useSelector } from 'react-redux';
import { setChapter } from '../redux/actions/pageActions';

const ChapterBrowser = props => {
  const pageState = useSelector(state => state.page);
  const dispatch = useDispatch();
  return (
    <section id="chapter-browser">
      <ScrollInHeader text={props.header} />
      <StaggeredLinkList  baseUri={`/${chapterData[pageState.part - 1].uri}`}
                          linkClickFunc={index => dispatch(setChapter(index))}
                          listItems={chapterData[pageState.part - 1].titles}
                          spanColor={chapterData[pageState.part - 1].colors.primary} />
    </section>
  );
};

ChapterBrowser.propTypes = {
  header: PropTypes.string
};

export default ChapterBrowser;