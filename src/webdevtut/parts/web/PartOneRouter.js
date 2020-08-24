import React from 'react';
import { Router } from '@reach/router';
import { useDispatch } from 'react-redux';
import { setPart } from '../../redux/actions/pageActions';
import ChapterBrowser from '../../components/ChapterBrowser';
import ChapterRoot from '../../components/ChapterRoot';

const PartOneRouter = props => {
  const dispatch = useDispatch();
  dispatch(setPart(1));
  return (
    <Router>
      <ChapterBrowser header="Part 1: Web Fundamentals" path="/" {...props} />
      <ChapterRoot path=":chapterId" />
    </Router>
  );
};

export default PartOneRouter;