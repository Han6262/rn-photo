/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GRAY, WHITE } from '../colors';
import { signOut } from 'firebase/auth';
import { useUserState } from '../contexts/UserContext';
import { useEffect } from 'react';
const ProfileScreen = () => {
  const [user, setUser] = useUserState();
  const { top } = useSafeAreaInsets();
  console.log(user.uid, user.email, user.displayName, user.photoURL);

  useEffect(() => {
    return setUser({
      ...user,
      displayName: user.email.split('@')[0].slice(0, 10),
      photoURL: require('../../assets/profile.png'),
    });
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.settingButton}>
        <Pressable
          onPress={async () => {
            await signOut();
            setUser({});
          }}
          hitSlop={10}
        >
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color={GRAY.DARK}
          />
        </Pressable>
      </View>
      <View style={styles.profile}>
        <View
          style={[
            styles.photo,
            user.photoURL || { backgroundColor: GRAY.DEFAULT },
          ]}
        >
          <Image source={user.photoURL} style={styles.photo} />
          <Pressable
            style={styles.editButton}
            onPress={() => console.log('UPDATE')}
          >
            <MaterialCommunityIcons name="pencil" size={20} color={WHITE} />
          </Pressable>
        </View>
        <Text style={styles.nickname}>{user.displayName || 'nickname'}</Text>
      </View>
      <View style={styles.listContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  settingButton: {
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.DEFAULT,
    paddingBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.DARK,
  },
  nickname: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
  },
});

export default ProfileScreen;
