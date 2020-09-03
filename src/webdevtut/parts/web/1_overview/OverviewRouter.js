import React from 'react';
import { Router } from '@reach/router';
import Goals from './Goals';
import WebConvo from './WebConvo';
import Foreword from './Foreword';

const OverviewRouter = () => {
  return (
    <Router>
      <Foreword path="/1" />
      <Goals path="/2" />
      <WebConvo path="/3" />
    </Router>
  );
};

export default OverviewRouter;