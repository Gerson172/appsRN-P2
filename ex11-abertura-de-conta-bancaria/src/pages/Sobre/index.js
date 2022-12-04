import React from 'react';
import { View, Text } from 'react-native';
 
export default function Sobre( {route} ){ 
  return(
    <View>
      <Text> Nome: {route.params?.nome}</Text>
      <Text> Idade: {route.params?.idade}</Text>
      <Text> Sexualidade: {route.params?.sexos}</Text>
      <Text> Escolaridade: {route.params?.escola}</Text>
      <Text> Limite:  {route.params?.limite}</Text>
      <Text> Brasileiro:  {route.params?.brasileiro ? 'sim' : 'Não'}</Text>
    </View>
  )
}