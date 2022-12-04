import * as React from 'react'
import { View, Text } from 'react-native';
import api from '../../../service/api'

export default function Formacao() {
    const [ bio, setbio] = React.useState('');

    async function obterUser(){
      const {data} = await api.get('huser0')

      setbio(data.bio)
  }
    obterUser()

  return (
    <View style={{ flex: 1,  alignItems: 'center' }}>
      <Text style ={{ fontSize: 20, margin: 1}}>
            {bio}
      </Text>
    </View>
  );
}
