import React from 'react';
import { useDispatch } from 'react-redux';
import { setPart } from '../redux/actions/pageActions';
import LinkCard from './common/LinkCard';
import ScrollInHeader from './common/ScrollInHeader';

const PartView = () => {
  const dispatch = useDispatch();
  const clickFunc = part => dispatch(setPart(part));
  return (
    <section id="part-view">
      <ScrollInHeader text="WEB DEV 2020" />
      <ScrollInHeader delay={200} extraMargin={3} fontSize={2} text="Build your custom website using the MERN stack" />
      <article>
        <LinkCard bgColors={['#9d0b0b', '#770808']} clickFunc={() => clickFunc(1)} cssClasses={['web-bg']} header="Part One" linkUri="web" text="Web" />
        <LinkCard bgColors={['#274472', '#1a2d4c']} clickFunc={() => clickFunc(2)} cssClasses={['js-bg']} header="Part Two" linkUri="js" text="JavaScript" />
        <LinkCard bgColors={['#778A35', '#606f2a']} clickFunc={() => clickFunc(3)} cssClasses={['node-bg']} header="Part Three" linkUri="node" text="Node.js" />
        <LinkCard bgColors={['#613659', '#41253c']} clickFunc={() => clickFunc(4)} cssClasses={['react-bg']} header="Part Four" linkUri="react" text="React" />
      </article>
      <ScrollInHeader fontSize={2} fromRight={true} text="A tutorial by John Torsten" />
    </section>
  );
};

export default PartView;