import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import Overview from './Overview';
import ChapterBrowser from '../../../components/ChapterBrowser';

const PartOneRouter = props => {
  return (
    <Router>
      <ChapterBrowser path="/" {...props} />
      <Overview path="1" {...props} />
    </Router>
  );
};

PartOneRouter.propTypes = {
  part: PropTypes.number,
  header: PropTypes.string
};

export default PartOneRouter;