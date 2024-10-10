import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View, Image, TouchableOpacity, Pressable, Text } from 'react-native';

export const Button = (props) => {
    const { onPress, title, style} = props;
    const [isPressed, setIsPressed] = React.useState(false);

    
    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    

    return (
      <Pressable 
        style={props.style}
        onPress={props.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        >
        <Text style={{
            fontSize: 14,
            lineHeight: 21,
            fontWeight: 'bold',
            color: 'white',
        }}>
            {props.title}
        </Text>
      </Pressable>
    );
  }