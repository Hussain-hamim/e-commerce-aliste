import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

type CartItemProps = {
  cartItem: CartItemType;
};

export default function CartItem({ cartItem }: CartItemProps) {
  const { product, quantity } = cartItem;
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const handleProductPress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.imageContainer}
        onPress={handleProductPress}
      >
        <Image 
          source={{ uri: product.image }} 
          style={styles.image} 
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <View style={styles.detailsContainer}>
        <TouchableOpacity onPress={handleProductPress}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        
        <View style={styles.actionsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => decreaseQuantity(product.id)}
              disabled={quantity <= 1}
              activeOpacity={quantity <= 1 ? 1 : 0.7}
            >
              <Minus 
                size={16} 
                color={quantity <= 1 ? '#CBD5E1' : '#64748B'} 
              />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => increaseQuantity(product.id)}
            >
              <Plus size={16} color="#64748B" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => removeFromCart(product.id)}
          >
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#3B82F6',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    width: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
});