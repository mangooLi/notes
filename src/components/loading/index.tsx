import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

interface Props {
  loading: boolean;
}

const cls = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default class Loading extends React.Component<Props, any> {
  render() {
    const { loading } = this.props;
    return loading ? (
      <View style={cls.loading}>
        <Image style={cls.image} source={require('src/assets/loading.gif')} />
      </View>
    ) : null;
  }
}