import React,{useEffect,useState} from 'react'
import { View, Text,SafeAreaView, ScrollView } from 'react-native'
import Header from './components/Header'
import Post from './components/Post'
import UserStatus from './components/UserStatus'
import Bottambar from './components/Bottambar'
import {firebase,db} from '../firebase'
import auth from '@react-native-firebase/auth'
const HomeScreen = ({navigation}) => {


    const [postData,setPostData] = useState([])

    useEffect(() => {


      db.collectionGroup('posts').onSnapshot(snapshot=>{
          
          setPostData(snapshot?.docs.map(post=>({id:post.id,...post.data()})))  
      })
    }, [])



  
    return (
        <>
       
        <ScrollView >
           <Header/>
           <UserStatus/>
           {postData?.map((data,index)=>(
               
               <Post key={index} post={data}/>

           ))}
           
        </ScrollView>
        
        <Bottambar/>
        </>
    )
}

export default HomeScreen
