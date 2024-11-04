import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { mainStyles } from '../maincss'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAuth } from '../Context/Auth'
import { useFocusEffect } from '@react-navigation/native';

const Card = ({curEle,navigation}) => {
  const {designName,subCategory,photoPaths,description,price} = curEle;
  const { userInfo } = useAuth().state;

 
  // todo handle navigate
  const handleNavigate = (id) => {
    navigation.navigate("ProductDetail", {
      category: curEle.category
    });
  }
 
  return (
    <TouchableOpacity onPress={()=>{
      handleNavigate(curEle._id)
    }}>
     <View style={[styles.cardChild]}>
       <View style={{flexDirection:"row",width:"100%"}}>
         {/* image container */}
         <View style={{justifyContent:'center',alignItems:'center',height:"100%",width:"40%"}}>
            <Image source={{uri:`https://hanibackend.onrender.com/${photoPaths}`}} style={[mainStyles.imgWidth]}/>
        </View>
    
        {/*  design name container */}
        <View style={{height:"100%",width:"60%",position:"relative"}}> 
        <Text style={{fontSize:26,textTransform:"capitalize",fontWeight:"bold",padding:2}}>{subCategory}</Text >
        <Text style={{textTransform:"uppercase",color:"gray",padding:4}}>{designName}</Text>
        <Text style={{fontSize:16,textTransform:"capitalize"}}>" {description} "</Text>
        <View style={{position:"absolute",bottom:0,left:0,flexDirection:"row",alignItems:'center',gap:10}}>
                     <Text style={{fontWeight:"bold",fontSize:20}}>Rs {price} /gram.</Text>
                      <Text style={{backgroundColor:"black",paddingHorizontal:8,paddingVertical:8,color:"white",marginBottom:1,borderRadius:50}}>
                        Buy Now
                      </Text>
        </View>
        </View>
        {/* name container */}
       
       </View>
     </View>
     </TouchableOpacity>
    
  )
}
const styles = StyleSheet.create({
  cardChild:{
    width:360,
    height:200,
    backgroundColor:"white",
    elevation:2,
    justifyContent:'center',alignItems:'center',
  }
})
export default Card