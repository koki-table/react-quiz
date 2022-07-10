import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';


import { questionCurrentIDState } from '../../state/question';
import { pageState } from '../../state/page';
import { getQuestionLength } from '../../api/quiz.questions';

function AnswerOption(props) {
  const [questionCurrentID, setQuestionCurrentID] = useRecoilState(questionCurrentIDState);
  const [page, setPageState] = useRecoilState(pageState);
  const total = getQuestionLength();

  // 正解・間違い・完了の判定
  function onChangeListener(e) {

    if(questionCurrentID == total) {
      return setPageState(2);
    }

    if(e.target.value === 'Sony') {
      return setQuestionCurrentID(questionCurrentID + 1)
    }

    return setPageState(1);
  }

  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={false}
        id={props.answerType}
        value={props.answerType}
        disabled={props.answer}
        onChange={(e) => onChangeListener(e)}
      />
      <label className="radioCustomLabel" htmlFor={props.answerType}>
        {props.answerContent}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;
