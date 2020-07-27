import React from 'react';
import PropTypes from 'prop-types';
import chapterData from '../parts/chapterData';

const partTitles = ['Part 1: Web', 'Part 2: JavaScript', 'Part 3: Node.js', 'Part 4: React'];

const PageBreadcrumb = props => {
  console.log(props)
  return (
    <div id="breadcrumb">
      <div>{partTitles[props.part - 1]}</div>
      <span>/</span>
      <div>{`Chapter ${props.chapter}: ${chapterData[props.part - 1].titles[props.chapter - 1]}`}</div>
      <span>/</span>
      <div>{partTitles[props.part - 1]}</div>
    </div>
  );
};

PageBreadcrumb.propTypes = {
  part: PropTypes.number,
  chapter: PropTypes.number,
  page: PropTypes.number,
  pageTitle: PropTypes.string
};

export default PageBreadcrumb;