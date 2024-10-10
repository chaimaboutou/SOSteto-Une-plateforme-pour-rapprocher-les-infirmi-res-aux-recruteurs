import * as React from 'react';
import { View, Image, TouchableOpacity, Pressable, StyleSheet, Text, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPageScreen from '../screens/MainPageScreen';
import Footer from '../components/Footer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SearchResultNonConnct from '../screens/SearchResultNonConnct';
import VoirProfileDetailsScreen from '../screens/VoirProfileDetailsScreen';
import Connect from '../screens/Connect';
import Header from '../components/Header';
import RegisterPageScreen from '../screens/RegisterPageScreen';
import EditPublicProfileScreen from '../screens/EditPublicProfileScreen';


const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#84c4c0',
    },
};


const HomeStack = createNativeStackNavigator();



function MainPageNavigation() {
    return (
        <HomeStack.Navigator headerMode="float">

            <HomeStack.Screen name="home6" component={MainPageScreen} options={{
                header: () => (

                    <Header></Header>
                )

            }} />
            <HomeStack.Screen name="home7" component={Footer} options={{

                headerShown: false
            }} />
            <HomeStack.Screen name="homeSearch" component={SearchResultNonConnct} options={{

                headerShown: false
            }} />
            <HomeStack.Screen name="VoirProfileDetailsScreen" component={VoirProfileDetailsScreen} options={{

                headerShown: false
            }} />
            <HomeStack.Screen name="connect" component={Connect} options={{

                headerShown: false
            }} />
            <HomeStack.Screen name="SignUp" component={RegisterPageScreen} options={{

                headerShown: false
            }} />
            <HomeStack.Screen name="Modifier le profil" component={EditPublicProfileScreen} options={{

                headerShown: false
            }} />



        </HomeStack.Navigator>
    )
}




export default function Navigation() {
    return (
        <NavigationContainer style={{ backgroundColor: 'white' }} theme={MyTheme}>
            <View style={{
                flex: 1
            }}>
                <MainPageNavigation />




                {/* <MainPageScreen/> */}

                {/* <Footer/> */}
            </View>

        </NavigationContainer>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        marginTop: 0,
    },

    additionalSection: {
        backgroundColor: '#84c7c0',
        alignItems: 'center',
    },
    sectionText: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 0,
        marginTop: 0,
        padding: 10,
    },

    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        width: 90,
    },
    buttonText: {
        color: 'red',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'black',
        fontSize: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 0,
    },
    image: {

        width: '100%',
        height: 350,
        resizeMode: 'cover',
    },
    Section2: {
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
    },
    sectionText2: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
        marginBottom: 0,
        marginTop: 0,
        padding: 10,
    },
    sectionText22: {
        color: 'black',
        fontSize: 17,
        marginBottom: 0,
        marginTop: 0,
        padding: 10,
    },
    icon: {
        color: '#fff',
        fontSize: 24,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputAndroid: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});