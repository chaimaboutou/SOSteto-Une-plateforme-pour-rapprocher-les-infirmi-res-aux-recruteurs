import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Pressable, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

export const Demande = ({ item }) => {
    const [demandeDetail, setDemandeDetail] = useState([]);
    const [soins, setSoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDemandeData = async () => {
        console.log(item)
        try {
            const response = await axios.get(`http://192.168.58.61:3000/api/demandes/${item._id}`);
            setDemandeDetail(response.data);

        } catch (error) {
            console.error("Failed to fetch infermier:", error);
        }
    };

    const fetchSoins = async () => {
        try {
            const soinsResponse = await axios.get(`http://192.168.58.61:3000/api/demandes/${item._id}/soins`);
            setSoins(soinsResponse.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch soins:", error);
            return [];
        }
    };

    useEffect(() => {
        fetchDemandeData();
        fetchSoins();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ borderBottomColor: '#e6e6e6', borderBottomWidth: 5, paddingBottom: 20 }}>
            <View style={{ marginLeft: 10, marginTop: 20 }}>
                <Text>Votre demande du {item.date}</Text>
                <Text style={{ paddingTop: 10, fontWeight: 'bold' }}>{demandeDetail.titre}</Text>
                <Text style={{ paddingTop: 10, fontWeight: 'bold' }}>{demandeDetail.objet}</Text>
                {/* <Text style={{ paddingTop: 15 }}>{item.corps}</Text> */}
                <View>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Prix par jour :</Text>
                        <Text style={{ paddingLeft: 10 }}>{item.detail.prix_par_jour.min} dhs - {item.detail.prix_par_jour.max} dhs </Text>
                    </View> */}

                    <Text style={{ paddingTop: 5 }}>{demandeDetail.ville}, {demandeDetail.quartier}</Text>
                    <Text style={{ paddingTop: 5, fontWeight: 'bold' }}>Actes et Soins</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        {soins.map(({ _id, nom_soin }) => (
                            <Text style={{ paddingHorizontal: 10, padding: 5, marginRight: 10, borderWidth: 1, borderRadius: 10, backgroundColor: '#84c7c0', overflow: 'hidden', color: 'white', borderColor: 'white' }} key={_id}>{nom_soin}</Text>
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Date :</Text>
                        <Text style={{ paddingLeft: 10 }}>{demandeDetail.date}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                        <Text style={{ fontWeight: 'bold' }} >Horaire :</Text>
                        <Text style={{ paddingLeft: 10 }}>{demandeDetail.heure_debut} - {demandeDetail.heure_fin}</Text>
                    </View>



                </View>
            </View>

        </View >

    )
}