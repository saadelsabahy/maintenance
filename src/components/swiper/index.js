import React from 'react';
import {
   View,
   Text,
   Dimensions,
   StyleSheet,
   Image,
   I18nManager,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { CustomText } from '../customText';
import {
   DRAWER_TEXT,
   MAIN_COLOR,
   PAGINATION_INACTIVE_DOT_COLOR,
   INPUT_COLOR,
} from '../../constants/colors';
import { Icon } from '../Icon';
const { width } = Dimensions.get('window');
const CustomSwiper = () => {
   const images = [
      {
         title: 'first image',
         id: 1,
         url:
            'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      },
      {
         title: 'second image',
         id: 2,
         url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTmAD0szoqJbgXhIqyZxDWoKilZI3E19dLA0pSjKQz5-6YpQULg',
      },
      {
         title: 'third image',
         id: 3,
         url:
            'https://thumbs.dreamstime.com/b/education-hero-header-image-mockup-tablet-pc-background-use-website-72186653.jpg',
      },
   ];
   return (
      <View style={styles.container}>
         <Swiper
            style={styles.wrapper}
            height={'90%'}
            onMomentumScrollEnd={(e, state, context) =>
               console.log('index:', state.index)
            }
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            loop
            autoplay
            showsButtons
            paginationStyle={{
               bottom: -0.15,
               flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}
            buttonWrapperStyle={{
               flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}
            nextButton={
               <Icon
                  type={'material-community'}
                  name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
                  size={50}
                  color={MAIN_COLOR}
                  iconBackGround
                  iconContainerStyle={styles.buttonsContainer}
               />
            }
            prevButton={
               <Icon
                  type={'material-community'}
                  name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
                  size={50}
                  color={MAIN_COLOR}
                  iconContainerStyle={styles.buttonsContainer}
               />
            }>
            {images.map((image, index) => {
               return (
                  <View style={styles.slide} key={image.id}>
                     <Image
                        resizeMode="cover"
                        style={styles.image}
                        source={{ uri: image.url }}
                     />
                  </View>
               );
            })}
         </Swiper>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      height: '40%',
      width: '100%',
      backgroundColor: '#ddd',
   },

   wrapper: {},

   slide: {
      width: '100%',
      height: '100%',
      backgroundColor: '#ddd',
   },

   text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
   },

   image: {
      width,
      flex: 1,
   },
   activeDot: {
      backgroundColor: MAIN_COLOR,
      width: 22,
      height: 22,
      borderRadius: 11,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
   },
   dot: {
      backgroundColor: PAGINATION_INACTIVE_DOT_COLOR,
      width: 20,
      height: 20,
      borderRadius: 10,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
   },
   buttonsContainer: {
      backgroundColor: INPUT_COLOR,
      borderTopStartRadius: 0,
      borderBottomStartRadius: 0,
   },
});

export { CustomSwiper };
