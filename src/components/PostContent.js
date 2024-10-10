import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export const PostContent = ({ item }) => {
    return (
        <View style={{
            flexDirection: 'row',
            marginLeft: 0,
            marginTop: 1,
            backgroundColor: 'white'

        }}>
            <Image style={{
                resizeMode: 'cover',
                width: 45,
                height: 45,
                borderRadius: 50,
                marginRight: 10,
            }} source={require('../../assets/flower.jpg')} />
            <View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>{item.prenom} {item.nom}</Text>

                    <Ionicons style={{
                        flexDirection: 'row',
                        marginLeft: 10,
                        marginTop: 5
                    }} name="ellipse-sharp" size={10} color={item.status == 'true' ? "#26ea01" : "#959595"} />

                </View>

                <Text style={{
                    fontSize: 14
                }}>{item.email}</Text>
                <Text style={{
                    fontSize: 14,
                    color: '#808080',
                    paddingBottom: 10

                }}>{item.role}
                </Text>

            </View>



        </View>

    )
}