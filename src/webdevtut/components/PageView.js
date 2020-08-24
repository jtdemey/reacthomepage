import React from 'react';
import { useDispatch } from 'react-redux';
import PageBreadcrumb from './PageBreadcrumb';
import { setPage } from '../redux/actions/pageActions';

const getPage = () => {
  const split = location.href.split('/');
  console.log(split);
};

const PageView = props => {
  const dispatch = useDispatch();
  dispatch(setPage(getPage()));
  return (
    <section id="page-view">
      <PageBreadcrumb {...props} />
      {props.children}
    </section>
  );
};

export default PageView;