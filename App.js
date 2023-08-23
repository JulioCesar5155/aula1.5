import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [moedaOrigem, setMoedaOrigem] = useState('BRL')
  const [moedaDestino, setMoedaDestino] = useState('USD')
  const [valorConvertido, setValorConvertido] = useState('')
  const [valorOriginal, setValorOriginal] = useState('33.333333')

  const buscarHandle = async () => {
    let URL = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`
    try {
      let page = await fetch(URL)
      let json = await page.json()
      console.log(json)
      let indice = parseFloat(json[`${moedaOrigem}${moedaDestino}`].high)
      //setValorConvertido(indice)
      let valor = parseFloat(valorOriginal)
      setValorConvertido((indice*valor).toFixed(2))
    } catch (error) {
      setValorConvertido(`Erro: ${error.message}`)
    }
    // setValorConvertido(URL);
  }

  const limparResultado = ()=> {
    setValorConvertido('')
  }
  
  return (
    <View style={styles.container}>
      <Text style={{color: '#fff'}}>Conversor de Moedas</Text>
      <View>
        <Text style={{color: '#fff'}}>Moeda 1</Text>
        <Picker
          style={{ height: 50, width: 200, color: '#fff' }}
          selectedValue={moedaOrigem}
          onValueChange={(itemValue, itemIndex) => setMoedaOrigem(itemValue)}
        >
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
      </View>
      <View>
        <Text style={{color: '#fff'}}>Moeda 2</Text>
        <Picker
          style={{ height: 50, width: 200, color: '#fff' }}
          selectedValue={moedaDestino}
          onValueChange={(itemValue, itemIndex) => setMoedaDestino(itemValue)}
        >
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
      </View>
      <View>
        <TextInput style={{color: '#000', backgroundColor: '#fff', borderRadius: 10, width: 200, height: 40, textAlign: 'center'}} value={valorOriginal} onChangeText={setValorOriginal} keyboardType='numeric'/>
      </View>
      <Pressable onPress={buscarHandle} style={{backgroundColor: '#fff', borderRadius: 10, margin: 10, width: 200, height: 40, textAlign: 'center'}}><Text style={{color: '#000'}}>Buscar Valor</Text></Pressable>
      <Text style={{color: '#000', backgroundColor: '#fff', borderRadius: 10, width: 200, height: 40, textAlign: 'center'}}>{`Resultado: ${valorConvertido}`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});