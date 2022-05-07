import React from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from 'react-transition-group';



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
          <p>Bad luck!<br/><span class="animateion--neon">Third</span> stage<br/>{props.quizMistake}</p>
        </div>
        <div class="mistake__body">
          残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん残念むねん
        </div>
      </div>
    </CSSTransitionGroup>
  ); 
}

Mistake.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Mistake;