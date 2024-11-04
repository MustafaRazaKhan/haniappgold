import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useProduct } from '../Context/Product';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../Context/Auth';
import Toast from 'react-native-root-toast';

const Product = ({ route }) => {
  const { id } = route.params;
  const { userInfo } = useAuth().state;
  const { token } = userInfo;
  const { singleProduct, state } = useProduct();

  useEffect(() => {
    singleProduct(id);
  }, [id]);

  const { photoPaths } = state.singleProduct;

  const handleCart = async (id) => {
    const url = `https://hanibackend.onrender.com/api/cart/newcart`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if(data.success){
        Toast.show(data.msg, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          backgroundColor: "green"
      });
      }
      console.log('Cart updated:', data);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productContainer}>
        <Image
          source={{ uri: `https://hanibackend.onrender.com/${photoPaths}` }}
          style={styles.productImage}
        />
        <Text style={styles.productName}>{state.singleProduct?.designName}</Text>
        <Text style={styles.productDetail}>Gross Weight: {state.singleProduct?.grossWeight}g</Text>
        <Text style={styles.productDetail}>Net Weight: {state.singleProduct?.netWeight}g</Text>
        <Text style={styles.productPrice}>Price: ₹{state.singleProduct?.price}</Text>
        <Text style={styles.productDescription}>{state.singleProduct?.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleCart(state.singleProduct._id)}
      >
        <Text style={styles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background for contrast
  },
  productContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Android shadow
    marginVertical: 16,
    marginHorizontal: 8,
  },
  productImage: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  productDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 16,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E69A8',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 16,
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  addToCartButton: {
    backgroundColor: '#2E69A8',
    padding: 15,
    borderRadius: 8,
    margin: 16,
    elevation: 2, // Button shadow for depth
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
