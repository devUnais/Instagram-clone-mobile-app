import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AddNewPostScreen from './Screens/AddNewPostScreen';
import HomeScreen from './Screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import {firebase, db} from './firebase';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const App = () => {
  // const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     setCurrentUser(user);
  //   });
  // }, []);

  return (
    <>
      {/* {currentUser!=null ? <SignedInStack/> : <SignedOutStack/>} */}
      <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignInScreen" component={SignIn} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="AddNewPostScreen"
              component={AddNewPostScreen}
            />
            <Stack.Screen name="SignUpScreen" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const SignedInStack = () => (
  <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddNewPostScreen" component={AddNewPostScreen} />
        <Stack.Screen name="SignInScreen" component={SignIn} />
        <Stack.Screen name="SignUpScreen" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
);

const SignedOutStack = () => (
  <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignInScreen" component={SignIn} />
        <Stack.Screen name="SignUpScreen" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
);

const styles = StyleSheet.create({});

export default App;
