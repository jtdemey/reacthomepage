import React from 'react';
import { addAOrAn } from '../../app/imposterUtilities';

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
  return (
    <React.Fragment>
      <h3 className="text-center">{parseRole(props.role)}</h3>
      <h3 className="text-center">in {addAOrAn(props.scenario.toLowerCase())},</h3>
      <h3 className="text-center">but {props.condition.toLowerCase()}.</h3>
    </React.Fragment>
  );
};
/*

      <h3>in a {props.scenario},</h3>
      <h3>but {props.condition}.</h3>
*/
export default ScenarioPrompt;