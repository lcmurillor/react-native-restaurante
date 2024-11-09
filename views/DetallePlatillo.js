import React, { useContext } from "react";
import { Image } from "react-native";
import {
  Box,
  Button,
  Text,
  Heading,
  NativeBaseProvider,
  VStack
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/global";

import PedidoContext from "../context/pedidos/pedidosContext";

const DetallePlatillo = () => {
  // Pedido context
  const { platillo } = useContext(PedidoContext);

  const { nombre, imagen, descripcion, precio } = platillo;

  // Redireccionar
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <Box style={globalStyles.contenedor}>
        <VStack space={4} style={globalStyles.contenido}>
          <Heading style={globalStyles.titulo}>{nombre}</Heading>
          <Image style={globalStyles.imagen} source={{ uri: imagen }} />
          <Text style={{ marginTop: 20 }}>{descripcion}</Text>
          <Text style={globalStyles.cantidad}>Precio: CRC {precio}</Text>
          <Button
            onPress={() => navigation.navigate("FormularioPlatillo")}
            style={globalStyles.boton}
          >
            <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default DetallePlatillo;
