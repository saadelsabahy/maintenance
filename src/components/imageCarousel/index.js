import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, I18nManager } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
   SCREEN_WIDTH,
   WHITE_COLOR,
   SECONDART_COLOR,
   MAIN_RED_COLOR,
} from '../../constants/colors';

const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 2);
const ImageCarousel = ({ data }) => {
   const carouselRef = useRef(null);
   const [activeSlide, setactiveSlide] = useState(0);
   /* const data = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdi1PBrHn9_dU3Cy_Zi3WXUiMUNun0_FhmClzxtxqp_-GrI3BX&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjVKXpRpMnnxBkaUsREPg0igQAjhzKS4hSnOxsWfmOiIZewzcK&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTirRdLSYIyV1nKMjewjN-WFAqTRIHjDWK5ECHHCAMekuqhMlm6&usqp=CAU',
   ]; */

   const renderItem = ({ item: { ImagePath } }) => {
      return (
         <View style={styles.itemContainer}>
            <Image source={{ uri: ImagePath }} style={styles.itemLabel} />
         </View>
      );
   };

   return (
      <View
         style={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            zIndex: 99,
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
            autoplayDelay={0}
            autoplayInterval={2000}
            onSnapToItem={index => setactiveSlide(index)}
            inverted={I18nManager.isRTL}
         />
         {
            <Pagination
               containerStyle={{
                  paddingVertical: 10,
               }}
               dotsLength={data.length}
               activeDotIndex={activeSlide}
               dotStyle={styles.activeDot}
               inactiveDotStyle={styles.inactiveDot}
               inactiveDotOpacity={0.4}
            />
         }
      </View>
   );
};
const styles = StyleSheet.create({
   carouselContainer: {
      /* justifyContent: 'center',
      alignSelf: 'center', */
      flex: 2,
   },
   itemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: SECONDART_COLOR,
      height: '95%',
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
   activeDot: {
      width: 15,
      height: 15,
      borderRadius: 7.5,
      backgroundColor: MAIN_RED_COLOR,
      zIndex: 1000,
   },
   inactiveDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#ddd',
      zIndex: 1000,
   },
});

export { ImageCarousel };
