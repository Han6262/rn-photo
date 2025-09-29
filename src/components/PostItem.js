/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import ImageSwiper from '../components/ImageSwiper';
import PropTypes from 'prop-types';
import { PRIMARY, WHITE } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PostItem = ({post}) => {
  const width = useWindowDimensions().width;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ExpoImage
          style={styles.profilePhoto}
          source={{ uri: post.user.photoURL }}
        />
        <Text style={styles.nickname}>{post.user.displayName}</Text>
      </View>
      <View style={{width, height: width}}>
        <ImageSwiper photos={post.photos} />
      </View>
      <View style={styles.location}>
        <MaterialCommunityIcons
            name='map-marker'
            size={24}
            color={PRIMARY.DEFAULT}
        />
        <Text>{post.location}</Text>
      </View>
      <Text style={styles.text}>{post.text}</Text>
    </View>
  );
};

PostItem.display = 'PostItem';

PostItem.propTypes = {
    post: PropTypes.object
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  nickname: {
    paddingHorizontal: 10,
    fontWeight: '600'
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  text: {
    paddingHorizontal: 10
  }
});

export default PostItem;
