import * as React from 'react';
import { connect } from 'react-redux'; 
import { Dispatch } from 'redux';
import Markdown from 'react-native-markdown-renderer';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { State, Gist, Action, ActionType, ReactNavigationProps } from 'src/typings';
import { Loading } from 'src/components';
import detailSelector from 'src/selectors/detail';
import cls from './styles';

interface GistDetailProps {
}

interface StateProps {
  detail: Gist;
  fileData: State['files'],
  ui: State['ui'],
}

interface DispatchProps {
  getGistDetail: (id: string) => void;
  getGistFile: (id: string, fileName: string, fileUrl: string) => void;
}

class GistDetail extends React.Component<GistDetailProps & StateProps & DispatchProps & ReactNavigationProps, any> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? '笔记详情': navigation.state.params.title,
    }
  };

  componentDidMount() {
    const { detail, getGistFile, fileData } = this.props;
    detail.files.map(file => ({
      name: file,
      ...fileData[file],
    })).forEach(file => {
      getGistFile(detail.id, file.name, file.raw_url);
    });
  }

  componentDidUpdate() {
    const { detail, navigation } = this.props;
    if (!navigation.getParam('title', '') && detail.files.length === 1) {
      const fileName = detail.files[0];
      let title = '';
      if (/\.md$/.test(fileName)) {
        title = fileName.split('.md')[0];
      } else {
        title = fileName.split('.markdown')[0];
      }
      navigation.setParams({
        title: title,
      });
    }
  }

  render() {
    const { detail, fileData, ui } = this.props;
    const { files } = detail;
    return (
      <View style={cls.container}>
        <ScrollView>
        {
          files.map(fileName => {
            return fileData[fileName].content ?
            <View style={cls.article} key={fileName}>
              {
                files.length > 1 ? <Text style={cls.articleTitle}>{fileName.split('.')[0]}</Text> : null
              }
              <Markdown>{fileData[fileName].content}</Markdown>
            </View>
            : null;
          })
        }
        </ScrollView>
        <Loading loading={ui.loading} />
      </View>
    );
  }
}

function mapStateToPorps(state: State, props: ReactNavigationProps): StateProps {
  const { navigation } = props;
  return {
    detail: detailSelector(state, navigation.getParam('id')),
    fileData: state.files,
    ui: state.ui,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    getGistFile: (id: string, fileName: string, fileUrl: string) => dispatch({
      type: ActionType.API_GET_GIST_FILE,
      payload: {
        url: fileUrl,
        id,
        fileName,
      },
    }),
    getGistDetail(gistId: string) {
      dispatch({
        type: ActionType.STATE_GIST_DETAIL,
        payload: {
          gistId,
        },
      });
    }
  };
}

export default connect(mapStateToPorps, mapDispatchToProps)(GistDetail);

