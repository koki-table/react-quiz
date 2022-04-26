import React from "react";
import PropTypes from "prop-types";

// function Mistake(props) {
//   return <h2 className="mistake">{props.content}</h2>;
// }

// Mistake.propTypes = {
//   content: PropTypes.string.isRequired
// };

// export default Mistake;

function Mistake(props) {
  return <h2 className="mistake">不正解daaa！！</h2>;
}

Mistake.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Mistake;