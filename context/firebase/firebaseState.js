import React, { useReducer } from "react";

import firebaseReducer from "./firebaseReducer";
import firebaseContext from "./firebaseContext";

import firebase from "../../firebase";

const FirebaseState = (props) => {


  //Crear state inicial
  const inicialState = {
    menu: [],
    
  };
  //use Reducer
  const [state, dispatch] = useReducer(firebaseReducer, inicialState);

  return (
    <firebaseContext.Provider
      value={{
        menu: state.menu,
        firebase
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};

export default FirebaseState;
