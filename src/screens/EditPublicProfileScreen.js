import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable, ImageBackground, Switch, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { recruteurs } from '../data/recruteurs';
import { demandes } from '../data/demandes';
import { Button } from '../components/Button';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const buttonStyles = {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    marginLeft: 30,
    width: 90,
    borderRadius: 20,
    backgroundColor: '#84c0c7',
    left: 220,
    bottom: 10,
    marginTop: 0,

};


export default function EditPublicProfileScreen() {
    const navigation = useNavigation();

    const route = useRoute();
    const userData = route.params?.userData;

    const [nom, setNom] = useState(userData?.nom || '');
    const [prenom, setPrenom] = useState(userData?.prenom || '');
    const [email, setEmail] = useState(userData?.email || '');
    const [telephone, setTelephone] = useState(userData?.telephone || '');
    const [ville, setVille] = useState(userData?.ville || '');
    const [quartier, setQuartier] = useState(userData?.quartier || '');
    const [mdp, setMdp] = useState(userData?.mdp || '');
    const [role, setRole] = useState(userData?.role || '');
    const [estConnecte, setEstConnecte] = useState(userData?.estConnecte || '');
    const [status, setStatus] = useState(userData?.status || 'true');
    const [villes, setVilles] = useState([]);
    const [quartiers, setQuartiers] = useState([]);



    useEffect(() => {
        const fetchVilles = async () => {
            try {
                const response = await axios.get('http://192.168.58.61:3000/api/villes');
                setVilles(response.data.map(ville => ({ label: ville.nom_ville, value: ville.nom_ville })));
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            }
        };

        fetchVilles();
    }, []);




    const handleSave = async () => {

        const user = {
            nom,
            prenom,
            email,
            telephone,
            ville,
            quartier,
            mdp,
            role,
            estConnecte,
            status,
        };

        try {

            const id = userData._id;
            const response = await axios.put(`http://192.168.58.61:3000/api/users/${id}`, user);


            if (response.status === 200) {
                console.log("User updated successfully", response.data);
                // Handle successful update (e.g., navigate back or show a success message)
                navigation.navigate("Mon profil");
            } else {
                console.error("Failed to update user", response);
                // Handle failure (e.g., show an error message)
            }
        } catch (error) {
            console.error("Error updating user", error);

        }
    };

    const handleCityChange = async (value) => {
        setVille(value);
        try {

            const quartiersResponse = await axios.get(`http://192.168.58.61:3000/api/villes/${value}/quartiers`);
            setQuartiers(quartiersResponse.data.map(quartier => ({ label: quartier.nom_quartier, value: quartier.nom_quartier, id: quartier._id })));
        } catch (error) {
            console.error("Failed to fetch city or quartiers data:", error);
        }
    };


    const handleQuartierChange = (value) => {
        setQuartier(value);
    };




    return (
        <ScrollView testID='PublicProfileScreen' >
            <ImageBackground
                source={require('./banniere.png')}
                style={{
                    marginTop: 20,
                    position: 'relative',
                    backgroundColor: '#C1C1C1',
                    width: '100%',
                    resizeMode: "cover",
                    height: 100,

                }}>

                <Image source={recruteurs[0].sourceImageProfile} style={{
                    resizeMode: 'cover',
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginLeft: 10,
                    marginTop: 50,
                    borderWidth: 3,
                    borderColor: 'white',

                }} />
            </ImageBackground>

            <View>
                <View style={{

                    paddingBottom: 10,
                    borderBottomColor: '#E6E6E6',
                    borderBottomWidth: 5,
                    marginTop: 20,
                    marginLeft: 20,
                    position: 'relative'


                }}>
                    <Button title="Valider" onPress={handleSave} style={buttonStyles} />

                    <View style={{ marginLeft: 10, marginTop: 20 }}>
                        <View style={{
                            flexDirection: 'column',


                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17, marginRight: 50 }}>Nom : </Text>
                            <TextInput style={{
                                height: 40,
                                width: '85%',
                                borderColor: "#C1C1C1",
                                borderWidth: 1,
                                paddingLeft: 10,
                                marginRight: 20,
                                borderRadius: 5,
                                marginTop: 5,
                                fontSize: 17,
                                marginTop: 5
                            }}
                                placeholder="Farhat" type="text" value={nom} onChangeText={(text) => setNom(text)} />

                        </View>

                        <View style={{
                            flexDirection: 'column',
                            marginTop: 20
                        }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 17, marginRight: 50 }}>Prénom : </Text>
                            <TextInput style={{
                                height: 40,
                                width: '85%',
                                borderColor: "#C1C1C1",
                                borderWidth: 1,
                                paddingLeft: 10,
                                marginRight: 20,
                                borderRadius: 5,
                                marginTop: 5,
                                fontSize: 17,
                                marginTop: 5
                            }}
                                placeholder="Farhat" type="text" value={prenom} onChangeText={(text) => setPrenom(text)} />
                        </View>

                        <View style={{
                            flexDirection: 'column',
                            marginTop: 20
                        }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 17, marginRight: 50 }}>Email: </Text>
                            <TextInput style={{
                                height: 40,
                                width: '85%',
                                borderColor: "#C1C1C1",
                                borderWidth: 1,
                                paddingLeft: 10,
                                marginRight: 20,
                                borderRadius: 5,
                                marginTop: 5,
                                fontSize: 17,
                                marginTop: 5
                            }}
                                placeholder="Farhat" type="text" value={email} onChangeText={(text) => setEmail(text)} />
                        </View>


                        <View style={{
                            flexDirection: 'column',
                            marginTop: 20
                        }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 17, marginRight: 50 }}>Numéro de téléphone : </Text>
                            <TextInput style={{
                                height: 40,
                                width: '85%',
                                borderColor: "#C1C1C1",
                                borderWidth: 1,
                                paddingLeft: 10,
                                marginRight: 20,
                                borderRadius: 5,
                                marginTop: 5,
                                fontSize: 17,
                                marginTop: 5
                            }}
                                placeholder="+212635698714" type="text" value={telephone} onChangeText={(text) => setTelephone(text)} />
                        </View>


                        <View style={{
                            flexDirection: 'column',
                            marginTop: 20
                        }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 17, marginRight: 50 }}>Ville : </Text>
                            <RNPickerSelect

                                onValueChange={(value) => handleCityChange(value)}
                                items={villes}
                                placeholder={{ label: "Select a city...", value: null }}
                                useNativeAndroidPickerStyle={false}
                                value={ville}
                                style={{
                                    inputIOS: {
                                        height: 40,
                                        width: '85%', // Adjust based on your layout
                                        borderColor: "#C1C1C1",
                                        borderWidth: 1,
                                        paddingLeft: 10,
                                        borderRadius: 5,
                                        fontSize: 17,
                                        color: 'black', // Text color
                                    },
                                    inputAndroid: {
                                        height: 40,
                                        width: '85%', // Adjust based on your layout
                                        borderColor: "#C1C1C1",
                                        borderWidth: 1,
                                        paddingLeft: 10,
                                        borderRadius: 5,
                                        fontSize: 17,
                                        color: 'black', // Text color
                                    },
                                    placeholder: {
                                        color: 'gray',
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 15,
                                    },
                                }}
                            />
                        </View>


                        <View style={{
                            flexDirection: 'column',
                            marginTop: 20
                        }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 17, marginRight: 50 }}>Quartier : </Text>
                            <RNPickerSelect
                                onValueChange={(value) => handleQuartierChange(value)}
                                items={quartiers}
                                placeholder={{ label: "Select a quartier...", value: null }}
                                value={quartier}
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    inputIOS: {
                                        height: 40,
                                        width: '85%', // Adjust based on your layout
                                        borderColor: "#C1C1C1",
                                        borderWidth: 1,
                                        paddingLeft: 10,
                                        borderRadius: 5,
                                        fontSize: 17,
                                        color: 'black', // Text color
                                    },
                                    inputAndroid: {
                                        height: 40,
                                        width: '85%', // Adjust based on your layout
                                        borderColor: "#C1C1C1",
                                        borderWidth: 1,
                                        paddingLeft: 10,
                                        borderRadius: 5,
                                        fontSize: 17,
                                        color: 'black', // Text color
                                    },
                                    placeholder: {
                                        color: 'gray',
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 15,
                                    },
                                }}
                            />
                        </View>








                    </View>


                </View>



            </View>





        </ScrollView>
    )
}