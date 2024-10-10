import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { View, Text} from 'react-native';
import { Button } from '../components/Button';

const buttonStyles = {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 100,
    borderRadius: 4,
    backgroundColor: 'black'
    
};

export default function HelpScreen() {
    const {navigate} =useNavigation()
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text 
            style={{ fontSize: 26, fontWeight: 'bold'}}>
                Help page
            </Text>
            <Button onPress={() => navigate('home6')} style={buttonStyles} title='press me' />
        </View>
    )
}