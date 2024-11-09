import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  NativeBaseProvider,
} from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import PedidoContext from "../context/pedidos/pedidosContext";
import firebase from "../firebase";
import Countdown from "react-countdown";

const ProgresoPedido = () => {
  const navigation = useNavigation();
  const { idpedido } = useContext(PedidoContext);

  const [tiempo, guardarTiempo] = useState(0);
  const [completado, guardarCompletado] = useState(false);

  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db
        .collection("ordenes")
        .doc(idpedido)
        .onSnapshot(function (doc) {
          const data = doc.data();
          if (data) {
            guardarTiempo(data.tiempoentrega);
            guardarCompletado(data.completado);
          }
        });
    };
    obtenerProducto();
  }, [idpedido]);

  // Muestra el countdown en la pantalla
  const renderer = ({ minutes, seconds }) => {
    return (
      <Text style={styles.tiempo}>
        {minutes}:{seconds}
      </Text>
    );
  };

  return (
    <NativeBaseProvider>
      <Box style={globalStyles.contenedor} py={10}>
        <VStack space={5} alignItems="center">
          {tiempo === 0 && (
            <>
              <Text textAlign="center">Hemos recibido tu orden...</Text>
              <Text textAlign="center">
                Estamos calculando el tiempo de entrega
              </Text>
            </>
          )}

          {!completado && tiempo > 0 && (
            <>
              <Text textAlign="center">Su orden estará lista en:</Text>
              <Text style = {{padding: 40}}>
                <Countdown
                  date={Date.now() + tiempo * 60000}
                  renderer={renderer}
                />
              </Text>
            </>
          )}

          {completado && (
            <>
              <Heading style={styles.textoCompletado}>Orden Lista</Heading>
              <Text style={styles.textoCompletado}>
                Por favor, pase a recoger su pedido
              </Text>
              <Button
                style={globalStyles.boton}
                mt={10}
                onPress={() => navigation.navigate("NuevaOrden")}
              >
                <Text style={globalStyles.botonTexto}>
                  Comenzar Una Orden Nueva
                </Text>
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: "center",
    marginTop: 80,
  },
  textoCompletado: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 20,
  },
});

export default ProgresoPedido;
