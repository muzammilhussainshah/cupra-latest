import { useRoute, useNavigation } from '@react-navigation/native';

// import { useNavigation } from '@react-navigation/native';

import React from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { ScrollView, Text, ActivityIndicator } from 'react-native';

import FastImage from 'react-native-fast-image';

import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonsContainer, ButtonText } from '../../../components/Button';

import { _resetNewPassword } from '../../../store/action/authAction';

import FormTextField from '../../../components/FormTextField';

import { BackGroundContinerImage, Container, LoginTitle } from './styled';

interface IPasswordProp {
  new_password: string;
  confirm_password: string;
}
export const AddNewPassword: React.FC = ({navigation}:any) => {
  const dispatch = useDispatch();
  const route: any = useRoute();
  // const navigation = useNavigation();
  const passwordModel = useForm<IPasswordProp>({
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
  });
  const isLoader = useSelector(({ reducer }: any) => reducer.isLoader);
  const isError = useSelector(({ reducer }: any) => reducer.isError);
  const getPhonneNumber = route?.params?.emailOrPhone;
  const getpassToken = route?.params?.passToken;
  function onSubmit(model: IPasswordProp) {
    console.warn('form submitted', model);
    dispatch(_resetNewPassword(model, getPhonneNumber, getpassToken,navigation)) 
  }

  return (
    <Container
      resizeMode={FastImage.resizeMode.cover}
      source={require('../../../assets/BG.png')}>
      <BackGroundContinerImage
        resizeMode={FastImage.resizeMode.contain}
        source={require('../../../assets/logo.png')}
      />
      <ScrollView
        contentContainerStyle={{ paddingTop: 100, paddingHorizontal: 15 }}>
        <LoginTitle>Reset Password</LoginTitle>
        <FormProvider {...passwordModel}>
          <FormTextField
            name="new_password"
            label="Password"
            style={{ marginBottom: 20 }}
            secureTextEntry={true}
            rules={{
              required: 'Password is required.',
            }}
          />
          <FormTextField
            name="confirm_password"
            label="Confirm Password"
            style={{ marginBottom: 90 }}
            secureTextEntry={true}
            rules={{
              required: 'Confirm Password is required.',
            }}
          />
          {isLoader ?
            <ActivityIndicator
              style={{ marginTop: "10%" }}
              size="small" color={'#ffffff'}
            /> :

            <ButtonsContainer>
              <Button onPress={passwordModel.handleSubmit(onSubmit)}>
                <ButtonText color={'#000'}>Save New Password</ButtonText>
              </Button>
            </ButtonsContainer>
          }
          {isError !== "" &&
            <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
            </Text>}
        </FormProvider>
      </ScrollView>
    </Container>
  );
};
