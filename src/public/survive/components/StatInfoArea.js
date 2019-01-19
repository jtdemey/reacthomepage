import React from 'react';
import StatInfoTile from './StatInfoTile';
import { getStatusPhrases } from '../app/surviveUtilities';

const StatInfoArea = (props) => {
  const statPhrases = getStatusPhrases(props.playerHealth, props.playerSanity, props.playerEnergy);
  return (
    <div className="stat-info-area">
      <StatInfoTile clientWidth={props.clientWidth}
                    clientHeight={props.clientHeight}
                    svgsrc={'../media/heart2.svg'}
                    playerStat={props.playerHealth}
                    statPhrase={statPhrases.hpPhrase} />
      <StatInfoTile clientWidth={props.clientWidth}
                    clientHeight={props.clientHeight}
                    svgsrc={'../media/brain.svg'}
                    playerStat={props.playerSanity}
                    statPhrase={statPhrases.spPhrase} />
      <StatInfoTile clientWidth={props.clientWidth}
                    clientHeight={props.clientHeight}
                    svgsrc={'../media/battery.svg'}
                    playerStat={props.playerEnergy}
                    statPhrase={statPhrases.epPhrase} />
    </div>
  );
};

export default StatInfoArea;