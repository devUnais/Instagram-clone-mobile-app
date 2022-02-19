import React from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity } from 'react-native'
import FormikPostUpload from './components/FormikPostUpload'
import Leftarrow from '../Images/Leftarrow.png'

const AddNewPostScreen = ({navigation}) => {
    return (
        <View>
            <View style={styles.newPostTop}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                     <Image style={{margin:10,height:25,width:25}} source={Leftarrow}/>
                </TouchableOpacity>
              
                <Text style={{color:'black',marginLeft:100,marginTop:10,fontSize:16}}>NEW POST</Text> 
             
            </View>    
            <FormikPostUpload/>
        </View>
    )
}

const styles = StyleSheet.create({
    newPostTop:{
        flexDirection:'row',
        
        
    }
})

export default AddNewPostScreen
