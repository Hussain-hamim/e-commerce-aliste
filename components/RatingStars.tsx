import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Star } from 'lucide-react-native';

type RatingStarsProps = {
  rating: number;
  size?: number;
};

export default function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  // Create an array of 5 stars
  const stars = Array(5).fill(0);
  
  return (
    <View style={styles.container}>
      {stars.map((_, index) => {
        // Full star
        if (index < Math.floor(rating)) {
          return (
            <Star
              key={index}
              size={size}
              color="#F59E0B"
              fill="#F59E0B"
              strokeWidth={0}
            />
          );
        }
        // Half star (if the rating has a decimal part)
        else if (index < Math.ceil(rating) && rating % 1 !== 0) {
          return (
            <View key={index} style={styles.halfStarContainer}>
              <Star
                size={size}
                color="#F59E0B"
                fill="#F59E0B"
                strokeWidth={0}
                style={[styles.halfStar, { width: size / 2 }]}
              />
              <Star
                size={size}
                color="#E2E8F0"
                fill="#E2E8F0"
                strokeWidth={0}
                style={[
                  styles.halfStar, 
                  styles.emptyHalf, 
                  { width: size / 2, left: size / 2 }
                ]}
              />
            </View>
          );
        }
        // Empty star
        else {
          return (
            <Star
              key={index}
              size={size}
              color="#E2E8F0"
              fill="#E2E8F0"
              strokeWidth={0}
            />
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  halfStarContainer: {
    position: 'relative',
    width: 16,
    height: 16,
    overflow: 'hidden',
  },
  halfStar: {
    position: 'absolute',
  },
  emptyHalf: {
    borderLeftWidth: 0,
  },
});