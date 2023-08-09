import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';

export default function App() {
  const [moedaOrigem, setMoedaOrigem] = useState('BRL');
  const [moedaDestino, setMoedaDestino] = useState('USD')
  const [ValorConvertido, setValorConvertido] = useState('')

  const buscarhandle = () => {
    let URL = `https://economia.awesomeapi.com.br/last/USD-BRL`
    setValorConvertido(URL);
  }
  const limparResultado = () => {
    setValorConvertido('')
  }
  return (
    <View style={styles.container}>
      <Text>Conversor de moeda</Text>
      <View>
        <Text>Moeda 1</Text>
        <Picker>

        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
