import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FooterMainPage = ({ navigation }) => {
    return (
        <View style={styles.footer}>

            <View style={styles.footerIcons}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="facebook-square" size={35} color="#8CD2CA" padding={7} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="twitter-square" size={35} color="#8CD2CA" padding={7} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="instagram" size={35} color="#8CD2CA" padding={7} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="linkedin-square" size={35} color="#8CD2CA" padding={7} />
                </TouchableOpacity>

            </View>
            <Text style={styles.footerText}>@ Copyright SOSteto.ma 2024</Text>
            <Text style={styles.footerText}>Tous les droits réservés</Text>

            <View style={styles.made}>
                <Text style={styles.footerText}>Made with</Text>
                <Icon name="heart" size={30} color="#8CD2CA" padding={7} />
                <Text style={styles.footerText}>by  Noura | Chaima | Meriem</Text>

            </View>
            <Text style={styles.footerText}>v1.0.0</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#E6E6E6',
        padding: 10,
        alignItems: 'center',
    },
    footerText: {
        color: '#000',
        fontSize: 14,
    },
    footerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // This ensures space between icons
        marginTop: 10,
        marginBottom: 10,

    },
    made: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // This ensures space between icons
        marginBottom: 10,
    }
});

export default FooterMainPage;