import React, {useContext} from 'react';
import { Button, NativeBaseProvider, Text } from 'native-base';
import globalStyles from '../../styles/global';
import { useNavigation } from '@react-navigation/native'
import PedidoContext from '../../context/pedidos/pedidosContext';

const BotonResumen = () => {

    const navigation = useNavigation();

    // Leer el objeto de pedido
    const { pedido } = useContext(PedidoContext);

    if(pedido.length === 0) return null;

    return ( 
        <NativeBaseProvider>
             <Button 
            onPress={ () => navigation.navigate("ResumenPedido") }
            style={globalStyles.boton}
        >
            <Text style={globalStyles.botonTexto}>Ir a Pedido</Text>
        </Button>
        </NativeBaseProvider>
       
     );
}
 
export default BotonResumen;