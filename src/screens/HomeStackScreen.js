
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View, Text, Image, FlatList, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AjouterScreen from './AjouterScreen';

import HomeScreen from './HomeScreen';

const HomeStack = createNativeStackNavigator();



function Header() {
    const navigation = useNavigation();

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            marginTop: 50,
            paddingHorizontal: 10,
        }}>
            <Image
                source={require('../../assets/SOS.png')}
                style={{
                    width: 100,
                    height: 30,
                }}
                onPress={() => navigation.navigate('Home')}
            />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SearcgScreen')}>
                    <Ionicons name="help-circle-outline" size={28} color="#808080" style={{ paddingRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <Ionicons name="notifications-outline" size={24} color="#808080" style={{ paddingRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <Ionicons name="person-outline" size={24} color="#808080" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function HomeLogo(){
    return (
            <Image
            source={require('../../assets/SOS.png')}
            style={
                {
                    width: 100,
                    height: 30,
                }}
        />
        
    )
}

export default function HomeStackScreen() {
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen}
                options={{
                    headerTitle: (props) => '', 
                    headerLeft: (props) => (
                    <HomeLogo {...props} />
                    )

            }}
            />
            <HomeStack.Screen name="Ajouter" component={AjouterScreen}
                options={{
                    headerTitle: (props) => 'hello', 
                    headerRight: (props) => (
                    <HomeLogo {...props} />
                    )

            }}
            />
        </HomeStack.Navigator>
     
    )
}