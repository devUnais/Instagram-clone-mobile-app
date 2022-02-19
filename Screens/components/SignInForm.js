import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {firebase, db} from '../../firebase';
import auth from '@react-native-firebase/auth';
import ProgressDialog from 'react-native-progress-dialog';

const SignInForm = () => {
  const navigation = useNavigation();

  const [progressVisible, setProgressVisible] = useState(false);

  const signInValidationSchema = yup.object({
    email: yup.string().email().required('email is required'),
    password: yup.string().min(8).required('password is required'),
  });

  const onSignIn = async (email, password) => {
    try {
      setProgressVisible(true);
      await firebase.auth().signInWithEmailAndPassword(email, password);

      setProgressVisible(false);
      navigation.navigate('HomeScreen')
    } catch (error) {
      setProgressVisible(false);
      alert(error.message);
    }
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={signInValidationSchema}
      onSubmit={value => onSignIn(value.email, value.password)}>
      {({handleChange, handleBlur, handleSubmit, errors, values, isValid}) => (
        <View>
          <ProgressDialog
            visible={progressVisible}
            label="Log In"
            loaderColor="red"
          />
          <View style={{marginLeft: 10, marginRight: 10, marginTop: 80}}>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor:
                    values.email.length > 0 && errors.email
                      ? 'red'
                      : 'lightgrey',
                },
              ]}
              onChangeText={handleChange('email')}
              value={values.email}
              placeholder="email"
            />
            {/* {errors.email && <Text style={{color:'red',marginLeft:12}}>{errors.email}</Text>} */}
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor:
                    values.password.length > 0 && errors.password
                      ? 'red'
                      : 'lightgrey',
                },
              ]}
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder="password"
            />
            <Text
              style={{
                color: '#2196F3',
                textAlign: 'right',
                marginRight: 20,
                marginTop: 5,
              }}>
              Forget Password?
            </Text>
            <View style={{marginLeft: 10, marginRight: 10, marginTop: 50}}>
              <Button
                onPress={handleSubmit}
                disabled={!isValid}
                title="Log In"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 100,
              }}>
              <Text style={{color: 'black'}}>Don't have a account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={{marginLeft: 5, color: '#2196F3'}}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    margin: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
  },
});

export default SignInForm;
