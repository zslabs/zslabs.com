import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const ZSContext = createContext();

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

const ZSProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <ZSContext.Provider value={value}>{children}</ZSContext.Provider>;
};

ZSProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const ZSConsumer = ZSContext.Consumer;

export { ZSContext, ZSProvider, ZSConsumer };
