// import React from 'react';
// import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');

// const ImageCarousel = () => {
//   const data = [
//     { imageUrl: 'https://example.com/image1.jpg', caption: 'Imagen 1' },
//     { imageUrl: 'https://example.com/image2.jpg', caption: 'Imagen 2' },
//     { imageUrl: 'https://example.com/image3.jpg', caption: 'Imagen 3' },
//   ];

//   const renderItem = ({ item }) => {
//     return (
//       <View style={styles.slide}>
//         <Image source={{ uri: item.imageUrl }} style={styles.image} />
//         <Text style={styles.caption}>{item.caption}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.carouselContainer}>
//       <Carousel
//         data={data}
//         renderItem={renderItem}
//         sliderWidth={screenWidth}
//         itemWidth={screenWidth}
//         autoplay={true}
//         loop={true}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   carouselContainer: {
//     marginTop: 50, // Ajusta según tus necesidades
//   },
//   slide: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: screenWidth - 60,
//     height: 300,
//     borderRadius: 10,
//   },
//   caption: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#000',
//   },
// });

// export default ImageCarousel;
