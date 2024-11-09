import React, { useReducer } from "react";

import PedidosReduce from "./pedidosReduce";
import PedidosContext from "./pedidosContext";

import { SELECCIONAR_PRODUCTO } from "@/types"; 

const PedidoState = (props) => {
  //Crear state inicial
  const inicialState = {
    pedido: [],
    platillo: null
  };
  //use Reducer
  const [state, dispatch] = useReducer(PedidosReduce, inicialState);

  //Selecciona el producto
  const seleccionarPlatillo = platillo =>{
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo
    })
    
  }

  return (
    <PedidosContext.Provider
      value={{
        pedido: state.pedido,
        platillo: state.platillo,
        seleccionarPlatillo
      }}
    >
      {props.children}
    </PedidosContext.Provider>
  );
};

export default PedidoState;
