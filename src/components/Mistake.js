import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from 'react-transition-group';
import twitterImage from "../images/pages/index/return_btn_tw.png"; 


function Mistake(props) {
  return(
    <CSSTransitionGroup
      className="container mistake"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div className="mistake__heading">
        <p>
          <span className="sub-text">残念ながら、はずれです。</span>
          <br/><span className="animateion--neon">{props.quizMistakeCount}</span> 脱落 <span className="text-logo--racket">🏓</span>
          <br/>
        </p>
      </div>
      <div className="mistake__body">
        <p className="text">
          {props.quizMistakeText}
        </p>
        <div className="appeal" data-appeal>
            <div className="appeal__link" data-appeal-last>
              <a href="https://twitter.com/Lobbing_?ref_src=twsrc%5Etfw">
                <img src={twitterImage} alt="Twitterに戻る"></img>
              </a>
            </div>
            <div className="appeal__text">『リツイートとフォローもしてくれたら嬉しいです!!』</div>
            
            <div className="appeal__link appeal__link--return">
              <a href="https://lobbing-quiz-17b48.web.app/">もう1度チャレンジする</a>
            </div>
          </div>
      </div>
    </CSSTransitionGroup>
  ); 
}

Mistake.propTypes = {
  quizMistakeText: PropTypes.string.isRequired,
  quizMistakeCount: PropTypes.string.isRequired
};

export default Mistake;