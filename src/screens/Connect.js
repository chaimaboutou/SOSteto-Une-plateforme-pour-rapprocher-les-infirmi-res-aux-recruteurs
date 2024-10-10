
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from "@react-native-async-storage/async-storage";




const Connect = ({ navigation }) => {

    const { navigate } = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');







    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://192.168.58.61:3000/api/users/login', {
                email: email,
                mdp: password,
            });
            console.log('Login Response:', response.data); // Log the response data

            if (response.status === 200) {
                // Remove old token if it exists
                await AsyncStorage.removeItem("token");
                // Set new token in AsyncStorage
                await AsyncStorage.setItem("token", response.data.token);
                console.log('New token set:', response.data.token); // Log the new token
                // Navigate after setting the token
                console.log('Navigating to home7...');
                navigation.navigate('home7');
            } else {
                const errorMessage = error.response?.data?.error || 'An error occurred';
                Alert.alert('Error', errorMessage);
                console.log(errorMessage);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            setError(errorMessage);
            console.log(errorMessage);
        }
    };




    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.mainContainer}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Header />
                <View style={styles.container}>
                    <Text style={styles.title}>Se connecter</Text>
                    <TouchableOpacity style={styles.signInButtonG} onPress={() => { promptAsync() }}>
                        <Text style={styles.signInButtonText}>Sign In with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signInButtonF}>
                        <Text style={styles.signInButtonText}>Sign In with Facebook</Text>
                    </TouchableOpacity>
                    <View style={styles.lineContainer}>
                        <View style={styles.line}></View>
                        <Text style={styles.text}>ou</Text>
                        <View style={styles.line}></View>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                    {error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : null}
                    <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                        <Text style={styles.signInButtonText}>Se connecter</Text>
                    </TouchableOpacity>
                    <Text style={styles.signText}>Vous n'avez pas de compte ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpText}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#808080',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        width: '80%',
        borderRadius: 5,
    },
    signInButtonG: {
        backgroundColor: '#808080',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%',
    },
    signInButtonF: {
        backgroundColor: '#414BB2',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: '80%',
    },
    signInButton: {
        backgroundColor: '#84C7C0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%',
    },
    signInButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
    },
    signUpText: {
        fontSize: 14,
        color: '#0B0A62',
        marginBottom: 5,
        textDecorationLine: 'underline',
        marginTop: 5,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#0B0A62',
        marginBottom: 5,
        textDecorationLine: 'underline',
        marginTop: 5,
        marginLeft: -140,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
        marginHorizontal: 35,
    },
    text: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        width: '80%',
        // backgroundColor: '#FFD2D2', // Light red background color
        padding: 3,
        // borderRadius: 5,
        // marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginLeft: 0,
        fontSize: 13,
    },
});

export default Connect;
