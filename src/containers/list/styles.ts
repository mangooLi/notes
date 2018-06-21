import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  gistList: {
    flex: 1,
    // padding: 10,
  },
  gistItem: {
    overflow: 'hidden',
    marginBottom: 10,
  },
  gistHeader: {
    height: 32,
    flexDirection: 'row',
  },
  gistAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  gistSummary: {
    flex: 1,
  },
  gistTitle: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  gistContent: {
    marginTop: 4,
    height: 64,
    fontSize: 14,
    color: '#666666',
  },
  nodata: {
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 20,
    color: '#666666',
  },
});
