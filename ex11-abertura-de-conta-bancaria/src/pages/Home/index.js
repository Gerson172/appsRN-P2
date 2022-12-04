import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { sexos, escolaridades } from '../../../data/options'

export default function Home() {
  const navigation = useNavigation();

  const [name, setName] = useState();
  const [idade, setIdade] = useState();
  const [sexo, setSexo] = useState();
  const [escolaridade, setEscolaridade] = useState();
  const [limite, setLimite] = useState();
  const [nacionalidade, setNacionalidade] = useState();

  function irSobre() {
    navigation.navigate('Dados informados', {
      nome: name,
      idade: idade,
      sexos: sexo,
      escola: escolaridade,
      limite: limite,
      brasileiro: nacionalidade,
    });
  }

  return (
    <ScrollView>
      <Image 
        style={styles.image}
        source={{uri:"https://nubank.com.br/images/open-graph-logo-large-br.png?v=3"}}/>
    <View style={styles.container}>
    <View style={styles.box}>
      <Text style={styles.title}>Nome:</Text>
      <TextInput
        placeholder="Digite seu nome?"
        onChangeText={(valor) => setName(valor)}
      />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Idade: </Text>
      <TextInput
        placeholder="Digite sua idade? "
        onChangeText={(valor) => setIdade(valor)}
      />
      </View>
      <View>
      <Text style={styles.title}>Sexo:</Text>
      <Picker
        selectedValue={sexo}
        onValueChange={(itemValor) => setSexo(itemValor)}>
          {sexos.map((sexo, id) => {
            return(
            <Picker.Item key={id} label={sexo.label} value={sexo.value} />
            )
          })}
      </Picker>
      </View>
      <View>
      <Text style={styles.title}> Escolaridade: </Text>
      <Picker
        selectedValue={escolaridade}
        onValueChange={(itemValor) => setEscolaridade(itemValor)}>
          {escolaridades.map((valor, id) => {
                return(
                  <Picker.Item key={id} label={valor.label} value={valor.value}/>
                )
          })}
      </Picker>
      </View>
      <View>
      <Text style={styles.title}>Limite da conta:</Text>
        <Slider
          onValueChange={(valor) => setLimite(valor)}
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#2E1760"
        />
      <Text>{(limite)}</Text>
      </View>
      <View style={styles.box}>
      <Text style={styles.title}>Brasileiro? </Text>
      <Switch
        value={nacionalidade}
        onValueChange={(valor) => setNacionalidade(valor)}
      />
      </View>


      <TouchableOpacity style={styles.btn} onPress={irSobre}>
          <Text style={styles.btnText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
     margin: 45,
  },
  image: {
    height: 300
  },
  btn: {
    backgroundColor: '#530082',
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20
  },
  btnText: {
    color: '#fff',
    textAlign: 'center'
  },
  title: {
    fontSize: 20
  },  
  box: {
    justifyContent: 'space-between',
    width: 200,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
 
