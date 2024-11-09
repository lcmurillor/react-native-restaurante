import React from "react";

import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";

const NuevaOrden = () => {

    const navigation = useNavigation();

  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, styles.contenido]}>
        <TouchableHighlight
          style={[
            globalStyles.boton,
            {
              borderRadius: 100,
              height: 40,
              alignItems: "center",
              paddingTop: 10,
            },
          ]}

          onPress={()=> navigation.navigate('Menu')}
        >
          <Text style={globalStyles.botonTexto}>Crear Nueva Orden</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
})

export default NuevaOrden;
