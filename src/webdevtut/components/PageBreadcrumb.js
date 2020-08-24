import React from 'react';
import chapterData from '../parts/chapterData';
import { useSelector } from 'react-redux';
import { useSprings, animated } from 'react-spring';

const partTitles = ['Part 1: Web', 'Part 2: JavaScript', 'Part 3: Node.js', 'Part 4: React'];

const yTrans = y => `translateY(${y}px)`;

const getStyle = spring => ({...spring, transform: spring.y.interpolate(yTrans)});

const PageBreadcrumb = () => {
  const pageState = useSelector(state => state.page);
  const [springs, set] = useSprings(3, () => ({
    opacity: 0,
    y: -100
  }));
  set(i => ({
    delay: i * 120,
    opacity: 1,
    y: 0
  }));
  return (
    <div id="breadcrumb">
      <animated.div style={getStyle(springs[0])}>{partTitles[pageState.part - 1]}</animated.div>
      <span>/</span>
      <animated.div style={getStyle(springs[1])}>{`Chapter ${pageState.chapter}: ${chapterData[pageState.part - 1].titles[pageState.chapter - 1]}`}</animated.div>
      <span>/</span>
      <animated.div style={getStyle(springs[2])}>{`Page ${pageState.page}`}</animated.div>
    </div>
  );
};

export default PageBreadcrumb;