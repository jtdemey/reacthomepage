import React from 'react';
import PageBreadcrumb from './PageBreadcrumb';

const PageView = props => {
  return (
    <section id="page-view">
      <PageBreadcrumb {...props} />
      {props.children}
    </section>
  );
};

export default PageView;