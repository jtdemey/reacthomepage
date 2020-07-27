import React from 'react';
import PropTypes from 'prop-types';
import PageBreadcrumb from './PageBreadcrumb';

const PageView = props => {
  console.log(props)
  return (
    <section id="page-view">
      <PageBreadcrumb {...props} />
      {props.children}
    </section>
  );
};

PageView.propTypes = {
  chapter: PropTypes.number,
  header: PropTypes.string,
  roadmapIndex: PropTypes.number
};

export default PageView;