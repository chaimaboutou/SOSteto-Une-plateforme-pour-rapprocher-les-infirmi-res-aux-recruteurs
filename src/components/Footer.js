import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Pressable } from 'react-native';
import AjouterScreen from '../screens/AjouterScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ParameterScreen from '../screens/ParameterScreen';
import SearchScreen from '../screens/SearchScreen';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStackScreen from '../screens/HomeStackScreen';
import HomeScreen from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import VoirProfileDetailsScreen from '../screens/VoirProfileDetailsScreen';
import HelpScreen from '../screens/HelpScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import ToutesMesDemandesScreen from '../screens/ToutesMesDemandesScreen';


const Tab = createBottomTabNavigator();


const homeName = 'Home';
const searchName = 'Rechercher'
const favouritesName = 'Favoris'
const messageName = 'Ajouter'
const parametersName = 'Paramètres'
const notificationsName = 'Notifications'



const Header = () => {
    const navigation = useNavigation();



    return (
        <View style={{ width: '100%', height: 50, marginLeft: 160, flexDirection: 'row', position: 'relative', alignItems: 'center' }}>

            <Ionicons style={{ paddingRight: 10 }} name="help-circle-outline" color="black" size={28} onPress={() => {
                navigation.navigate("home3")
            }} />


            <Ionicons style={{ paddingRight: 10 }} name="notifications-outline" color="black" size={24} onPress={() => {
                navigation.navigate("home4")
            }} />


            <Ionicons name="person-outline" color="black" size={24} onPress={() => {
                navigation.navigate("Mon profil")
            }} />
        </View>

    )
}

const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="home2" component={HomeScreen} options={{
                header: () => (

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 40, backgroundColor: 'white', marginLeft: 5 }}>
                        <Image
                            source={require("../../assets/SOS.png")}
                            style={{ width: 100, height: 40 }}

                        />
                        <Header />
                    </View>
                )
            }} />
            <HomeStack.Screen name="home3" component={HelpScreen} />
            <HomeStack.Screen name="home4" component={NotificationsScreen} />
            <HomeStack.Screen name="Mon profil" component={PublicProfileScreen} />
            <HomeStack.Screen
                name="VoirProfileDetailsScreen"
                component={VoirProfileDetailsScreen}
                options={{
                    headerTitle: "Posts Details",
                    headerShown: true,
                    contentStyle: {
                        backgroundColor: 'white'
                    }
                }}
            />
            <HomeStack.Screen
                name="ToutesMesDemandesScreen"
                component={ToutesMesDemandesScreen}
                options={{
                    headerTitle: "Mes Demandes",
                    headerShown: true,
                    contentStyle: {
                        backgroundColor: 'white'
                    }
                }}
            />
        </HomeStack.Navigator>
    )
}

export default function Footer() {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused, size }) => {
                    let iconName;
                    if (route.name === homeName) {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name == searchName) {
                        iconName = focused ? "search" : "search-outline";
                    } else if (route.name == favouritesName) {
                        iconName = focused ? "heart" : "heart-outline";
                    } else if (route.name == messageName) {
                        iconName = focused ? "add" : "add-outline";
                    } else if (route.name == parametersName) {
                        iconName = focused ? "settings" : "settings-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen
                name={homeName} component={HomeStackGroup} options={{ headerShown: false }}
            />

            <Tab.Screen
                name={searchName} component={SearchScreen} options={{
                    header: () => (

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 40, backgroundColor: 'white', marginLeft: 5 }}>
                            <Image
                                source={require("../../assets/SOS.png")}
                                style={{ width: 100, height: 40 }}

                            />
                            <Header />
                        </View>
                    )
                }} />
            <Tab.Screen
                name={favouritesName} component={FavouritesScreen} options={{
                    header: () => (

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 40, backgroundColor: 'white', marginLeft: 5 }}>
                            <Image
                                source={require("../../assets/SOS.png")}
                                style={{ width: 100, height: 40 }}

                            />
                            <Header />
                        </View>
                    )
                }} />
            <Tab.Screen
                name={messageName} component={AjouterScreen} options={{
                    header: () => (

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 40, backgroundColor: 'white', marginLeft: 5 }}>
                            <Image
                                source={require("../../assets/SOS.png")}
                                style={{ width: 100, height: 40 }}

                            />
                            <Header />
                        </View>
                    )
                }} />
            <Tab.Screen
                name={parametersName} component={ParameterScreen} options={{
                    header: () => (

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 40, backgroundColor: 'white', marginLeft: 5 }}>
                            <Image
                                source={require("../../assets/SOS.png")}
                                style={{ width: 100, height: 40 }}

                            />
                            <Header />
                        </View>
                    )
                }} />
        </Tab.Navigator>


    )
}
