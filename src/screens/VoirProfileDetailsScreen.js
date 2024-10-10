import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable, ImageBackground, Switch, ScrollView, ActivityIndicator } from 'react-native';
import { PostContent } from '../components/PostContent';
import { PostItem } from '../components/PostItem';
import { posts } from '../data/posts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default function VoirProfileDetailsScreen() {
    const {
        params: { item },
    } = useRoute();

    const [infirmierLS, setInfirmierLS] = React.useState(null);
    const [infirmier, setInfirmier] = React.useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // console.log(item)
    useEffect(() => {


        const fetchInfirmierData = async () => {
            try {
                const response = await axios.get(`http://192.168.58.61:3000/api/users/${item._id}`);
                setInfirmier(response.data)
            } catch (error) {
                console.error("Failed to fetch infermier:", error);
            }
        };


        const fetchInfirmierLangSoinSpe = async () => {
            try {
                const response = await axios.get(`http://192.168.58.61:3000/api/infirmiers/${item._id}`);
                setInfirmierLS(response.data)
            } catch (error) {
                console.error("Failed to fetch infermier:", error);
            }
            finally {
                setIsLoading(false); // Update loading state when fetching is finished
            }
        };
        fetchInfirmierData();
        fetchInfirmierLangSoinSpe();

    }, []);
    // console.log(infirmier);
    // console.log(infirmierLS);

    // const [isEnabled, setIsEnabled] = React.useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    return (
        <ScrollView testID='VoirProfileDetailsScreen' >
            <ImageBackground
                source={require('./banniere.png')}
                style={{
                    position: 'relative',
                    backgroundColor: '#C1C1C1',
                    width: '100%',
                    resizeMode: "cover",
                    height: 100,
                    marginLeft: 10,
                }}>

                <Image source={require('./avatar.png')} style={{
                    resizeMode: 'cover',
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginLeft: 10,
                    marginTop: 50,
                    borderWidth: 3,
                    borderColor: 'white'

                }} />
            </ImageBackground>

            <View style={{ marginTop: 55, marginLeft: 15 }}>
                <View style={{

                    paddingBottom: 10,
                    borderBottomColor: '#E6E6E6',
                    borderBottomWidth: 5,

                }}>

                    <View style={{ marginLeft: 10 }}>
                        <View style={{
                            flexDirection: 'row',

                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 25
                            }}>{infirmier.prenom} {infirmier.nom}</Text>

                            <Ionicons style={{
                                flexDirection: 'row',
                                marginLeft: 10,
                                marginTop: 5
                            }} name="ellipse-sharp" size={10} color={infirmier.estConnecte == 'true' ? "#26ea01" : "#959595"} />
                        </View>
                        <Text style={{
                            fontSize: 17,
                            marginTop: 5,
                        }}>{infirmierLS.specialite.join(', ')}</Text>

                        <Text style={{
                            fontSize: 17,
                            marginTop: 5,
                        }}>{infirmier.email}</Text>


                        <Text style={{
                            fontSize: 17,
                            marginTop: 5,

                        }}>{infirmier.telephone}</Text>
                        <Text style={{
                            fontSize: 17,
                            color: '#808080',
                            paddingBottom: 10,
                            marginTop: 5,

                        }}>{infirmier.ville}, {infirmier.quartier}</Text>



                    </View>
                </View>


                <View style={{
                    height: 130,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderBottomColor: '#E6E6E6',
                    borderBottomWidth: 5,
                }}>
                    <View style={{ marginLeft: 10 }} >
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Soins et Actes</Text>
                        <Text style={{
                            paddingTop: 10,
                            fontSize: 17
                        }}>{infirmierLS.soins.join(', ')}</Text>


                    </View>


                </View>

                <View style={{
                    height: 130,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderBottomColor: '#E6E6E6',
                    borderBottomWidth: 5,
                }}>
                    <View style={{ marginLeft: 10 }} >
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Langues parlées</Text>
                        <Text style={{
                            paddingTop: 10,
                            fontSize: 17
                        }}>{infirmierLS.langue_parlee.join(', ')}</Text>

                    </View>


                </View>

                <View style={{
                    height: 130,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderBottomColor: '#E6E6E6',
                    borderBottomWidth: 5,
                }}>
                    <View style={{ marginLeft: 10 }} >
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>A propos</Text>
                        <Text style={{
                            paddingTop: 10,
                            fontSize: 14
                        }}></Text>


                    </View>


                </View>
                <View style={{
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderBottomColor: '#E6E6E6',
                    borderBottomWidth: 5,
                }}>
                    <View style={{ marginLeft: 10 }} >
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Disponibilité</Text>
                        <View>
                            <Text>Date</Text>



                        </View>
                        <View>
                            <Text>Horaire</Text>
                            <View>
                                <Text>De</Text>
                                <Text>A</Text>
                            </View>

                        </View>


                        <Text style={{
                            paddingTop: 10,
                            fontSize: 14
                        }}></Text>
                        {/* {item.infirmier.apropos} */}

                    </View>


                </View>




                <View style={{
                    height: 130,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderBottomColor: '#E6E6E6',
                    borderBottomWidth: 5,
                }}>
                    <View style={{ marginLeft: 10 }} >
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Diplômes et Formations</Text>
                        <Text style={{
                            paddingTop: 10,
                            fontSize: 14
                        }}></Text>

                    </View>


                </View>

                <View style={{
                    height: 130,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderBottomColor: '#E6E6E6',
                    borderBottomWidth: 5,
                }}>
                    <View style={{ marginLeft: 10 }} >
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Commentaires</Text>
                        <Text style={{
                            paddingTop: 10,
                            fontSize: 14
                        }}></Text>

                    </View>


                </View>





            </View>





        </ScrollView>
    )
}