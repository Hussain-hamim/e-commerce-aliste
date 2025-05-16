import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/services/api';
import { Product } from '@/types';
import ErrorView from '@/components/ErrorView';

/**
 * ProductsScreen Component
 *
 * Displays a grid of products fetched from the API. Includes:
 * - Loading state
 * - Error handling
 * - Pull-to-refresh functionality
 * - Responsive grid layout
 */
export default function ProductsScreen() {
  // State management for products, loading states, and errors
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches products from API and updates state
   * Handles both initial load and refresh scenarios
   */
  async function loadProducts() {
    try {
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Initial data fetch on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  /**
   * Handles pull-to-refresh action
   */
  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  // Loading state (only shown on initial load, not during refresh)
  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return <ErrorView message={error} onRetry={loadProducts} />;
  }

  return (
    <View style={styles.container}>
      {/* Header Configuration */}
      <Stack.Screen
        options={{
          title: 'Shop Products',
          headerTitleAlign: 'center',
        }}
      />
      <StatusBar style="auto" />

      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
      />
    </View>
  );
}

/**
 * StyleSheet for ProductsScreen component
 */
const styles = StyleSheet.create({
  // Main container style
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Loading state styles
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },

  // Product list styles
  productList: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // Empty state styles
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#64748B',
    marginTop: 20,
    fontFamily: 'Inter-Regular',
  },
});
