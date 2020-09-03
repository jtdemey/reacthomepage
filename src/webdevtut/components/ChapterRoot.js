import React from 'react';
import TextTile from './TextTile';
import partMetadata from '../parts/partMetadata';
import LinkBtn from './common/LinkBtn';
import { getIndicesFromHref } from '../util/uriHelpers';
import PageRouterController from '../parts/PageRouterController';

const chapterIsValid = (chapter, data) => !isNaN(chapter) && data.titles[chapter - 1] !== undefined;

const ChapterRoot = () => {
  const indices = getIndicesFromHref();
  if(indices.page) {
    return <PageRouterController />;
  }
  let chapter = indices.chapter;
  const data = partMetadata[indices.part - 1];
  if(chapterIsValid(chapter, data)) {
    return (
      <section className="chapter-root">
        <TextTile text={data.title} background={data.colors.primary} />
        <TextTile text={`Chapter ${chapter}: ${data.titles[chapter - 1]}`} background={data.colors.splitComplements[chapter % 2 === 0 ? 0 : 1]} delay={200} />
        <div>
          <LinkBtn href={`/${data.uri}/${chapter}/1`} background={data.colors.analagous[0]} text="Start Chapter"></LinkBtn>
          <LinkBtn href="/" background={data.colors.analagous[1]} delay={100} text="Main Menu"></LinkBtn>
        </div>
      </section>
    );
  }
  return (
    <partMetadata text={`404: Chapter ${chapter} not found`} /> 
  );
};

export default ChapterRoot;