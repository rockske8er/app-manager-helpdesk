import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { FooterButton } from '@components/Controllers/FooterButton';
import { Button } from '@components/Controllers/Button';
import { Input } from '@components/Controllers/Input';
import { Form, Title, Footer } from './styles';
import { Alert } from 'react-native';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  function handleSignIn() {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch(e =>{
        setIsLoading(false)
        Alert.alert('E', e)
      })
      .finally(() => setIsLoading(false))
  }

  function handleForgotPassword() {
    auth().sendPasswordResetEmail(email)
      .then(() => Alert.alert("Redefinir senha", 'Email enviando'))
      .catch(e => Alert.alert("Error" , e))
  }

  return (
    <Form>
      <Title>Entrar</Title>
      <Input placeholder="E-mail" onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleSignIn} isLoading={isLoading} />

      <Footer>
        <FooterButton title="Criar conta" icon="person-add" onPress={() => navigation.navigate('register')} />
        <FooterButton 
          title="Esqueci senha"
          icon="email" 
          onPress={handleForgotPassword} 
        />
      </Footer>
    </Form>
  );
}