import { GistList, Login, Detail } from 'src/containers';
import { createStackNavigator } from 'react-navigation';

export default createStackNavigator({
  list: {
    screen: GistList,
  },
  login: {
    screen: Login,
  },
  detail: {
    screen: Detail,
  },
}, {
  initialRouteName: 'list',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#ffffff',
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 22,
    },
  },
});