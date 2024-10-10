import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Demande } from '../components/Demande';
import RNPickerSelect from 'react-native-picker-select';

export default function ToutesMesDemandesScreen() {
    const {
        params: { mesDemandes },
    } = useRoute();

    const [sortByOldest, setSortByOldest] = useState(true);
    const [sortedDemandes, setSortedDemandes] = useState([]);

    useEffect(() => {
        // Sort demands based on the current sorting order
        const sorted = mesDemandes.sort((a, b) => {
            if (sortByOldest) {
                return new Date(a.date) - new Date(b.date);
            } else {
                return new Date(b.date) - new Date(a.date);
            }
        });
        setSortedDemandes([...sorted]); // Create a new array to trigger re-render
    }, [mesDemandes, sortByOldest]);

    const toggleSortOrder = () => {
        setSortByOldest((prev) => !prev);
    };

    return (
        <ScrollView>
            <View style={{ marginLeft: 5 }}>
                <View style={{ marginLeft: 10, marginTop: 10, borderBottomColor: "black", marginBottom: 10 }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            marginTop: 10,
                            color: "#7BBCB5",
                        }}
                    >
                        Sort By
                    </Text>
                    <View
                        style={{
                            borderColor: "#C1C1C1",
                            borderWidth: 1,
                            marginRight: 20,
                            paddingLeft: 15,
                            width: 350,
                            color: "gray",
                            marginTop: 10,
                            paddingRight: 10,
                            textAlignVertical: "center",
                            borderRadius: 5,
                            fontSize: 17,
                        }}
                    >
                        <RNPickerSelect
                            placeholder={{ label: "Choose an option", value: null }}
                            onValueChange={(value) => setSortByOldest(value === 'oldest')}
                            items={[
                                { label: 'Oldest', value: 'oldest' },
                                { label: 'Latest', value: 'latest' },
                            ]}
                            value={sortByOldest ? 'oldest' : 'latest'}
                            style={{
                                inputAndroid: {
                                    color: "grey",
                                },
                                inputAndroidContainer: {
                                    borderBottomColor: sortByOldest ? 'blue' : 'red',
                                    borderBottomWidth: 2,
                                }
                            }}
                        />
                    </View>
                </View>

                <FlatList
                    data={sortedDemandes}
                    renderItem={({ item }) => <Demande item={item} />}
                    keyExtractor={(item) => item._id.toString()}
                    ListEmptyComponent={<Text>No data found.</Text>}
                />
            </View>
        </ScrollView>
    );
}
