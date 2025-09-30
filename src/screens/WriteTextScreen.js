import { useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import { GRAY, WHITE } from '../colors';
import { Image as ExpoImage } from 'expo-image';
import HeaderRight from '../components/HeaderRight';
import LocationSearch from '../components/LocationSearch';
import { uploadPhoto } from '../api/storage';
import { useUserState } from '../contexts/UserContext';
import { createPost, updatePost } from '../api/post';
import event, {EventTypes} from '../evet';

const MAX_TEXT_LENGTH = 50;

const WriteTextScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const width = useWindowDimensions().width / 4;

  const [photoUris, setPhotoUris] = useState([]);
  const [text, setText] = useState('');

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [user] = useUserState();


  const [location, setLocation] = useState('');
  const locationRef = useRef(null);

  useEffect(() => {
    if (params) {
      const { photoUris, post } = params;
      if (photoUris) {
        setPhotoUris(params.photoUris)
      } else if (post) {
        setPhotoUris(post.photos);
        setText(post.text);
        setLocation(post.location);
        locationRef.current?.setAddressText(post.location);
      }
    }
  }, [params]);

  useEffect(() => {
    setDisabled(isLoading || !text || !location);
  }, [isLoading, text, location]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      if (params?.photoUris) {
        const photos = await Promise.all(
          photoUris.map((uri) => uploadPhoto({uri, uid: user.uid}))
        );
        await createPost({photos, location, text, user});
        event.emit(EventTypes.REFRESH)
      } else if (params?.post) {
        const {post} = params;
        const updatedPost = {...post, location, text};
        await updatePost(updatedPost);
        event.emit(EventTypes.UPDATE, updatedPost);
      }
      navigation.goBack();
    } catch (e) {
       Alert.alert('글 수정 실패', e.message);
      setIsLoading(false)
    }
    
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [photoUris, user.uid, location, text, user, navigation, params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight disabled={disabled} onPress={onSubmit} />,
    });
  }, [navigation, disabled, onSubmit]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        {photoUris.map((uri, idx) => (
          <ExpoImage
            key={idx}
            source={{ uri }}
            style={{ width, height: width }}
          />
        ))}
      </View>
      <LocationSearch
        ref={locationRef}
        onPress={({description}) => setLocation(description)}
        isLoading={isLoading}
        isSelected={!!location}
      />
      <View>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          maxLength={MAX_TEXT_LENGTH}
          placeholder="사진의 설명을 적어주세요."
          style={styles.input}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          multiline={true}
          blurOnSubmit={true}
          editable={!isLoading}
        />
        <Text style={styles.inputLength}>
          {text.length} / {MAX_TEXT_LENGTH}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  input: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputLength: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    color: GRAY.DARK,
    fontSize: 12,
  },
});

export default WriteTextScreen;
