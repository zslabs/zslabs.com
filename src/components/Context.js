import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const initialState = {
  offCanvasOpen: false,
};

const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'toggleOffCanvas':
      return {
        ...state,
        offCanvasOpen: !state.offCanvasOpen,
      };
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

const { Consumer } = Context;

export { Context, Provider, Consumer };
