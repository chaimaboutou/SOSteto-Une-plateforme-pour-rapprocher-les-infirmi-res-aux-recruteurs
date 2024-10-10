import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const SignUpScreen = ({ navigation }) => {
    const [nom, setNom] = useState('');
    const { navigate } = useNavigation()
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);



    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://192.168.58.61:3000/api/users/register', {
                nom,
                prenom,
                email,
                mdp: password,
                role: "recruteur",
                estConnecte: false,
            });




            if (response.status === 201) {
                Alert.alert('Success', 'Registered Successfully!', [
                    {
                        text: 'OK',
                        onPress: () => navigate('connect'),
                    },
                ]);
            } else {

                const errorMessage = error.response?.data?.error || 'An error occurred';
                Alert.alert('Error', errorMessage);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            setError(errorMessage);

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
                    <Text style={styles.title}>S'inscrire</Text>
                    <TouchableOpacity style={styles.signInButtonG}>
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

                    <View style={styles.inlineInputContainer}>
                        <TextInput
                            style={styles.inlineInput}
                            placeholder="Nom"
                            value={nom}
                            onChangeText={(text) => setNom(text)}
                        />
                        <TextInput
                            style={styles.inlineInput}
                            placeholder="Prénom"
                            value={prenom}
                            onChangeText={(text) => setPrenom(text)}
                        />
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />


                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    {error ? (
                        <View style={styles.errorContainer}>

                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : null}



                    <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                        <Text style={styles.signUpButtonText}>Devenir membre</Text>
                    </TouchableOpacity>
                    <Text >Bienvenu sur SOSteto !</Text>
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
    signInButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpButton: {
        backgroundColor: '#84C7C0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 15,
        width: '80%',

    },
    signUpButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInText: {
        color: '#0B0A62',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
        textDecorationLine: 'underline',
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
    inlineInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginBottom: 15,
    },
    inlineInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginRight: 8,
        marginLeft: 8,
        borderRadius: 5,
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

export default SignUpScreen;