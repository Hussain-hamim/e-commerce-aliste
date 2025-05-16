import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Product } from '@/types';
import { fetchProduct } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { StatusBar } from 'expo-status-bar';
import { Star as StarIcon, ShoppingCart, ArrowLeft } from 'lucide-react-native';
import ErrorView from '@/components/ErrorView';
import RatingStars from '@/components/RatingStars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * ProductDetailScreen Component
 *
 * Displays detailed information about a single product including:
 * - Product image
 * - Title, category, and price
 * - Rating and reviews
 * - Full description
 * - Add to cart functionality
 *
 * Handles loading states, error states, and safe area insets.
 */
export default function ProductDetailScreen() {
  // Navigation and route parameters
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  // State management
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cart context
  const { addToCart } = useCart();

  /**
   * Fetches product details from API
   * Handles loading states and errors
   */
  useEffect(() => {
    const getProductDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const productData = await fetchProduct(Number(id));
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product details. Please try again.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  /**
   * Handles adding product to cart
   */
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <ErrorView
        message={error || 'Product not found'}
        onRetry={() => router.back()}
        buttonText="Go Back"
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Configuration */}
      <Stack.Screen
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={[styles.backButton, { marginTop: top }]}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <StatusBar style="auto" />

      {/* Main Content Scrollable Area */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>

          {/* Rating Section */}
          <View style={styles.ratingContainer}>
            <RatingStars rating={product.rating.rate} size={18} />
            <Text style={styles.ratingText}>
              {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
            </Text>
          </View>

          {/* Price Section */}
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          {/* Description Section */}
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Add to Cart Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * StyleSheet for ProductDetailScreen component
 */
const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Loading state styles
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },

  // Header back button styles
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Product image section styles
  imageContainer: {
    height: 350,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  productImage: {
    width: '80%',
    height: 250,
  },

  // Product details section styles
  detailsContainer: {
    padding: 24,
  },
  category: {
    fontSize: 14,
    color: '#64748B',
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    color: '#1E293B',
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },

  // Rating section styles
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },

  // Price styles
  price: {
    fontSize: 24,
    color: '#3B82F6',
    fontFamily: 'Inter-Bold',
    marginBottom: 24,
  },

  // Description section styles
  descriptionTitle: {
    fontSize: 18,
    color: '#1E293B',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },

  // Bottom add to cart section styles
  bottomContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  addToCartButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
});
