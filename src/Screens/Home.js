import { StyleSheet, Text, View ,RefreshControl} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { mainStyles } from '../maincss'
import Rate from '../Components/Rate'
import Slider from '../Components/ImgSlider'
import Card from '../Components/Card' 
import { useProduct } from '../Context/Product'
import Loading from '../Components/Loading'

const Home = ({navigation}) => {
  const {state,getGoldProducts,getSilverProducts} = useProduct();
 const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);
      useEffect(()=>{
        getGoldProducts,getSilverProducts
      },[])
      useEffect(()=>{
        getGoldProducts,getSilverProducts
      },[refreshing])
  return (
   <ScrollView style={[mainStyles.bgWhite]}  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }>
  <View style={[mainStyles.flexCenter]}>
    {/* rate component */}
   <Rate/>
     {/*  image slider components */}
     <Slider/>
      {/* rate component */}
   <Rate/>      
   {/* gold jwellery container */}
  <View style={[mainStyles.width100]}>
  <Text style={{fontSize:23,fontWeight:"bold",paddingVertical:10}}>GOLD JWELLERY</Text>
  </View>
   <ScrollView horizontal={true}>
   <View style={[mainStyles.flexRow,mainStyles.gap,mainStyles.padding]}>
    {
    state.isGold?<Loading/>:state.goldProducts?.map((curEle)=>{
    return <Card key={curEle._id} curEle={curEle} navigation={navigation}/>
})
    } 
   </View>
   </ScrollView>
   {/* silver jwellery container */}
   <View style={[mainStyles.width100]}>
  <Text style={{fontSize:23,fontWeight:"bold",paddingVertical:10}}>SLIVER  JWELLERY</Text>
  </View>
  <ScrollView horizontal={true}>
  <View style={[mainStyles.flexRow,mainStyles.gap,mainStyles.padding]}>
  {
    state.isSilver?<Loading/>:state.silverProducts?.map((curEle)=>{
  return <Card key={curEle._id} curEle={curEle} navigation={navigation}/>
})
    }
   </View>
  </ScrollView>
  </View>
   </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})