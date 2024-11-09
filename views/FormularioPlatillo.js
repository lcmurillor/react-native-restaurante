import React, { useContext, useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Box,
  Button,
  Text,
  Heading,
  NativeBaseProvider,
  VStack,
  HStack,
  Input,
  Icon
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/global";
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener la fuente de íconos instalada

import PedidoContext from "../context/pedidos/pedidosContext";

const FormularioPlatillo = () => {
  // State para cantidades
  const [cantidad, guardarCantidad] = useState(1);
  const [total, guardarTotal] = useState(0);

  // Context
  const { platillo, guardarPedido } = useContext(PedidoContext);
  const { precio } = platillo;

  // Redireccionar
  const navigation = useNavigation();

  // Calcular el total al cargar el componente o al cambiar la cantidad
  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  // Calcula el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    guardarTotal(totalPagar);
  };

  // Decrementa en uno
  const decrementarUno = () => {
    if (cantidad > 1) {
      guardarCantidad(cantidad - 1);
    }
  };

  // Incrementa en uno
  const incrementarUno = () => {
    guardarCantidad(cantidad + 1);
  };

  // Confirma si la orden es correcta
  const confirmarOrden = () => {
    Alert.alert(
      "¿Deseas confirmar tu pedido?",
      "Un pedido confirmado ya no se podrá modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            // Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              cantidad,
              total
            };

            guardarPedido(pedido);
            navigation.navigate("ResumenPedido");
          }
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ]
    );
  };

  return (
    <NativeBaseProvider>
      <Box style={globalStyles.contenedor} p={4}>
        <Heading style={globalStyles.titulo}>Cantidad</Heading>
        <HStack space={4} justifyContent="center" alignItems="center" mt={4}>
          <Button onPress={decrementarUno} style = {styles.botones} >
            <Icon as={MaterialIcons} name="remove" size="lg" color="white" />
          </Button>
          <Input
            w={24}
            textAlign="center"
            fontSize="2xl"
            value={cantidad.toString()}
            keyboardType="numeric"
            onChangeText={(value) => guardarCantidad(parseInt(value) || 1)}
          />
          <Button onPress={incrementarUno} style = {styles.botones} >
            <Icon as={MaterialIcons} name="add" size="lg" color="white" />
          </Button>
        </HStack>
        <Text mt={4} style={globalStyles.cantidad}>
          Subtotal: $ {total}
        </Text>
        <Button mt={6} style={globalStyles.boton} onPress={confirmarOrden}>
          <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
        </Button>
      </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
    botones:{
        backgroundColor: "#000"
    }
})

export default FormularioPlatillo;
