import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonŦext,
} from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  handleAddUser = async () => {
    // Listando o usuário do github
    // console.tron.log(this.state.newUser);

    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);
    /**
     * Listagem da informações que irei buscar no github:
     * Exemplo:

     * name
     * login
     * bio
     * avatar
     *
     * Depois do listar outros valores dentro da api.
    */
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  render() {
    /**
     * Para mostrar em tela os dados da listagem acima,
     * é necessário buscar os valores de dentro do users.
     *
     * No caso, será a listagem do usuários. <List />
     *
     * destruturação para o ({ item }) é o caminho para
     * conseguir buscar os valores dentro de data.
     */

    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => {}}>
                <ProfileButtonŦext>Ver Perfil</ProfileButtonŦext>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};
