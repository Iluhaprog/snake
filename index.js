/*
  Each AppElement will use self state.

  +---------+
  |  STATE  | ----> changeState
  +---------+
      |
      |
      +---> AppElement
              1. handleOnStateChange

  AppElement:
    - children

  State
    - _data // data in state
    - transform ( transformer ) -> state // function for transform state.
                                         // Transformer is a function with arg "prevState",
    - addChangeHandler ( handler ) -> state // handler is a function with arg "state"

  Usage example:

  const element = new AppElement("div");
  const userData = new State();

  userData.addChangeHandler((state) => {
    element.className = "hello";
  });

  element.onClick = () => state.change((prevState) => {
    // some logic
    return {...};
  });
*/

import "./src/themes/default/styles/index.scss";
