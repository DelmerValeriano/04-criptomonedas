import React, {useState,useEffect} from 'react';

import {StyleSheet, Image, View,ScrollView,ActivityIndicator} from 'react-native';
import {Formulario} from './components/Formulario';
import {Header} from './components/Header';
import axios from 'axios'
import { Cotizacion } from './components/Cotizacion';


const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarApi,setConsultarApi] = useState(false);
  const [resultado,setResultado] = useState({});
  const [cargando,setCargando] = useState(false)

  useEffect(() => {

    const cotizarCriptomoneda = async ()=>{
      if (consultarApi) {
       
         //consultar la api para obtener result
         const url= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado = await axios.get(url);
        setCargando(true);
       //Ocultar el espiner y mostrar el resultado
        setTimeout(() => {

          
                  setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
                  setConsultarApi(false)
                  setCargando(false);
          
        }, 1500);
        
      }
        
    }
    cotizarCriptomoneda();


    

  }, [consultarApi])


  //mostrar el spinner el el resultado

  const componente =cargando ? <ActivityIndicator size="large" color="#5E49E2" /> :    <Cotizacion resultado={resultado}/>

  return (

    <ScrollView>


    
      <Header />
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarApi={setConsultarApi}
        />
       
      </View>

      <View style={{marginTop:40}}>
        {componente}

      </View>
    
        </ScrollView>
  
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
