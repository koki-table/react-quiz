import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from 'react-transition-group';
import twitterImage from "../images/pages/index/return_btn_tw.png"; 



// function Mistake(props) {
//   return <h2 className="mistake">{props.content}</h2>;
// }

// Mistake.propTypes = {
//   content: PropTypes.string.isRequired
// };

// export default Mistake;

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
      <div>
        <div class="mistake__heading">
          <p>Bad luck!
            <br/><span class="animateion--neon">Third</span> stage <span class="text-logo--racket">🏓</span>
            {/* <br/>{props.quizMistake} */}
          </p>
        </div>
        <div class="mistake__body">
          <p class="text">
            残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん
          </p>
          <div class="appeal" data-appeal>
              <div class="appeal__link" data-appeal-last>
                <a href="https://twitter.com/Lobbing_?ref_src=twsrc%5Etfw">
                  <img src={twitterImage} alt="Twitterに戻る"></img>
                </a>
              </div>
              <div class="appeal__text">『リツイートとフォローもしてくれたら嬉しいです!!』</div>
              
              <div class="appeal__link appeal__link--return">
                <a href="http://localhost:3000/">もう1度チャレンジする</a>
              </div>
            </div>
        </div>
      </div>
    </CSSTransitionGroup>
  ); 
}

Mistake.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Mistake;