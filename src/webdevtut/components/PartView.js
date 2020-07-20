import React from 'react';
import LinkCard from './LinkCard';

const PartView = () => {
  return (
    <section id="part-view">
      <LinkCard bgColors={['#9d0b0b', '#770808']} cssClasses={['web-bg']} header="Part One" linkUri="/web" text="Web" />
      <LinkCard bgColors={['#274472', '#1a2d4c']} cssClasses={['js-bg']} header="Part Two" linkUri="/js" text="JavaScript" />
      <LinkCard bgColors={['#778A35', '#606f2a']} cssClasses={['node-bg']} header="Part Three" linkUri="/node" text="Node.js" />
      <LinkCard bgColors={['#613659', '#41253c']} cssClasses={['react-bg']} header="Part Four" linkUri="/react" text="React" />
    </section>
  );
};

export default PartView;