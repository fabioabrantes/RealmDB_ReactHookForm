import React, { useState,useCallback } from 'react';
import { FlatList,Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getRealm } from '../../database/realm';

import { Load } from '../Load';
import { Filters } from '../Filters';
import { Order, OrderProps } from '../Order';

import { Container, Header, Title, Counter } from './styles';

export function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [status, setStatus] = useState('open');

  async function fetchOrders() {
    setIsLoading(true);
    const realm = await getRealm();

    try {
      const response = realm
        .objects<OrderProps[]>("Order")
        .filtered(`status = '${status}'`)
        .sorted("created_at")
        .toJSON();

      setOrders(response);

    } catch (error) {
      console.log(error);
      Alert.alert("Chamados", "Não foi possível carregar os chamados");
    } finally {
      realm.close();
      setIsLoading(false);
    }
  }

  async function OrderUpdate(id: string) {
    const realm = await getRealm();

    try {
      const orderSelected = realm
        .objects<OrderProps>("Order")
        .filtered(`_id = '${id}'`)[0];// para pegar o primeiro elemento que encontrar

      realm.write(() => {
        orderSelected.status = orderSelected.status === "open" ? "closed" : "open";
      });

      Alert.alert("Chamado", "Chamado atualizado!");

      fetchOrders();

    } catch (error) {
      console.log(error);
      Alert.alert("Chamado", "Não foi possível atualizar o chamado!");
    }
  }

  function handleOrderUpdate(id: string,status:string) {
    Alert.alert(
      "Chamado",
      status === "open"? "Encerrar chamado?": "Reabrir chamado",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: () => OrderUpdate(id)
        }
      ]
    );
  }

  async function deleteOrder(id: string){
    const realm = await getRealm();
    try {
      let orderSelected = realm
        .objects<OrderProps>("Order")
        .filtered(`_id = '${id}'`)[0];

        realm.write(() => {
          realm.delete(orderSelected);
          // Discard the reference.
          orderSelected = null;
        });
        
        fetchOrders();
    } catch (error) {
      console.log(error);
      Alert.alert("Delete", "Não foi possível deletar o chamado!");
    }
  }
  
  function handleDeleteOrder(id: string){
    Alert.alert(
      "Delete",
      "Deseja deletar uma order?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: () => deleteOrder(id)
        }
      ]
    );
  }

  useFocusEffect(useCallback(() => {
    fetchOrders();
  }, [status]));

  return (
    <Container>
      <Filters onFilter={setStatus} />

      <Header>
        <Title>Chamados {status === 'open' ? 'aberto' : 'encerrado'}</Title>
        <Counter>{orders.length}</Counter>
      </Header>

      {
        isLoading ?
          <Load />
          : <FlatList
            data={orders}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <Order 
                data={item} 
                onPress={()=>handleOrderUpdate(item._id,item.status)}
                handleDeleteOrder={()=>handleDeleteOrder(item._id)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
      }
    </Container>
  );
}