import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

export const Formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setConsultarApi
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);
  useEffect(() => {
    const consultarApi = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    };
    consultarApi();
  }, []);
  //almacena las selecciones del usuario
  const obtenerMoneda = moneda => {
    setMoneda(moneda);
  };
  const obtenerCriptomoneda = cripto => {
    setCriptomoneda(cripto);
  };
  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    //cambiar el state de consultar api
    setConsultarApi(true)
  };

  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios');
  };
  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        onValueChange={moneda => obtenerMoneda(moneda)}
        selectedValue={moneda}>
        <Picker.Item label="--Seleccionar--" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Escarlina" value="GBP" />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>

      <Picker
        onValueChange={cripto => obtenerCriptomoneda(cripto)}
        selectedValue={criptomoneda}>
        <Picker.Item label="--Seleccionar--" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>

      <Pressable style={styles.btnCotizar} onPress={() => cotizarPrecio()}>
        <Text style={styles.cotizar}>Cotizar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  cotizar: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    fontFamily: 'Lato-Black',
  },
});
