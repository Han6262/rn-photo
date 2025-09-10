/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import Input, { InputTypes, ReturnKeyTypes } from '../components/Input';
import { useEffect, useRef } from 'react';
import Button from '../components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafeInputView from '../components/SafeInputView';
import HR from '../components/HR';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from '../colors';
import { AuthRoutes } from '../navigations/routes';
import TextButton from '../components/TextButton';
import { authFormReducer, initAuthForm } from '../reducers/authFormReducer';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

  useEffect(() => {
    dispatch({
      type: 'DISABLED',
      value:
        !form.email || !form.password || form.password !== form.passwordConfirm,
    });
  }, [form.email, form.password, form.passwordConfirm]);

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: 'ISLOADING', value: true });
      console.log(form.email, form.password);
      dispatch({ type: 'ISLOADING', value: false });
    }
  };

  return (
    <SafeInputView>
      <StatusBar style="light" />
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={require('../../assets/cover.png')}
            style={{ width: '100%' }}
            resizeMode="cover"
          />
        </View>
        <ScrollView
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
          contentContainerStyle={{ alignItems: 'center' }}
          bounces={false}
          keyboardShouldPersistTaps="always"
        >
          <Input
            value={form.email}
            onChangeText={(text) =>
              dispatch({ type: 'EMAIL', value: text.trim() })
            }
            inputType={InputTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
            onSubmitEditing={() => passwordRef.current.focus()}
            styles={{ container: { marginBottom: 20 } }}
          />
          <Input
            ref={passwordRef}
            value={form.password}
            onChangeText={(text) =>
              dispatch({ type: 'PASSWORD', value: text.trim() })
            }
            inputType={InputTypes.PASSWORD}
            returnKeyType={ReturnKeyTypes.NEXT}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            styles={{ container: { marginBottom: 20 } }}
          />
          <Input
            ref={passwordConfirmRef}
            value={form.passwordConfirm}
            onChangeText={(text) =>
              dispatch({ type: 'PASSWORDCONFIRM', value: text.trim() })
            }
            inputType={InputTypes.PASSWORD_CONFIRM}
            returnKeyType={ReturnKeyTypes.DONE}
            onSubmitEditing={onSubmit}
            styles={{ container: { marginBottom: 20 } }}
          />
          <Button
            title="회원가입"
            onPress={onSubmit}
            disabled={form.disabled}
            isLoading={form.isLoading}
            styles={{
              container: {
                marginTop: 20,
              },
            }}
          />
          <HR text={'OR'} styles={{ container: { marginVertical: 30 } }} />
          <TextButton
            title={'로그인'}
            onPress={() => navigation.navigate(AuthRoutes.SIGN_IN)}
          />
        </ScrollView>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    flexGrow: 0,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SignUpScreen;
