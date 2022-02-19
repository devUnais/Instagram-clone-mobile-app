import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import like from '../../Images/like.png';
import heartBlack from '../../Images/heartBlack.png';
import comment from '../../Images/comment.png';
import share from '../../Images/share.png';
import {firebase, db} from '../../firebase';
import auth from '@react-native-firebase/auth';



const Post = ({post}) => {
  
 
  return (
    <View>
      <Divider style={{marginTop: 10}} width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} />
    </View>
  );
};

const PostFooter = ({post}) => {

 

  const handleLike = () => {


    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email,
    );


    db.collection('users')
      .doc(post.owner_id)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email,
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email,
            ),
      }).then(()=>{
        console.log('like success')
      }).catch(err=>console.log(err))
  };


  return (
    <View style={{}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <TouchableOpacity onPress={()=>handleLike()}>
          <Image
            source={post.likes_by_users.includes(firebase.auth().currentUser.email) ? heartBlack : like}
            style={{height: 25, width: 25, marginLeft: 10}}
          />

          </TouchableOpacity>
     
          <Image
            source={comment}
            style={{height: 25, width: 25, marginLeft: 10}}
          />
          <Image
            source={share}
            style={{height: 25, width: 25, marginLeft: 10}}
          />
        </View>

        <View style={{margin: 10, width: 45}}>
          <Image
            source={share}
            style={{height: 25, width: 25, marginLeft: 10}}
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            color: 'black',
            marginLeft: 20,
            fontSize: 12,
            marginTop: -5,
          }}>
          {post.likes_by_users?.length + ' likes'}
        </Text>

        <Text
          style={{
            color: 'black',
            marginLeft: 20,
            marginTop: 2,
          }}>
          <Text style={{fontWeight: '700'}}>{post.user}</Text>
          <Text style={{}}> {post.caption}</Text>
        </Text>

        <CommentSection post={post} />
      </View>
    </View>
  );
};

const CommentSection = ({post}) => (
  <View style={{marginLeft: 20, marginTop: 5}}>
    <Text style={{color: 'grey'}}>
      view
      {post.comments.length > 1 ? ' all' : ' '} {post.comments.length}
      {post.comments.length > 1 ? ' comments' : ' comment'}
    </Text>

    {post.comments.map((item, index) => (
      <View key={index} style={{marginTop: 5}}>
        <Text style={{color: 'black'}}>
          <Text style={{fontWeight: '700'}}>{item.user}</Text> {item.comment}
        </Text>
      </View>
    ))}
  </View>
);
const PostImage = ({post}) => (
  <View style={{height: 425}}>
    <Image source={{uri: post.postImage}} style={{height: '100%'}} />
  </View>
);
const PostHeader = ({post}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: post.profile_picture}}
          style={{
            width: 40,
            height: 40,
            borderRadius: 30,
            borderColor: 'red',
            borderWidth: 1,
            marginLeft: 10,
          }}
        />
        <Text style={{color: 'black', marginLeft: 10}}>{post.username}</Text>
      </View>

      <View>
        <Text
          style={{
            color: 'black',
            marginRight: 10,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          ...
        </Text>
      </View>
    </View>
  );
};

export default Post;
