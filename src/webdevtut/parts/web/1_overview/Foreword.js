import React from 'react';
import PageView from '../../../components/PageView';
import FadeParagraph from '../../../components/common/FadeParagraph';
import ScrollInHeader from '../../../components/common/ScrollInHeader';

const text = [
  [
    `Hello! I'm John. I write and maintain web applications.`,
    `By day, I work with the ASP.NET stack and SQL/Oracle, and in my free time I work with the MERN stack: pure JavaScript.`,
    `During the past three years that I've had this job, I've learned a lot about web development.`,
    `The biggest revelation I've had, however, is that web development is made out to be much harder than it is.`
  ],
  [
    `My goal with this tutorial, first and foremost, is to teach you, dear reader, how to use the MERN stack, and thus achieve the coveted title of "Full Stack Developer".`,
    `Secondarily, and more importantly, my goal is to open the gates of web programming to those without any background in computer science.`
  ],
  [
    `The modern web is a conglomeration of cumulative technologies, each iterating upon generations of previous technologies.`,
    `Writing web applications nowadays is less about writing your own code and more about properly using other peoples' tools in your code.`,
    `One of the most applicable addages I hear often from other software developers is "why reinvent the wheel?"`
  ],
  [
    `Having grown up alongside the Internet, I can say confidently that the web is no longer in its infancy, and as such,`,
    `most of the hurdles between you and your ideal website have already been surmounted by someone else, each solution packaged for public use in a GitHub repository somewhere.`,
    `Not only have most web problems been solved, they've been solved in a dozen different ways, each much more optimized and secure than something you could ever write yourself.`,
    `This tutorial won't teach you the fine-grained mechanical details of how the web works; I aim to get you to a point of competency with the web and full agency to go out and learn effectively.`
  ]
];

const Foreword = props => {
  return (
    <PageView {...props}>
      <ScrollInHeader text="Foreword" />
      {text.map((p, i) => (
        <FadeParagraph key={i} text={text[i].join(' ')} />
      ))}
    </PageView>
  );
};

export default Foreword;