import { AsyncStorage } from 'react-native';

class Storage {
  async getItem(key: string) {
    return await AsyncStorage.getItem(key);
  }

  async setItem(key: string, value: string) {
    return await AsyncStorage.setItem(key, value);
  }
}

export default new Storage();