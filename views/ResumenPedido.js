import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  Box,
  Button,
  Text,
  Heading,
  NativeBaseProvider,
  VStack,
  HStack,
  FlatList,
  Image
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
import firebase from '../firebase';

import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {
  const navigation = useNavigation();

  // Context de pedido
  const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);

  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    const nuevoTotal = pedido.reduce((total, articulo) => total + articulo.total, 0);
    mostrarResumen(nuevoTotal);
  };

  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realizas tu pedido, no podrás cambiarlo',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            const pedidoObj = {
              tiempoentrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado: Date.now()
            };

            try {
              const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
              pedidoRealizado(pedido.id);
              navigation.navigate("ProgresoPedido");
            } catch (error) {
              console.log(error);
            }
          }
        },
        { text: 'Revisar', style: 'cancel' }
      ]
    );
  };

  const confirmarEliminacion = id => {
    Alert.alert(
      '¿Deseas eliminar este artículo?',
      'Una vez eliminado no se puede recuperar',
      [
        {
          text: 'Confirmar',
          onPress: () => eliminarProducto(id)
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  return (
    <NativeBaseProvider>
      <Box style={globalStyles.contenedor} p={4}>
        <Heading style={globalStyles.titulo}>Resumen Pedido</Heading>
        <FlatList
          data={pedido}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box borderBottomWidth={1} borderColor="coolGray.200" py={2}>
              <HStack space={4} alignItems="center">
                <Image
                  source={{ uri: item.imagen }}
                  alt={item.nombre}
                  size="lg"
                />
                <VStack>
                  <Text bold>{item.nombre}</Text>
                  <Text>Cantidad: {item.cantidad}</Text>
                  <Text>Precio: CRC {item.precio}</Text>
                  <Button
                    onPress={() => confirmarEliminacion(item.id)}
                    mt={3}
                    colorScheme="danger"
                    style = {{width: "100%"}}
                  >
                    <Text style={[globalStyles.botonTexto, { color: '#FFF' }]}>Eliminar</Text>
                  </Button>
                </VStack>
              </HStack>
            </Box>
          )}
        />

        <Text mt={4} style={globalStyles.cantidad}>Total a Pagar: CRC {total}</Text>

        <Button
          onPress={() => navigation.navigate('Menu')}
          mt={6}
          style = {{backgroundColor:'#000'}}
        >
          <Text style={[globalStyles.botonTexto, { color: '#FFF' }]}>Seguir Pidiendo</Text>
        </Button>

        <Button
          onPress={progresoPedido}
          mt={4}
          style={globalStyles.boton} 
        >
          <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
        </Button>
      </Box>
    </NativeBaseProvider>
  );
};

export default ResumenPedido;
