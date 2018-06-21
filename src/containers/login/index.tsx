import * as React from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableHighlight,
} from 'react-native';
import { ReactNavigationProps } from '../../typings';
import { Login } from 'src/services';
import cls from './styles';
import storage from 'src/storage';

export default class LoginPage extends React.Component<ReactNavigationProps, any> {
  static navigationOptions = {
    title: '登录',
  };

  state = {
    userName: '',
    password: '',
  };

  doLogin = () => {
    const { userName, password } = this.state;
    if (!userName && !password) {
      Alert.alert('校验失败', '用户名和密码不能为空！');
      return;
    }
    const { navigation } = this.props;
    Login.login(this.state.userName, this.state.password).then(token => {
      if (token) {
        storage.setItem('token', token);
        navigation.navigate('list');
      } else {
        Alert.alert('登录失败', '用户名或密码错误，请重试！');
      }
    });
  }

  onNameChange = (text: string) => {
    this.setState({
      ...this.state,
      userName: text,
    });
  }

  onPasswordChange = (text: string) => {
    this.setState({
      ...this.state,
      password: text,
    });
  }

  render() {
    return (
      <View style={cls.container}>
        <TextInput autoCapitalize="none" underlineColorAndroid="transparent" value={this.state.userName} style={cls.textInput} onChangeText={this.onNameChange} placeholder="用户名" />
        <TextInput autoCapitalize="none" underlineColorAndroid="transparent" value={this.state.password} style={cls.textInput} onChangeText={this.onPasswordChange} secureTextEntry={true} placeholder="密码" />
        <TouchableHighlight onPress={this.doLogin}>
          <Text style={cls.loginBtn}>登录</Text>
        </TouchableHighlight>
      </View>
    );
  }
}