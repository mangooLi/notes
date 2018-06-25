import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  article: {
    padding: 10,
  },
  articleTitle: {
    fontSize: 20,
    lineHeight: 22,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});