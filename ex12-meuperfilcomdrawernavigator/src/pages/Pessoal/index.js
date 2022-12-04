import * as React from 'react'
import { View, Text } from 'react-native';
import api from '../../../service/api'

export default function Pessoal() {
    const [ bio, setbio] = React.useState('');
    const [ name, setName] = React.useState('');


    async function obterUser(){
      const {data} = await api.get('huser0')

      setbio(data.bio)
      setName(data.name)
  }
    obterUser()

  return (
    <View style={{ flex: 1 }}>
      <Text style ={{ fontSize: 20, margin: 1}}>
           Nome: {name}
      </Text>

      <Text style ={{ fontSize: 20, margin: 1}}>
           Descricao: {bio}
      </Text>

    </View>
  );
}
