import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { mainStyles } from '../maincss'
const Rate = () => {
  return (
    <View style={[mainStyles.flexRow, mainStyles.flexCenter,{backgroundColor:"#EDE7E3",width:"100%",padding:12,gap:25}]}>
      <Text style ={{fontSize:16,fontWeight:"bold"}}>GOLD RATES</Text>
      <Text>Rs.23000/ <Text style={{color:"#EC359D",fontWeight:"bold"}}>PER GRAM</Text></Text>
      <Text>{new Date().toDateString()}</Text>
    </View>
  )
}

export default Rate

const styles = StyleSheet.create({})