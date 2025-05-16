import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import EmptyCart from '@/components/EmptyCart';
import { ShoppingBag } from 'lucide-react-native';

/**
 * CartScreen Component
 *
 * Displays the user's shopping cart with all items, summary information,
 * and checkout functionality. Shows an empty cart message when no items are present.
 */
export default function CartScreen() {
  // Access cart context to get items and calculate total price
  const { cartItems, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <View style={styles.container}>
      {/* Header Configuration */}
      <Stack.Screen
        options={{
          title: 'My Cart',
          headerTitleAlign: 'center',
        }}
      />
      <StatusBar style="auto" />

      {/* Conditional Rendering: Empty Cart vs Cart with Items */}
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* List of Cart Items */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={({ item }) => <CartItem cartItem={item} />}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
          />

          {/* Order Summary Section */}
          <View style={styles.summaryContainer}>
            {/* Subtotal Row */}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
            </View>

            {/* Shipping Row */}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>FREE</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Total Row */}
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity style={styles.checkoutButton}>
              <ShoppingBag size={20} color="#FFFFFF" />
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

/**
 * StyleSheet for CartScreen component
 */
const styles = StyleSheet.create({
  // Main container style
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Styles for the cart items list
  cartList: {
    padding: 16,
  },

  // Styles for the summary/checkout section
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },

  // Styles for each row in the summary section
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  // Label text style in summary
  summaryLabel: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },

  // Value text style in summary
  summaryValue: {
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Inter-Medium',
  },

  // Divider between summary sections
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },

  // Total label style
  totalLabel: {
    fontSize: 18,
    color: '#1E293B',
    fontFamily: 'Inter-Bold',
  },

  // Total value style
  totalValue: {
    fontSize: 20,
    color: '#3B82F6',
    fontFamily: 'Inter-Bold',
  },

  // Checkout button style
  checkoutButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  // Checkout button text style
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
});
