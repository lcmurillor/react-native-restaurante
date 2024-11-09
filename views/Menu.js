import React, { useContext, useEffect } from "react";
import firebaseContext from "../context/firebase/firebaseContext";
import {
  NativeBaseProvider,
  Spacer,
  Box,
  HStack,
  Image,
  FlatList,
  VStack,
  Text
} from "native-base";
import globalStyles from "../styles/global";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import PedidoContext from "../context/pedidos/pedidosContext";

import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  //Context de firebase
  const { menu, obtenerProductos } = useContext(firebaseContext);

  const {seleccionarPlatillo} = useContext(PedidoContext);

  const navigation = useNavigation()

  let categoriaActual = "";

  const mostrarHeading = (categoria) => {

    if (categoriaActual === "" || categoriaActual !== categoria) {
      categoriaActual = categoria;
      return (
        <Spacer style={styles.separador}>
          <Text style={styles.separadorTexto}> {categoria} </Text>
        </Spacer>
      );
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <NativeBaseProvider>
      <Box style={globalStyles.contenedor} bgColor="#FFF">
        <FlatList

          data={menu}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
            onPress={()=>{
                seleccionarPlatillo(item)
                navigation.navigate('DetallePlatillo')
                
            }}
            >
                <Box borderBottomWidth="1" borderColor="muted.300" py="2" px="2" >
              {mostrarHeading(item.categoria)}
              <HStack space={[2, 3]} justifyContent="space-between" >
                <Image
                  source={{
                    uri: item.imagen,
                  }}
                  size="lg"
                  alt="Imagen plato"
                />
                <VStack justifyContent="center">
                  <Text bold>{item.nombre}</Text>
                  <Text color="muted.400" isTruncated maxW="95%">
                    {item.descripcion}
                  </Text>
                  <Text fontSize="xs" bold>
                    Precio: CRC{item.precio}
                  </Text>
                </VStack>
                <Spacer />
              </HStack>
            </Box>
            </TouchableWithoutFeedback>
            
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  separador: {
    backgroundColor: "#000",
    padding: 5,
  },
  separadorTexto: {
    color: "#FFDA00",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default Menu;
