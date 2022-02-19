import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import userData from '../data/userData';
import {firebase, db} from '../../firebase';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserStatus = () => {
  const [profile_picture, setProfile_picture] = useState();

  const navigation = useNavigation();

  useEffect(() => {

    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(res => {
        setProfile_picture(res.get('profile_picture'));
      });
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      <FlatList
        data={userData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{margin: 6, alignItems: 'center'}}>
            <Image
              source={{uri: item.image}}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                borderColor: 'red',
                borderWidth: 1,
              }}
            />
            <Text style={{color: 'black'}}>
              {item.name.length > 10
                ? item.name.slice(0, 8) + '...'
                : item.name.toLowerCase()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default UserStatus;
