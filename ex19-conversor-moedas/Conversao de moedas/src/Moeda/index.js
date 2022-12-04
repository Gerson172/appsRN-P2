import React, { Component } from "react";
import { TextInput, Text, TouchableOpacity, Keyboard, StyleSheet, View } from "react-native";


//convert?q=USD_PHP&compact=ultra&apiKey=3110d41608cc9c47be9d
export default class Moeda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moedaA: props.moedaA,
      moedaB: props.moedaB,
      moedaBValor: 0,
      valorConvertido: 0,
    };
    this.converter = this.converter.bind(this);
  }


  async converter() {
    let moeda = this.state.moedaA + "_" + this.state.moedaB;
    let response = await api.get(
      `convert?q=${moeda}&compact=ultra&apiKey=3110d41608cc9c47be9d`
    );
    let cotacao = response.data[moeda];
    let resultado = cotacao * parseFloat(this.state.moedaBValor);
    
    this.setState({
      valorConvertido: resultado.toFixed(2),
    });
    Keyboard.dismiss();
  }

  render() {
    let { moedaA, moedaB } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          {moedaA} para {moedaB}
        </Text>
        <TextInput
          autoFocus={true}
          style={styles.areaInput}
          onChangeText={(moedaBValor) => this.setState({ moedaBValor })} //aqui e this.setState({moedaBValor:moedaBValor})
          //quando e mesmo estado pode colcocar apenas um.
          keyboardType="numeric"
          placeholder="Valor para converter..."
        />
        <TouchableOpacity style={styles.botaoArea} onPress={this.converter}>
          <Text style={styles.botaoTexto}>CONVERTER</Text>
        </TouchableOpacity>
        <Text style={styles.valorConvertido}>
          {(this.state.valorConvertido === 0) ? " " : this.state.valorConvertido}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  areaInput: {
    width: 280,
    height: 45,
    borderWidth: 1,
    textAlign: "center",
    marginTop: 15,
    borderRadius: 5,
    color: "#a9a9a9",
  },
  botaoArea: {
    width: 100,
    height: 40,
    backgroundColor: "#0000ff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  botaoTexto: {
    fontWeight: "bold",
    color: "#FFF",
  },
  valorConvertido: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 15,
  },
});