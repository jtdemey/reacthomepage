import React from 'react';
import { Router } from '@reach/router';
import { useDispatch } from 'react-redux';
import { setPart } from '../../redux/actions/pageActions';
import Overview from './1/Overview';
import ChapterBrowser from '../../components/ChapterBrowser';

const PartOneRouter = props => {
  const dispatch = useDispatch();
  dispatch(setPart(1));
  return (
    <Router>
      <ChapterBrowser header="Part 1: Web Fundamentals" path="/" {...props} />
      <Overview path="1" {...props} />
    </Router>
  );
};

export default PartOneRouter;