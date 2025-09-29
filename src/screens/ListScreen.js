import React, {StyleSheet, View} from 'react-native';
import PostList from '../components/PostList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WHITE } from '../colors';

const ListScreen = () => {
  const {top}= useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <PostList />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE
  }
});
export default ListScreen;
