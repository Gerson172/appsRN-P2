import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Item from './components/Item';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("products.db");


export default function App() {

    const [nameProduct, setNameProduct ] = useState();
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState();

    const createTables = () => {
      db.transaction(txn => {
        txn.executeSql(
          `CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            nameProduct VARCHAR(20));`, [],
          (sqlTxn, res) => {
              console.log("Tabela criada com sucesso")
          }, 
          error => {
              console.log("Erro na criação de tabela " + error.message);
          },
        );
      });
    };

    const insertProduct = () => {
      if(!product){
        alert("Informe um produto");
        return false;
      }

      db.transaction(txn => {
          txn.executeSql(
            `INSERT INTO products (nameProduct) VALUES (?)`,
              [nameProduct],
            (sqlTxn, res) => {
              console.log(`${nameProduct} Produto adicionado com sucesso!`);
              getProducts();
              setProduct(" ");
            },
            error => {
              console.log("Erro ao inserir um Produto " + error.message);
            },
          );
      });
    };

    const getProducts = () => {
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM products ORDER BY id DESC`, 
          [],
          (sqlTxn, res) => {
            console.log("Produtos lidos com sucesso!");
            let len = res.rows.length;
            let results = [];
            for(let i = 0; i < len; i++){
              let item = res.rows.item(i);
              results.push({ id: item.id, nameProduct: item.nameProduct})
            }
            
            setProducts(results)
          },
          error => {
            console.log("Erro ao obter Produtos " + error.message);
          }
        )
      })
    }

    
      
    const deleteProducts = (id) => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM products WHERE id = ?',
            [id],
            (tx, results) => {
              if( results.rowsAffected >0) {
                console.log('Results');
                getProducts();
              }
            },
            error => {
                console.log("Erro ao excluir um Produto " + error.message);
            }
          );
        });
    }


    useEffect(() => {
          createTables();
          getProducts();
    }, []);

  return (
    <View style={styles.container}>
        <Text>Lista de Compras</Text>
        <View style={styles.row}>
          <TextInput 
            placeholder="Informe um produto"
            value={nameProduct}
            style={styles.gap}
            onChangeText={setNameProduct}
            />
          <TouchableOpacity 
                style={styles.btn}
                onPress={insertProduct}>
              <Text style={{color: '#fff'}}>+</Text>
          </TouchableOpacity>
        </View>
    
      <FlatList 
        data={products}
        style={styles.box}
        renderItem={({ item }) => <Item item={item} deleteItem={() => deleteProducts(item.id)} />}
        key={p => p.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200
  },
  btn: {
      paddingHorizontal: 20,
      backgroundColor: '#219',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    margin: 50
  },
  box: {
    borderColor: '#222',
    borderWidth: 2,
    width: 300,
    padding: 20,
    marginTop: 10
  },
  gap: {
    margin: 10,
    borderColor: '#222', 
    borderWidth: 2,
    paddingHorizontal: 40
  }
});
