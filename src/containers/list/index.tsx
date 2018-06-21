import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action, ActionType, State, ReactNavigationProps } from 'src/typings';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import storage from 'src/storage';
import GistItem from './gist-item';
import cls from './styles';

interface StateProps {
  list: string[];
  gistData: State['gists'];
  userData: State['users'];
  fileData: State['files'];
  ui: State['ui'],
}

interface ListProps {

}

class GistList extends React.Component<StateProps & DispatchProps & ListProps & ReactNavigationProps, any> {
  static navigationOptions = {
    title: '笔记列表',
  };

  async componentDidMount() {
    const { navigation } = this.props;
    if (await storage.getItem('token')) {
      this.props.actions.getGistList();
    } else {
      navigation.navigate('login');
    }
  }

  onItemPress = (gistId: string) => {
    const { navigation } = this.props;
    navigation.push('detail', {
      id: gistId,
    });
  }

  renderItem = ({ item }: any) => {
    const { userData, gistData } = this.props;
    return (
      <GistItem onPress={this.onItemPress} gist={gistData[item.id]} userData={userData} />
    );
  }

  onRefresh = () => {
    this.props.actions.getGistList();
  }

  render() {
    const { list, gistData, ui } = this.props;
    const listData = list.filter(id => {
      const gist = gistData[id];
      return gist.files.filter(filename => /\.(markdown|md)$/.test(filename)).length !== 0;
    }).map(id => ({
      id,
      key: id,
    }));
    return (
      <View style={cls.container}>
        <FlatList
          renderItem={this.renderItem}
          data={listData}
          style={cls.gistList}
          onRefresh={this.onRefresh}
          refreshing={!!ui.loading}
          ListEmptyComponent={<Text style={cls.nodata}>未获取到任何文章</Text>}
        />
      </View>
    );
  }
}

interface DispatchProps {
  actions: {
    getGistList: {
      (): Action;
    };
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    actions: {
      getGistList: () => dispatch({
        type: ActionType.API_GET_GIST_LIST,
        payload: {},
      }),
    },
  };
}

function mapStateToPorps(state: State): StateProps {
  return {
    list: state.list,
    gistData: state.gists,
    userData: state.users,
    fileData: state.files,
    ui: state.ui,
  }
}

export default connect<StateProps, DispatchProps>(mapStateToPorps, mapDispatchToProps)(GistList);