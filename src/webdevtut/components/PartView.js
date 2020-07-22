import React from 'react';
import LinkCard from './LinkCard';
import ScrollInHeader from './ScrollInHeader';

const PartView = () => {
  return (
    <section id="part-view">
      <ScrollInHeader text="WEB DEV 2020" />
      <ScrollInHeader extraMargin={3} fontSize={2} text="Learn how to build your website using the MERN stack" />
      <article>
        <LinkCard bgColors={['#9d0b0b', '#770808']} cssClasses={['web-bg']} header="Part One" linkUri="/web" text="Web" />
        <LinkCard bgColors={['#274472', '#1a2d4c']} cssClasses={['js-bg']} header="Part Two" linkUri="/js" text="JavaScript" />
        <LinkCard bgColors={['#778A35', '#606f2a']} cssClasses={['node-bg']} header="Part Three" linkUri="/node" text="Node.js" />
        <LinkCard bgColors={['#613659', '#41253c']} cssClasses={['react-bg']} header="Part Four" linkUri="/react" text="React" />
      </article>
      <ScrollInHeader fontSize={2} fromRight={true} text="A tutorial by John Torsten" />
    </section>
  );
};

export default PartView;