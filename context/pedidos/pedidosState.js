import React, { useReducer } from "react";

import PedidosReduce from "./pedidosReduce";
import PedidosContext from "./pedidosContext";

const PedidoState = (props) => {
  //Crear state inicial
  const inicialState = {
    pedido: [],
  };
  //use Reducer
  const [state, dispatch] = useReducer(PedidosReduce, inicialState);

  return (
    <PedidosContext.Provider
      value={{
        pedido: state.pedido,
      }}
    >
      {props.children}
    </PedidosContext.Provider>
  );
};

export default PedidoState;
