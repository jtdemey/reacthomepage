import React from 'react';

const RulesModal = props => {
  const css = props.isVisible ? 'rules-modal fade-in' : 'modal-hidden rules-modal';
  return (
    <div className={css}>
      <div className="close-modal-row">
        <span className="close-x"
              onClick={props.closeModalFunc}>
          <strong>x</strong>
        </span>
      </div>
      <div className="rules-content-area">
        <h2>How to Play</h2>
        <p>Imposter is a game about acting and subtlety.</p><br />
        <p>Each game can have up to 8 players; at least 4 are recommended.</p><br />
        <p>Each round has a&nbsp;
        <span className="dark-highlight">scenario</span>&nbsp;
        and a&nbsp;
        <span className="light-highlight">condition</span>.</p><br />
        <p>If you're <span className="light-hightlight">innocent</span>, the scenario and condition will 
          be shown on your screen.</p><br />
        <p>If you're the <span className="dark-highlight">Imposter</span>, however, you won't
          know this information.</p><br />
        <p>The <span className="light-highlight">objective</span> for the innocents is to unanimously agree
          on who the Imposter is. If you think you know who the Imposter is, 
          &nbsp;<span className="dark-highlight">vote to accuse</span> them.</p><br />
        <p>The <span className="light-highlight">objective</span> for the Imposter is to appear as though
          you are innocent, using contextual clues to answer questions posed at you satisfactorily.</p><br />
        <p>The gameplay itself is simple: the player designated as <span className="light-highlight">(first)</span>&nbsp;
          asks any other player a question. After that player answers, they 
          ask another player a question.</p><br />
        <p>The game ends when either all players except one agree on who the&nbsp;
          <span className="dark-highlight">Imposter</span> is or time runs out. If time runs out, the&nbsp;
          <span className="dark-highlight">Imposter</span> wins. If the innocents correctly agree on 
          who the <span className="dark-highlight">Imposter</span> is, the innocents win. However, if 
          the majority of the innocents vote to accuse another innocent, the&nbsp;
          <span className="dark-highlight">Imposter</span> wins.</p><br />
      </div>
    </div>
  );
};

export default RulesModal;