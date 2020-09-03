import React from 'react';
import { Router } from '@reach/router';
import ChapterBrowser from '../components/ChapterBrowser';
import ChapterRoot from '../components/ChapterRoot';
import partMetadata from './partMetadata';
import { getIndicesFromHref } from '../util/uriHelpers';

const ChapterRouter = props => {
  const data = partMetadata[getIndicesFromHref().part - 1];
  return (
    <Router>
      <ChapterBrowser header={data.title} path="/" {...props} />
      <ChapterRoot path=":chapterId/*" />
    </Router>
  );
};

export default ChapterRouter;