//import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Alert, Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
//import { TextInput } from 'react-native-web';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autonomia: '',
      ltsTanque: '',
      percurso: '',
      uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
      iteration: 'Informe os valores para o calculo.'
    }

    this.calcular = this.calcular.bind(this);
    this.atualizar = this.atualizar.bind(this);
  }

  calcular() {
    let lts = 0;
    let autonomia = 0;
    try {
      lts = parseFloat(this.state.ltsTanque.replace(',','.'));
      autonomia = parseFloat(this.state.autonomia.replace(',','.'));
    } catch (error) {
      Alert.alert('Informe valores válidos!');
    }
    
    if (lts>0 && autonomia>0) {
      let resultado = lts*autonomia;
      this.setState({ iteration: `Combustível para aproximadamente: ${resultado.toFixed(0)} Km(s).`});
      this.setState({ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' });
    } else {
      Alert.alert('Os campos Autonomia e Litros precisam ser maior que 0!');
    }
  }

  atualizar() {
    let autonomia = 0.0;
    let percurso = 0.0;
    let lts = 0.0;
    try {
      autonomia = parseFloat(this.state.autonomia);
      percurso = parseFloat(this.state.percurso);
      lts = parseFloat(this.state.ltsTanque);
    } catch {
      Alert.alert('Informe valores válidos!')
    }
    let aux = 0;
    if (percurso > 0 && autonomia > 0) {
      if ( lts > 0 || lts > (percurso/autonomia) ) {
        aux = lts - (percurso / autonomia)       
      } else {
        this.setState({ ltsTanque: aux > 0 ? aux : lts });
      }
      this.setState({ltsTanque: aux.toFixed(3).toString()})
      this.setState({iteration : `Combustível para aproximadamente: ${(aux*autonomia).toFixed(1)} Km(s).`} );
    }
    else {
      Alert.alert('Ops! Está faltando a autonomia ou o percurso!');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*Imagem   */}
        <Image
          source={{ uri: this.state.uri }}
          style={{ width: 75, height: 75 }}
        />
        <Text style={styles.title}>Computador de Bordo</Text>
        <View style={styles.contDados}>
          <Text style={styles.label}>Autonomia:</Text>
          <TextInput
            style={styles.textinput}
            value={this.state.autonomia}
            autoFocus
            placeholder='Km/L'
            onChangeText={(e) => { this.setState({ autonomia: e.replace(',', '.') }) }}
            onFocus={() => this.setState({
              uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
              iterarion: 'Informe os valores para o calculo.'
            })}
            keyboardType='numeric'
          >
          </TextInput>
          <Text style={styles.label}>Litros no Tanque:</Text>
          <TextInput
            style={styles.textinput}
            value={this.state.ltsTanque}
            placeholder='Litros'
            onChangeText={(e) => { this.setState({ ltsTanque: e.replace(',', '.') }) }}
            keyboardType='numeric'
          >
          </TextInput>
        </View>
        {/* View Percorrer */}
        <View style={styles.contPercorrer}>
          <Text style={styles.label}>Se percorrer:</Text>
          <TextInput
            style={styles.textinput}
            value={this.state.percurso}
            placeholder='Quilometros'
            onChangeText={(e) => this.setState({ percurso: e.replace(',','.') })}
            keyboardType='numeric'
          >
          </TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={this.atualizar}
          >
            <Text style={styles.textbutton}>Atualizar Qtd. Combustível</Text>
          </TouchableOpacity>
        </View>
        {/* View calcular */}
        <View style={styles.contResultado}>
          <Text style={styles.iteration}>{this.state.iteration}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.calcular}
          >
            <Text style={styles.textbutton}>Calcular Autonomia</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#05b0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contDados: { // container
    backgroundColor: '#01b9f0', 
    width: '95%',
    padding: 15,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 10,
  },
  contPercorrer: { //container
    width: '95%',
    backgroundColor: '#01b9f0',
    padding: 15,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 10,
  },
  contResultado: { //container
    width: '95%',
    backgroundColor: 'silver',
    padding: 15,
    borderRadius: 3,
    borderWidth: 1
  },
  title: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF'
  },
  textinput: {
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#99a',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  button: {
    padding: 5,
    backgroundColor: 'rgba(80, 80, 255, .9)',
    borderRadius: 5
  },
  textbutton: {
    color: 'rgba(255,255,255 ,1)',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  iteration: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
    //color: '#fff',
  },
});

export default App;