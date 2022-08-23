import React, { useState } from 'react';
import { Alert,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import {useForm} from'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schemaValidation} from '../../utils/validationFormYup';

import {getRealm} from '../../database/realm';

import { InputForm } from '../../components/InputForm';
import { Button } from '../../components/Button';
import { TextAreaForm } from '../../components/TextAreaForm';
import { IconButton } from '../../components/IconButton';

import { 
  Container, 
  Header, 
  Title, 
  Form,
  Footer 
} from './styles';

type FormData = {
  patrimony: string;
  equipment: string;
  description: string;
};

export function NewOrder() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    control, 
    handleSubmit,
    formState: { errors } 
  } = useForm<FormData>({
    resolver:yupResolver(schemaValidation)
  });

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNewOrderRegister({patrimony,equipment,description}:FormData){
    const realm = await getRealm();
    try {
      setIsLoading(true);
      realm.write(() => {
        const created = realm.create("Order", {
          _id: uuid.v4(),
          patrimony,
          equipment,
          description,
          status: 'open',
          created_at: new Date(),
        });

        console.log("CADASTRADO ==>", created);
      });

      Alert.alert("Chamado", "Chamado cadastro com sucesso!");
      handleBack()
    } catch (error) {
      Alert.alert("Chamado", "Não foi possível abrir o chamado!");
    }finally{
      realm.close();
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <Header>
            <Title>Novo chamado</Title>
            <IconButton icon="chevron-left" onPress={handleBack} />
          </Header>

          <Form>
            <InputForm
              name='patrimony'
              control={control}
              placeholder="Número do Patrimônio"
              autoCorrect={false}
              autoCapitalize="none"
              error={errors.patrimony}
            />

            <InputForm
              name='equipment'
              control={control}
              placeholder="Equipamento"
              autoCorrect={false}
              autoCapitalize="none"
              error={errors.equipment}
            />

            <TextAreaForm
              name='description'
              control={control}
              placeholder="Descrição"
              autoCorrect={false}
              autoCapitalize="none"
              error={errors.description}
            />
          </Form>

          <Footer>
            <Button
              title="Enviar chamado"
              isLoading={isLoading}
              onPress ={handleSubmit(handleNewOrderRegister)}
            />
          </Footer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}