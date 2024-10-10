import { useNavigation } from '@react-navigation/core';


import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { PostItem } from '../components/PostItem';
import { posts } from '../data/posts';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { Button } from '../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const buttonStyles = {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 100,
    borderRadius: 4,
    marginTop: 20

};


export default function SearchScreen() {
    const { navigate } = useNavigation()
    const [villes, setVilles] = useState([]);
    const [specialities, setSpecialities] = useState([]);

    const [selectedVille, setSelectedVille] = useState(null);
    const [selectedSpecialite, setSelectedSpecialite] = useState(null);

    const [infirmiers, setInfirmiers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const fetchVilles = async () => {
            try {
                const response = await axios.get('http://192.168.58.61:3000/api/villes');
                setVilles(response.data.map(ville => ({ label: ville.nom_ville, value: ville.nom_ville, id: ville._id })));
                // console.log(villes)
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            }
        };
        const fetchSpecialities = async () => {
            try {
                const response2 = await axios.get('http://192.168.58.61:3000/api/specialites');
                setSpecialities(response2.data.map(specialite => ({ label: specialite.nom_specialite, value: specialite.nom_specialite })));
                // console.log(specialities)
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            }
        };
        const fetchInfermiers = async () => {
            try {
                const response3 = await axios.get('http://192.168.58.61:3000/api/infirmiers');
                setInfirmiers(response3.data); // Set infirmiers to the data array
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch infirmiers:", error);
            }
        };

        fetchSpecialities()
        fetchVilles();
        fetchInfermiers();
    }, []);



    const handleCityChange = async (value) => {
        setSelectedVille(value);
    };



    const handleRecherche = async () => {
        try {
            // Perform the API call and await its response
            const response = await axios.post('http://192.168.58.61:3000/api/infirmiers/filtreByVilleSpe', {
                ville: selectedVille,
                specialite: selectedSpecialite,
            });

            // Assuming the response contains the data of infirmiers
            const infirmiersData = response.data;
            setInfirmiers(infirmiersData)


        } catch (error) {
            console.error("Failed to fetch infirmiers:", error);
            // Handle error scenario (maybe alert the user that fetching data failed)
        }
    };


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={{ backgroundColor: '#84c7c0', height: 280, marginLeft: 0 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', paddingTop: 20, width: 190, marginLeft: 15 }}>Filtrer</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', marginLeft: 15 }}>
                    Faîte une recherche personnalisée
                </Text>
                <View style={{ marginTop: 10, flexDirection: 'row', marginLeft: 15 }}>
                    <View style={{ flexDirection: 'column', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', paddingBottom: 10 }}>Ville</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedVille(value)}
                            items={villes}
                            placeholder={{ label: "Ville...", value: null }}
                            style={pickerSelectStyles}
                            value={selectedVille}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', paddingBottom: 10 }}>Spécialités</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedSpecialite(value)}
                            items={specialities}
                            placeholder={{ label: "Spécialité...", value: null }}

                            style={pickerSelectStyles}
                            value={selectedSpecialite}
                        />
                    </View>


                </View>

                <TouchableOpacity style={styles.submitButton} onPress={(handleRecherche)}>
                    <Ionicons name="search-outline" size={20} color='#C1C1C1' />
                    <Text style={styles.submitButtonText}>Rechercher </Text>
                </TouchableOpacity>

            </View >

            <View >
                {infirmiers.length === 0 ? (
                    <Text style={{ fontSize: 15, color: 'black', paddingTop: 20, marginLeft: 15 }}>No infirmiers sont trouvés </Text>
                ) : (
                    <FlatList
                        data={infirmiers}
                        renderItem={({ item }) => <PostItem item={item} />}
                        keyExtractor={(item) => item._id.toString()}
                    />
                )}
            </View>



        </ScrollView>

    )
}

const styles = StyleSheet.create({
    submitButton: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 30,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        width: 320,
        paddingHorizontal: 50,
        marginTop: 5,

        // alignItems: 'center',
    },
    submitButtonText: {
        color: '#C1C1C1',
        fontSize: 14,
        textAlign: 'center'
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 10,
        width: 170,
        marginRight: 5,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputAndroid: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 10,
        width: 170,
        marginBottom: 10,
        borderRadius: 5,
    },
});