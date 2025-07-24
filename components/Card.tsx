import * as React from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import { cardStyles } from '../assets/css/styles'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Card = ({ handlePress, filename, icon }: any) => {
  return (
    <View style={cardStyles.cardWrapper}>
      <TouchableOpacity style={cardStyles.container} onPress={handlePress}>
        <View style={cardStyles.contentWrapper}>
            <FontAwesome5 name={icon} solid color={"#073e7f"} size={30} style={cardStyles.icon}/>
          <View style={cardStyles.textWrapper}>
            <Text
              style={cardStyles.text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {filename}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;


