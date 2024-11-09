import React, { useReducer } from "react";

import firebaseReducer from "./firebaseReducer";
import firebaseContext from "./firebaseContext";

import firebase from "../../firebase";

import { OBTENER_PRODUCTOS_EXITO } from "../../types";

import _ from 'lodash';

const FirebaseState = (props) => {


  //Crear state inicial
  const inicialState = {
    menu: []
    
  };
  //use Reducer
  const [state, dispatch] = useReducer(firebaseReducer, inicialState);

  //fUNCION PARA traer produtos
  const obtenerProductos = ()=>{
    


    //consultar firebase
    firebase.db.collection('productos').where('existencia','==' ,true).onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let platillos = snapshot.docs.map(doc =>{
        return{
          id: doc.id,
          ...doc.data()
        }
      });

      platillos = _.sortBy(platillos, 'categoria')
      // Resultado 
      dispatch({
        type:OBTENER_PRODUCTOS_EXITO,
        payload: platillos
      });
      
    }
    
  }

  return (
    <firebaseContext.Provider
      value={{
        menu: state.menu,
        firebase, 
        obtenerProductos
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
};

export default FirebaseState;
