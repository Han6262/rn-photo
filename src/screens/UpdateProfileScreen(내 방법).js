import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Alert,
  Keyboard,
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { GRAY, WHITE } from '../colors';
import FastImage from '../components/FastImage';
import { useUserState } from '../contexts/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SafeInputView from '../components/SafeInputView';
import HeaderRight from '../components/HeaderRight';
import { updateUserInfo } from '../api/auth';
import { MainRoutes } from '../navigations/routes';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useUserState();
  const [userPhoto, setUserPhoto] = useState({ uri: user.photoURL });
  const [displayName, setDisplayName] = useState(user.displayName);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      setUserPhoto(route.params);
    }
  }, []);

  useEffect(() => {
    setDisabled(!displayName || isLoading);
  }, [displayName, isLoading]);

  const onSubmit = useCallback(async () => {
    Keyboard.dismiss();
    if (!disabled) {
      setIsLoading(true);
      try {
        const userInfo = { displayName };

        await updateUserInfo(userInfo);
        setUser((prev) => ({ ...prev, ...userInfo }));

        navigation.goBack();
      } catch (e) {
        Alert.alert('사용자 수정 실패', e.message);
        setIsLoading(false);
      }
    }
  }, [disabled, displayName, navigation, setUser]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight disabled={disabled} onPress={onSubmit} />,
    });
  }, [navigation, disabled, onSubmit]);

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Button title="back" onPress={() => navigation.goBack()} />
        <View
          style={[
            styles.photo,
            user.photoURL || { backgroundColor: GRAY.DEFAULT },
          ]}
        >
          {/* <FastImage source={{ uri: userPhoto }} style={styles.photo} /> */}
          <FastImage source={userPhoto} style={styles.photo} />
          <Pressable
            style={styles.imageButton}
            onPress={() => navigation.navigate(MainRoutes.IMAGE_PICKER)}
          >
            <MaterialCommunityIcons name="image" size={20} color={WHITE} />
          </Pressable>
        </View>
        <View>
          <TextInput
            value={displayName}
            onChangeText={(text) => setDisplayName(text.trim())}
            style={styles.input}
            placeholder="nickName"
            textAlign="center"
            maxLength={10}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="none"
          />
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  settingButton: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imageButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.DARK,
  },
  input: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 200,
    fontSize: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.DEFAULT,
  },
});

export default UpdateProfileScreen;
