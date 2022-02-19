import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity,StyleSheet} from 'react-native';
import man from '../Images/man.png';
import SignUpForm from './components/SignUpForm';
import plus from '../Images/plus.png';
import {launchImageLibrary} from 'react-native-image-picker';


const SignUp = () => {
  const [userImage, setUserImage] = useState();

  

  const pickImage = () => {
    launchImageLibrary({quality: 1}, image => {

      if(image.assets != null) {
          setUserImage(image.assets[0].uri.toString());
      }
      


    
    });
  };

  return (
    <View>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Image
          source={userImage ? {uri: userImage} : man}
          style={userImage ? [styles.manImage,{borderWidth:1,borderColor:'red'}] : styles.manImage}
        />
        <View>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={plus}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                marginTop: -35,
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <SignUpForm imageURI={userImage}/>
    </View>
  );
};

const styles = StyleSheet.create({
    manImage:{
      width: 100, height: 100, borderRadius: 50
    }
})

export default SignUp;
