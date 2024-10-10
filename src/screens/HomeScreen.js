import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { PostItem } from '../components/PostItem';
import { posts } from '../data/posts';

export default function HomeScreen() {
    const [infirmiers, setInfirmiers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://192.168.58.61:3000/api/users?role=infirmier');
                const response = await axios.get('http://192.168.58.61:3000/api/infirmiers');
                setInfirmiers(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to ensure it runs only once on component mount

    return (
        <View>
            {infirmiers.length === 0 ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={infirmiers}
                    renderItem={({ item }) => <PostItem item={item} />}
                    keyExtractor={(item) => item._id.toString()}
                />
            )}
        </View>
    );
}
