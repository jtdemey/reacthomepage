import React from 'react';
import PageBreadcrumb from './PageBreadcrumb';
import { getIndicesFromHref } from '../util/uriHelpers';
import { useDispatch } from 'react-redux';
import { setIndices } from '../redux/actions/pageActions';

const PageView = props => {
  const indices = getIndicesFromHref();
  useDispatch()(setIndices(indices.part, indices.chapter, indices.page));
  return (
    <section id="page-view">
      <PageBreadcrumb {...props} />
      <main>
        {props.children}
      </main>
    </section>
  );
};

export default PageView;