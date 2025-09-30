import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PostItem from '../components/PostItem';
import PropTypes from 'prop-types';
import { GRAY } from '../colors';
import usePosts from '../hooks/usePosts';
import event, { EventTypes } from '../evet';
import { useUserState } from '../contexts/UserContext';
import { updatePost } from '../api/post';
const PostList = ({isMyPost}) => {
  const [user] = useUserState();
  const {data, fetchNextPage, refetching, refetch, deletePost} = usePosts(
    isMyPost && user.uid
  );
  useEffect(() => {
    event.addListener(EventTypes.REFRESH, refetch);
    event.addListener(EventTypes.DELETE, deletePost);
    event.addListener(EventTypes.UPDATE, updatePost);

    return () => event.removeAllListeners();
  }, [refetch, deletePost, updatePost])
  return (
    <FlatList
        data={data}
        renderItem={({item}) => <PostItem post={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        onEndReached={fetchNextPage}
        refreshing={refetching}
        onRefresh={refetch}
    />
  );
};
PostList.propTypes = {
    data: PropTypes.array.isRequired,
    fetchNextPage: PropTypes.func,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
  isMyPost: PropTypes.bool,
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 20,
    borderBottomColor: GRAY.LIGHT,
    borderBottomWidth: 0.5
  }
});

export default PostList;
