import React from 'react';
import TextTile from './TextTile';
import { useDispatch, useSelector } from 'react-redux';
import chapterData from '../parts/chapterData';
import { setChapter } from '../redux/actions/pageActions';

const getChapter = () => {
  const href = location.href.split('/');
  return href[href.length - 1];
};

const ChapterRoot = () => {
  const pageState = useSelector(state => state.page);
  const chapter = getChapter();
  if(chapter !== pageState.chapter) {
    useDispatch()(setChapter(chapter));
  }
  const complementInd = chapter % 2 === 0 ? 0 : 1;
  return (
    <section className="chapter-root">
      <TextTile text={chapterData[pageState.part - 1].title} background={chapterData[pageState.part - 1].colors.primary} />
      <TextTile text={`Chapter ${chapter}: ${chapterData[pageState.part - 1].titles[chapter - 1]}`} background={chapterData[pageState.part - 1].colors.splitComplements[complementInd]} delay={200} />
      <div>
        <button style={{background: `${chapterData[pageState.part - 1].colors.analagous[0]}`}}>Start Chapter</button>
        <button style={{background: `${chapterData[pageState.part - 1].colors.analagous[1]}`}}>Main Menu</button>
      </div>
    </section>
  );
};

export default ChapterRoot;