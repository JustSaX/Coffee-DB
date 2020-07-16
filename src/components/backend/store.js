// store.js
// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

import React, {createContext, useReducer} from 'react';


// initialState is the blue print of my 'State' Object
const initialState = {
  beans : {
    settings: [],
    data: [],
    pics: []
  },
   brews : {
     settings: [],
     data: [],
     pics: []
   }}

  //pics contains the link to the stored pictures of brews and beans

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newState
    switch(action.type) {
      /*case 'setBeansSettings' */
      case 'setBeansData':
        state.beans.data = action.value
        newState = state
        return newState
      case 'setBeansSettings':
          state.beans.settings = action.value
          newState = state
          return state
      case 'setBeansPics':
          state.beans.pics = action.value
          newState = state
          return state

      case 'setBrewsData':
        state.brews.data = action.value
        newState = state
        return state
      case 'setBrewsSettings':
        state.brews.settings = action.value
        newState = state
        return state
        case 'setBrewsPics':
          state.brews.pics = action.value
          newState = state
          return state
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};


export { store, StateProvider }