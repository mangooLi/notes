import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const STATUS_BAR_HEIGHT = getStatusBarHeight(true);

export default StyleSheet.create({
  navigationBar: {
    width: '100%',
    paddingTop: STATUS_BAR_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(00, 00, 00, 0.1)',
    borderStyle: 'solid',
  },
  topBar: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 40,
    paddingRight: 40,
  },
  backBtn: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 4,
    left: 5,
  },
  pageTitle: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
  },
});