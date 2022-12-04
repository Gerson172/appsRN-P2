import * as React from 'react';
import { View, Text, Button,Image } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  
} from '@react-navigation/drawer';


import Pessoal from './src/pages/Pessoal'
import Formacao from './src/pages/Formacao'
import Experiencia from './src/pages/Experiencia'

import api from './service/api'

function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem vindo </Text>
      <Button
        title="Abrir Menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
 
    </View>
  );
}


function CustomDrawerContent(props) {
    const [ avatar_url, setAvatarUrl] = React.useState('');
    const [ name, setName] = React.useState('');

    async function obterUser(){
      const {data} = await api.get('huser0')

      setAvatarUrl(data.avatar_url)
      setName(data.name)
  }
    obterUser()
  return (
    <DrawerContentScrollView {...props}>
     <Image
          source={{ uri: avatar_url }}
          style={{  width: 200, height: 200, borderRadius: 200 / 2}}
        />
      <Text>{name}</Text>
      <DrawerItemList {...props} />      
     
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    

    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Bem vindo" component={Feed} />
      <Drawer.Screen name="Pessoal" component={Pessoal} />
      <Drawer.Screen name="Formação" component={Formacao} />
      <Drawer.Screen name="Experiência" component={Experiencia} />
    </Drawer.Navigator>
    
  );
}

export default function App() {
  return (
    <NavigationContainer>
    
      <MyDrawer />
    </NavigationContainer>
  );
}