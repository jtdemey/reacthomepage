import React from 'react';
import PageView from '../../../components/PageView';
import { useDispatch } from 'react-redux';
import { setChapter, setPage } from '../../../redux/actions/pageActions';

const Overview = props => {
  const dispatch = useDispatch();
  dispatch(setChapter(1));
  dispatch(setPage(1));
  return (
    <PageView {...props}>
    </PageView>
  );
};

export default Overview;