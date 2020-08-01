import React from 'react';
import { Router } from '@reach/router';
import Goals from './Goals';

const ChapterOneRouter = () => {
  return (
    <Router>
      <Goals path="1" />
    </Router>
  );
};

export default ChapterOneRouter;