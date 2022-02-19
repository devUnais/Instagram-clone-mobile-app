import React,{useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import SignInForm from './components/SignInForm';
import man from '../Images/man.png';
import plus from '../Images/plus.png';
import instagram from '../Images/instagram.png';
import {firebase,db} from '../firebase'
import auth from '@react-native-firebase/auth'

const SignIn = ({navigation}) => {
  useEffect(() => {
    if (firebase.auth().currentUser != null) {
         navigation.navigate('HomeScreen');
    }
  }, []);

  return (
    <View>
      
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Image source={instagram} style={{width: 100, height: 100}} />
      </View>

      <SignInForm />
    </View>
  );
};

export default SignIn;
