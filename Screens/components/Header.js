import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import instagramLogo from '../../Images/instagramLogo.png';
import like from '../../Images/like.png';
import create from '../../Images/create.png';
import messenger from '../../Images/messenger.png';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '../../firebase'
import auth from '@react-native-firebase/auth'

const Header = () => {
  const navigation = useNavigation();

  const onSignOut = ()=>{
    firebase.auth().signOut().then(res=>{
      navigation.navigate('SignInScreen')
   
    })
  }

  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity onPress={onSignOut}>
        <Image
          source={instagramLogo}
          style={{height: 40, width: 120, margin: 15}}
         
        />

        </TouchableOpacity>
       
      </View>

      <View style={{flexDirection: 'row', margin: 20}}>
        <TouchableOpacity onPress={()=>navigation.navigate("AddNewPostScreen")}>
          <Image style={styles.headerLeftTxt} source={create} />
        </TouchableOpacity>
        <Image style={styles.headerLeftTxt} source={like} />
        <View>
          <Text
            style={{
              color: 'white',
              backgroundColor: 'red',
              width: 20,
              height: 20,
              position: 'absolute',
              marginTop: -19,
              marginLeft: 10,
              padding: 2,
              borderRadius: 10,
              fontSize: 10,
              textAlign: 'center',
            }}>
            10
          </Text>
        </View>
        <Image style={styles.headerLeftTxt} source={messenger} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeftTxt: {
    marginLeft: 10,
    width: 25,
    height: 25,
  },
});

export default Header;
