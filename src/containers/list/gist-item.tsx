import * as React from 'react';
import { Gist, State } from 'src/typings';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { getTimeString } from 'src/utils';
import cls from './styles';

interface GistItemPorps {
  gist: Gist;
  userData: State['users'];
  onPress: (id: string) => void;
}

export default class GistItem extends React.Component<GistItemPorps, any> {
  onPress = () => {
    const { gist, onPress } = this.props;
    onPress(gist.id);
  }
  render() {
    const { gist, userData } = this.props;
    const { files } = gist;
    const description = files.map(name => {
      if (/\.md$/.test(name)) {
        return name.split('.md')[0];
      } else {
        return name.split('.markdown')[0];
      }
    }).join('，');
    const owner = userData[gist.owner as number];
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={cls.gistItem}>
          <View style={cls.gistHeader}>
            <Image style={cls.gistAvatar} source={{ uri: owner.avatar_url }} />
            <View style={cls.gistSummary}>
              <Text style={cls.gistTitle} numberOfLines={1} ellipsizeMode="tail">{gist.description}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginRight: 5, fontSize: 12, lineHeight: 12 }}>创建于{getTimeString(gist.created_at, 'YYYY-MM-DD')}</Text>
                {
                  gist.updated_at && gist.updated_at !== gist.created_at ? <Text style={{ fontSize: 12, lineHeight: 14 }}>修改于{getTimeString(gist.updated_at, 'YYYY-MM-DD')}</Text> : null
                }
              </View>
            </View>
          </View>
          <Text style={cls.gistContent} numberOfLines={4} ellipsizeMode="tail">
            { `共 ${files.length} 篇：${description}` }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}