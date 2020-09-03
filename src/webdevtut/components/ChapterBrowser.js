import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setChapter } from '../redux/actions/pageActions';
import StaggeredLinkList from './StaggeredLinkList';
import ScrollInHeader from './common/ScrollInHeader';
import partMetadata from '../parts/partMetadata';
import { getIndicesFromHref } from '../util/uriHelpers';

const ChapterBrowser = props => {
  const data = partMetadata[getIndicesFromHref().part - 1];
  const dispatch = useDispatch();
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