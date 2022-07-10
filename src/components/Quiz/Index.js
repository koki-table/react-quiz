import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Progress from './Progress';
import Question from './Question';
import AnswerOption from './AnswerOption';
import { getQuestionId, getQuestionLength } from '../../api/quiz.questions';
import { questionCurrentIDState } from '../../state/question';

import _ from 'lodash'

import {
  useRecoilState
} from 'recoil'

export default function Quiz(props) {
  const [questionId] = useRecoilState(questionCurrentIDState);
  const question = getQuestionId(questionId);

  const total = getQuestionLength();

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <Progress counter={question.id} total={total} />
        <Question content={question.question} />        
        <ul className="answerOptions">
          { _.shuffle(question.answers).map(item => {
            return (
              <AnswerOption
                answerContent={item.content}
                answerType={item.type}
                answer={item.answer}
            />
            )
          })}
        </ul>
      </div>
    </CSSTransitionGroup>
  );
}