import * as React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
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
});

export default class Loading extends React.Component<Props, any> {
  render() {
    const { loading } = this.props;
    return loading ? <ActivityIndicator style={cls.loading} animating={loading} size="large" color="#999999" hidesWhenStopped={false} /> : null;
  }
}