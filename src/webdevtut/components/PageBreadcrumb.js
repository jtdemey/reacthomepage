import React from 'react';
import chapterData from '../parts/chapterData';
import { useSelector } from 'react-redux';

const partTitles = ['Part 1: Web', 'Part 2: JavaScript', 'Part 3: Node.js', 'Part 4: React'];

const PageBreadcrumb = () => {
  const pageState = useSelector(state => state.page);
  return (
    <div id="breadcrumb">
      <div>{partTitles[pageState.part - 1]}</div>
      <span>/</span>
      <div>{`Chapter ${pageState.chapter}: ${chapterData[pageState.part - 1].titles[pageState.chapter - 1]}`}</div>
      <span>/</span>
      <div>{partTitles[pageState.part - 1]}</div>
    </div>
  );
};

export default PageBreadcrumb;