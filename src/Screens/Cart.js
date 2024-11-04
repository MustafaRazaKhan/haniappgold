import { StyleSheet, Text, View, ScrollView ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/Auth';
import Toast from 'react-native-root-toast';


const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const { userInfo } = useAuth().state;

  useEffect(() => {
 
      getCartItem(); // Fetch cart items only if user is authenticated
  
  }, []); // Run effect when token changes

  const getCartItem = async () => {
    const url = `https://hanibackend.onrender.com/api/cart/allcart`;
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}` // Include token if needed
        },
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.allCart);
        Toast.show(data.msg, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          backgroundColor: "green"
      });
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cart.length > 0 ? (
          cart.map((curEle) => (
            <View key={curEle._id} style={styles.cartItem}>
              <Image source={{ uri: `https://hanibackend.onrender.com/${curEle.photoPaths}` }} style={styles.itemImage} />
              <Text style={styles.itemName}>{curEle.designName}</Text>
              <Text style={styles.itemDescription}>{curEle.description}</Text>
              <Text style={styles.itemDetails}>Category: {curEle.category}</Text>
              <Text style={styles.itemDetails}>Subcategory: {curEle.subCategory}</Text>
              <Text style={styles.itemDetails}>Gross Weight: {curEle.grossWeight}g</Text>
              <Text style={styles.itemDetails}>Net Weight: {curEle.netWeight}g</Text>
              <Text style={styles.itemPrice}>Price: ₹{curEle.price}</Text>
              <Text style={styles.itemDetails}>Added by: {curEle.userName}</Text>
              <Text style={styles.itemDetails}>Contact: {curEle.userMobile}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyMessage}>No items in the cart.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  itemImage: {
    width: '100%',
    height: 320,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E69A8',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});
