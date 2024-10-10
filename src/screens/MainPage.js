// import * as React from 'react';
// import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import Header from '../components/Header';
// import RNPickerSelect from 'react-native-picker-select';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
// import FooterMain from '../components/FooterMain';

// import { villes } from '../data/villes';
// import { specialites } from '../data/specialites';

// export default function MainPage() {
//     const [selectedVille, setSelectedVille] = React.useState(null);
//     const [selectedSpecialite, setSelectedSpecialite] = React.useState(null);

//     return (
//         <View style={styles.container}>
//             <Header />
//             <ScrollView
//                 style={styles.scrollContainer}
//             >
//                 <View style={styles.additionalSection}>
//                     <Text style={styles.sectionText}>Trouver votre infirmier(ère) avec un seul click</Text>
//                     <View style={styles.formContainer}>
//                         <RNPickerSelect
//                             placeholder={{ label: 'Ville', value: null }}
//                             items={villes ? villes.map((ville) => ({ label: ville.name, value: ville.id })) : []}
//                             onValueChange={(value) => setSelectedVille(value)}
//                             style={pickerSelectStyles}
//                             value={selectedVille}
//                         />
//                         <RNPickerSelect
//                             placeholder={{ label: 'Spécialité', value: null }}
//                             items={specialites ? specialites.map((specialite) => ({ label: specialite.name, value: specialite.id })) : []}
//                             onValueChange={(value) => setSelectedSpecialite(value)}
//                             style={pickerSelectStyles}
//                             value={selectedSpecialite}
//                         />
//                         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OtherPage')}>
//                             <Text style={styles.buttonText}>Urgent !</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.submitButton} onPress={() => console.log('Form submitted')}>
//                             <Text style={styles.submitButtonText}>Rechercher </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={styles.imageContainer}>
//                     <Image
//                         source={require('../assets/image_png (2).png')}
//                         style={styles.image}
//                     />
//                 </View>
//                 <View style={styles.additionalSection}>
//                     <Text style={styles.sectionText}>Vous cherchez une offre de travail qui convient à votre disponibilité et à vos attentes salariales ?</Text>
//                     <Text style={styles.sectionText}>Vous recherchez un(e) infirmier(ère) ?</Text>
//                     <Text style={styles.sectionText}>SOSteto est votre solution parfaite !</Text>
//                 </View>
//                 <View style={styles.Section2}>
//                     <Icon name="security" size={55} color="#8CD2CA" />
//                     <Text style={styles.sectionText2}>Protection des données personnelles.</Text>
//                     <Text style={styles.sectionText22}>   SOSteto est 100% conforme en matière de protection des données à caractère personnels de santé et utilise les standards technologiques les plus sécurisés. </Text>
//                 </View>
//                 <View style={styles.imageContainer}>
//                     <Image
//                         source={require('../assets/20200527_HT_Web_Nurses-Rugged-Tech.jpg')}
//                         style={styles.image}
//                     />
//                 </View>
//                 <View style={styles.additionalSection}>
//                     <Icon1 name="cursor-default-click" size={55} color="#fff" />
//                     <Text style={styles.sectionText}>ne perdez pas de temps, créez un compte sur Sosteto et trouvez l'infirmière dont vous avez besoin à tout moment et n'importe où</Text>
//                 </View>
//                 <FooterMain />
//             </ScrollView>

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     scrollContainer: {
//         flex: 1,
//         marginTop: 0,
//     },

//     additionalSection: {
//         backgroundColor: '#8CD2CA',
//         padding: 18,
//         alignItems: 'center',
//     },
//     sectionText: {
//         color: '#fff',
//         fontSize: 20,
//         marginBottom: 0,
//         marginTop: 0,
//         padding: 10,
//     },
//     formContainer: {
//         width: '90%',
//     },
//     button: {
//         backgroundColor: '#fff',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginBottom: 10,
//         width: 90,
//     },
//     buttonText: {
//         color: 'red',
//         fontSize: 16,
//     },
//     submitButton: {
//         backgroundColor: '#fff',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     submitButtonText: {
//         color: 'black',
//         fontSize: 16,
//     },
//     imageContainer: {
//         alignItems: 'center',
//         marginTop: 0,
//     },
//     image: {

//         width: '100%',
//         height: 350,
//         resizeMode: 'cover',
//     },
//     Section2: {
//         backgroundColor: '#fff',
//         padding: 10,
//         alignItems: 'center',
//     },
//     sectionText2: {
//         fontWeight: 'bold',
//         color: 'black',
//         fontSize: 20,
//         marginBottom: 0,
//         marginTop: 0,
//         padding: 10,
//     },
//     sectionText22: {
//         color: 'black',
//         fontSize: 17,
//         marginBottom: 0,
//         marginTop: 0,
//         padding: 10,
//     },
//     icon: {
//         color: '#fff',
//         fontSize: 24,
//     },
// });

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         backgroundColor: '#fff',
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         marginBottom: 10,
//         borderRadius: 5,
//     },
//     inputAndroid: {
//         backgroundColor: '#fff',
//         paddingVertical: 8,
//         paddingHorizontal: 10,
//         marginBottom: 10,
//         borderRadius: 5,
//     },
// });
