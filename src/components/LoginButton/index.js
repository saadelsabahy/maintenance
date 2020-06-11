import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect, G, Path } from 'react-native-svg';
import { MAIN_RED_COLOR } from '../../constants/colors';

const LoginButton = ({ onLoginPressed }) => {
   return (
      <Svg
         width={'100%'}
         height={'100%'}
         viewBox="0 0 500 112"
         fill={MAIN_RED_COLOR}
         onPress={onLoginPressed}>
         <Path
            d="M583 563L96 105l1917-3 1917-2 485 456c267 250 485 457 485 460 0 2-862 4-1915 4H1070L583 563z"
            transform="matrix(.1 0 0 -.1 0 112)"
         />
      </Svg>
   );
};

export { LoginButton };
