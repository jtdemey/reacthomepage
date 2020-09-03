import React from 'react';
import { getIndicesFromHref } from '../util/uriHelpers';
import OverviewRouter from './web/1_overview/OverviewRouter';

const getPageRouter = (part, chapter) => {
  const notFound = <partMetadata text={'404 Not Found'} />;
  switch(parseInt(part)) {
    case 1:
      switch(parseInt(chapter)) {
        case 1:
          return <OverviewRouter />;
        default:
          return notFound;
      }
    case 2:
    case 3:
    case 4:
    default:
      return notFound;
  }
};

const PageRouterController = () => {
  const indices = getIndicesFromHref();
  return (
    <React.Fragment>
      {getPageRouter(indices.part, indices.chapter)}
    </React.Fragment>
  );
};

export default PageRouterController;