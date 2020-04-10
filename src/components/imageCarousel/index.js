import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, I18nManager } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SCREEN_WIDTH } from '../../constants/colors';

const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 4);
const ImageCarousel = () => {
   const carouselRef = useRef(null);
   const [activeSlide, setactiveSlide] = useState(0);
   const data = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdi1PBrHn9_dU3Cy_Zi3WXUiMUNun0_FhmClzxtxqp_-GrI3BX&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjVKXpRpMnnxBkaUsREPg0igQAjhzKS4hSnOxsWfmOiIZewzcK&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTirRdLSYIyV1nKMjewjN-WFAqTRIHjDWK5ECHHCAMekuqhMlm6&usqp=CAU',
   ];

   const renderItem = ({ item }) => {
      return (
         <View style={styles.itemContainer}>
            <Image source={{ uri: item }} style={styles.itemLabel} />
         </View>
      );
   };

   return (
      <View
         style={{
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
         }}>
         <Carousel
            ref={carouselRef}
            data={data}
            renderItem={renderItem}
            sliderWidth={SCREEN_WIDTH}
            sliderHeight={ITEM_HEIGHT}
            itemWidth={ITEM_WIDTH}
            itemHeight={ITEM_HEIGHT}
            containerCustomStyle={styles.carouselContainer}
            layout={'default'}
            autoplay
            loop
            autoplayDelay={0}
            autoplayInterval={2000}
            onSnapToItem={index => setactiveSlide(index)}
            inverted={I18nManager.isRTL}
         />
         <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            dotStyle={{
               width: 10,
               height: 10,
               borderRadius: 5,
               marginHorizontal: 8,
               backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
            inactiveDotStyle={{
               width: 10,
               height: 10,
               borderRadius: 5,
               marginHorizontal: 8,
               backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   carouselContainer: {
      /* justifyContent: 'center',
      alignSelf: 'center', */
      marginTop: 20,
   },
   itemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ddd',
      borderRadius: 10,
      overflow: 'hidden',
   },
   itemLabel: {
      width: '100%',
      height: '100%',
   },
   counter: {
      marginTop: 25,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
   },
});

export { ImageCarousel };
