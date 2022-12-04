import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default function Item({item, deleteItem}) {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text>{item.nameProduct}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={deleteItem}>
                <Text  style={styles.textBtn}>Excluir</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      margin: 10
    },
    btn: {
        backgroundColor: '#158',
        padding: 10,
        borderRadius: 10
    },
    textBtn: {
        color: '#fff'
    }
  });
    