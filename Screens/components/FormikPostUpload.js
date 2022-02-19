import {useNavigation} from '@react-navigation/native';
import { Formik } from 'formik';
import React,{useEffect, useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity,Button,Pressable} from 'react-native';
import placeholder from '../../Images/placeholder.png';
import * as yup from 'yup'
import {firebase,db} from '../../firebase'
import auth from '@react-native-firebase/auth'

const FormikPostUpload = () => {
  const navigation = useNavigation();

  const [profile_picture,setProfile_pricture] = useState();


  const postValidationSchema = yup.object({
    imageUrl:yup.string().url().required("ImageUrl is required"),
    caption:yup.string().min(2).required("caption is required")
  })

  useEffect(() => {
    db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get().then((res)=>{
          setProfile_pricture(res.get("profile_picture"))
        })
  }, [])

  const onPostUpload = (imageUrl,caption)=>{

       db.collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection('posts')
            .add({
              postImage:imageUrl,
              caption:caption,
              username:firebase.auth().currentUser.displayName,
              owner_id:firebase.auth().currentUser.uid,
              profile_picture:profile_picture,
              likes_by_users:[],
              comments:[]
            }).then(res=>navigation.goBack())
  }

  return (
    <Formik
    initialValues={{imageUrl:'',caption:''}}
    validationSchema={postValidationSchema}
    onSubmit={(value)=>onPostUpload(value.imageUrl,value.caption)}>

      {({handleChange,handleBlur,handleSubmit,errors,values,isValid})=>(
          <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          
              <Image
                source={!errors.imageUrl && values.imageUrl.length > 0 ? {uri:values.imageUrl} : placeholder }
                style={{width: 120, height: 80,margin:20}}
              />
        
            <TextInput
              style={{
                width: '50%',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                height: 50,
              }}
              onChangeText={handleChange('imageUrl')}
              value={values.imageUrl}
              onBlur={handleBlur('imageUrl')}
              placeholder="Enter Image Url"
            />
          </View>
          <View style={{}}>
          {errors.imageUrl &&
            <Text style={{color:'red',marginLeft:158,marginTop:-20}}>{errors.imageUrl}</Text>}
          </View>
          <TextInput
            style={{
              width: '80%',
              margin: 20,
              borderBottomWidth: 1,
              borderBottomColor: 'black',
            }}
            onChangeText={handleChange('caption')}
            value={values.caption}
            onBlur={handleBlur('caption')}
            placeholder="Enter Caption"
          />

          {errors.caption && 
          <Text style={{color:'red',marginLeft:20}}>{errors.caption}</Text>}

    
          <Pressable style={{marginLeft:20,marginRight:20,marginTop:50}}>
              
           <Button onPress={handleSubmit} disabled={!isValid} title='Send Post'/>
          </Pressable>
    
    
        </View>
      )}

    </Formik>
  
  );
};

export default FormikPostUpload;
