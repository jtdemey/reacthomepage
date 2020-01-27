import React from 'react';
import { useSelector } from 'react-redux';
import { addAOrAn } from '../../app/imposterUtilities';

const getPlayerRole = (sockId, roles) => {
  const res = roles.filter(r => r.socketId === sockId);
  if(res.length < 1) {
    console.error(`ScenarioPrompt unable to find role for ${sockId}`, roles);
  }
  return res[0].role;
};

const parseRole = roleName => {
  let base = roleName.toLowerCase();
  let result = "You're ";
  if(base.substring(0, 3) === 'the') {
    return result + base;
  }
  result += 'a';
  const vowels = [ ...'aeiou' ];
  if(vowels.some(v => v === base.charAt(0))) {
    result += 'n';
  }
  return `${result} ${base}`;
};

const ScenarioPrompt = props => {
  const state = useSelector(state => {
    return {
      scenario: state.game.scenario,
      condition: state.game.condition,
      roles: state.game.roles
    };
  });
  return (
    <React.Fragment>
      <h3 className="text-center">{parseRole(getPlayerRole(props.socketId, state.roles))}</h3>
      <h3 className="text-center">in {addAOrAn(state.scenario.toLowerCase())},</h3>
      <h3 className="text-center">but {state.condition.toLowerCase()}.</h3>
    </React.Fragment>
  );
};

export default ScenarioPrompt;