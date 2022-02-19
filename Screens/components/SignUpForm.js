import React,{useState} from 'react';
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
import {firebase, db} from '../../firebase';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import ProgressDialog from 'react-native-progress-dialog'


const SignUpForm = ({imageURI}) => {
  const navigation = useNavigation();

  const [progressVisible,setProgressVisible] = useState(false);


  const storage = firebase.storage();

  const signInValidationSchema = yup.object({
    username: yup.string().min(2).required(),
    email: yup.string().email().required('email is required'),
    password: yup.string().min(8).required('password is required'),
  });

  

  const onSignUp = async (username, email, password) => {
    try {
      setProgressVisible(true)
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await storage
        .ref(`/images/${firebase.auth().currentUser.uid}`)
        .putFile(imageURI);

      const downloadUrl = await storage
        .ref(`/images/${firebase.auth().currentUser.uid}`)
        .getDownloadURL();

      await db
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          username: username,
          email: email,
          password: password,
          profile_picture: downloadUrl,
        });

      setProgressVisible(false)
      navigation.navigate('HomeScreen')
    } catch (error) {
      setProgressVisible(false)
      alert(error.message);
    }
  };

  return (
    <Formik
      initialValues={{username: '', email: '', password: ''}}
      validationSchema={signInValidationSchema}
      validateOnMount={true}
      onSubmit={value => onSignUp(value.username, value.email, value.password)}>
      {({handleChange, handleBlur, handleSubmit, errors, values, isValid}) => (
        <View>
          <ProgressDialog visible={progressVisible} label="Creating your acccount" loaderColor="red"/>
          <View style={{marginLeft: 10, marginRight: 10, marginTop: 80}}>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor:
                    values.username.length > 0 && errors.username
                      ? 'red'
                      : 'lightgrey',
                },
              ]}
              onChangeText={handleChange('username')}
              value={values.username}
              placeholder="username"
            />

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

            <View style={{marginLeft: 10, marginRight: 10, marginTop: 50}}>
              <Button
                onPress={handleSubmit}
                disabled={!isValid,!imageURI}
                title="Sign Up"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 100,
              }}>
              <Text style={{color: 'black'}}>Already have a account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{marginLeft: 5, color: '#2196F3'}}>Log In</Text>
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

export default SignUpForm;
