import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      // Alinhado sempre no centro
      headerLayoutPreset: 'center',
      // cabeçalho
      headerBackTitleVisible: false,
      // Criando uma view e declarando o fundo e cor da letra
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },

        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
