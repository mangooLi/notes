import * as React from 'react';
import {
  StatusBar,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import cls from './styles';

interface Props {
  isMainPage?: boolean;
  title: string;
  histoy?: any,
}

export default class NavigationBar extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.nagvigateBack = this.nagvigateBack.bind(this);
  }
  nagvigateBack() {
    this.props.histoy.goBack();
  }
  render() {
    const { isMainPage, title } = this.props;
    return (
      <View style={cls.navigationBar}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <View style={cls.topBar}>
          {
            !isMainPage && <TouchableWithoutFeedback onPress={this.nagvigateBack}><Image style={cls.backBtn} source={require('src/assets/left-arrow.png')} /></TouchableWithoutFeedback>
          }
          <Text style={cls.pageTitle}>{title}</Text>
        </View>
      </View>
    );
  }
}