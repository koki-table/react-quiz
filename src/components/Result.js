import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import twitterImage from "../images/pages/index/return_btn_tw.png"; 
import resultImage from "../images/pages/index/result.jpg"; 


function Result(props) {
  return (
    <CSSTransitionGroup
    className="container result"
    component="div"
    transitionName="fade"
    transitionEnterTimeout={800}
    transitionLeaveTimeout={500}
    transitionAppear
    transitionAppearTimeout={500}
  >
    <div className="result__heading">
      <p>全問正解。<br/>あなたは完璧な<span className="animateion--neon"><br/>雑学王</span>です。
        <span className="text-logo--racket">🏓</span>
        <br/>
      </p>
    </div>
    <div className="result__body">
      {/* <p className="text">
        <p className='text'>さんきゅーさんきゅーさんきゅーさんきゅーさんきゅーさんきゅーさんきゅーさんきゅーさんきゅー</p>
      </p> */}
      <div className='img'>
        <img src={resultImage} alt=""></img>
      </div>
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

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
