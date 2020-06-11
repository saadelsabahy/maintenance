import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Svg, { Rect, G, Path } from 'react-native-svg';
import {
   MAIN_RED_COLOR,
   SCREEN_WIDTH,
   SCREEN_HEIGHT,
   WHITE_COLOR,
} from '../../constants/colors';
import { CustomText } from '../customText';
import { Icon } from '../Icon';

const LoginButton = ({ onLoginPressed, loading }) => {
   return (
      <TouchableOpacity
         onPress={onLoginPressed}
         activeOpacity={0.9}
         style={{
            width: SCREEN_WIDTH / 2,
            height: SCREEN_HEIGHT / 12,
            top: 20,
         }}>
         <Svg
            width={'100%'}
            height={'100%'}
            viewBox="0 0 500 112"
            fill={MAIN_RED_COLOR}
            style={{ position: 'absolute' }}>
            <Path
               d="M583 563L96 105l1917-3 1917-2 485 456c267 250 485 457 485 460 0 2-862 4-1915 4H1070L583 563z"
               transform="matrix(.1 0 0 -.1 0 112)"
            />
         </Svg>
         <View
            style={{
               flex: 1,
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'row',
            }}>
            <Icon
               name="long-arrow-right"
               type="font-awesome"
               iconContainerStyle={{ flex: 0.3, bottom: -3 }}
               color={WHITE_COLOR}
            />
            {loading ? (
               <ActivityIndicator animating color={WHITE_COLOR} />
            ) : (
               <CustomText text={'دخول'} />
            )}
         </View>
      </TouchableOpacity>
   );
};

export { LoginButton };
