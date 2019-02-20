import React from 'react';
import StatInfoTile from './StatInfoTile';
import { getStatusPhrases } from '../../app/surviveUtilities';

const StatInfoArea = (props) => {
  const statPhrases = getStatusPhrases(props.playerHealth, props.playerSanity, props.playerEnergy);
  return (
    <div className="stat-info-area">
      <StatInfoTile clientWidth={props.clientWidth}
                    clientHeight={props.clientHeight}
                    tileId={0}
                    svgsrc={'../media/heart2.svg'}
                    playerStat={props.playerHealth}
                    statPhrase={statPhrases.hpPhrase} />
      <StatInfoTile clientWidth={props.clientWidth}
                    clientHeight={props.clientHeight}
                    tileId={1}
                    svgsrc={'../media/brain.svg'}
                    playerStat={props.playerSanity}
                    statPhrase={statPhrases.spPhrase} />
      <StatInfoTile clientWidth={props.clientWidth}
                    clientHeight={props.clientHeight}
                    tileId={2}
                    svgsrc={'../media/battery.svg'}
                    playerStat={props.playerEnergy}
                    statPhrase={statPhrases.epPhrase} />
    </div>
  );
};

export default StatInfoArea;