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
  const data = chapterData[pageState.part - 1];
  return (
    <section id="chapter-browser">
      <ScrollInHeader background={data.colors.primary} text={props.header} />
      <StaggeredLinkList  baseUri={`/${data.uri}`}
                          linkClickFunc={index => dispatch(setChapter(index))}
                          listItems={data.titles}
                          spanColor={data.colors.primary} />
    </section>
  );
};

ChapterBrowser.propTypes = {
  header: PropTypes.string
};

export default ChapterBrowser;