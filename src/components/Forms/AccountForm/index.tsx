import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Button } from '@components/Controllers/Button';
import { Input } from '@components/Controllers/Input';
import { Form, Title } from './styles';
import { useNavigation } from '@react-navigation/native';

export function AccountForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation()

  function handleNewAccount() {
    setIsLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then( () => Alert.alert('Conta', 'Conta Criada com Successo'))
      .catch( (e) => Alert.alert("Erro", e))
      .finally( () => setIsLoading(false))

    navigation.navigate('signIn')
  }

  return (
    <Form>
      <Title>Cadastrar</Title>
      <Input placeholder="E-mail" onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Button title="Cadastrar" isLoading={isLoading} onPress={handleNewAccount} />
    </Form>
  );
}