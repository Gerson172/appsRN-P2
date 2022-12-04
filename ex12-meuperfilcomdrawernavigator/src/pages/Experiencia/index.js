import * as React from 'react'
import { View, Text } from 'react-native';
import api from '../../../service/api'

export default function Experiencia() {
    const [ company, setCompany] = React.useState('');
    const [ bio, setBio] = React.useState('');

    async function obterUser(){
      const {data} = await api.get('huser0')
      setCompany(data.company)
      setBio(data.bio)
  }
    obterUser()

  return (
    <View style={{ flex: 1 }}>
      <Text style ={{ fontSize: 20, margin: 1}}>
            Empresa Atual: {company}
      </Text>
      <Text style ={{ fontSize: 20, margin: 1}}>
            {bio}
      </Text>
    </View>
  );
}
