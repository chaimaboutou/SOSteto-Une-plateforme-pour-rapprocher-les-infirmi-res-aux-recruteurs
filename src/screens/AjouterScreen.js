import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  StyleSheet, ActivityIndicator
} from "react-native";
import { Alert } from 'react-native';


import Ionicons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import Filtre from "../components/Filtre";
import { useNavigation } from "@react-navigation/core";
import axios from 'axios';
import MultiSelect from 'react-native-multiple-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";


function InputWithIcon({ inputHeight, onPressIcon, iconName = "add-outline" }) {
  return (
    <TouchableOpacity
      onPress={onPressIcon}
      style={{
        position: "absolute",
        top: inputHeight / 2 - 12,
        right: 30,
        marginTop: 15,
      }}
    >
      <Ionicons name={iconName} size={24} color="grey" />
    </TouchableOpacity>
  );
}

function InfoSection({
  title,
  description,
  placeholder,
  inputHeight = 30,
  onPressIcon,
  onChangeText, // Add onChangeText prop
}) {
  return (
    <>
      <Text
        style={{
          fontSize: 17,
          fontWeight: "bold",
          marginTop: 20,
          color: "#7BBCB5",
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 14, color: "#3f4040", paddingTop: 5 }}>
        {description}
      </Text>
      <View style={{ position: "relative" }}>
        <TextInput
          style={{
            height: inputHeight + 10,
            borderColor: "#C1C1C1",
            borderWidth: 1,
            marginRight: 20,
            paddingTop: 10,
            paddingLeft: 15,
            paddingBottom: 10,
            width: 350,
            color: "gray",
            marginTop: 10,
            paddingRight: 10,
            textAlignVertical: "top",
            borderRadius: 5,
            fontSize: 14,
          }}
          placeholder={placeholder}
          multiline={true}
          onChangeText={onChangeText} // Pass onChangeText prop to TextInput
        />
        {onPressIcon && (
          <InputWithIcon inputHeight={inputHeight} onPressIcon={onPressIcon} />
        )}
      </View>
    </>
  );
}



export default function AjouterScreen({ navigation }) {
  const { navigate } = useNavigation()

  const [villes, setVilles] = useState([]);
  const [quartiers, setQuartiers] = useState([]);
  const [soins, setSoins] = useState([]);

  const [idRec, setIdRec] = useState(null);

  const [titre, setTitre] = useState(null);
  const [object, setObject] = useState(null);
  const [selectedVille, setSelectedVille] = useState(null);
  const [selectedQuartier, setSelectedQuartier] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);


  const [isLoading, setIsLoading] = useState(true);

  const [selectedSoins, setSelectedSoins] = useState([]);



  const [userDataId, setUserDataId] = useState(null);
  async function fetchDataUser() {
    try {
      const storedTokenString = await AsyncStorage.getItem("token");
      if (storedTokenString) {
        const res = await axios.post('http://192.168.58.61:3000/api/users/userdata', { token: storedTokenString });
        setUserDataId(res.data.data._id);

      } else {
        console.log("Token not found");

      }
    } catch (error) {
      console.error("Error retrieving token or user data:", error);
      setIsLoading(false); // Ensure loading is set to false on error
    }
  }





  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    fetchDataUser();
    fetchVilles();
    fetchSoinsData();

  }, []);

  const fetchVilles = async () => {
    try {
      const response = await axios.get('http://192.168.58.61:3000/api/villes');
      setVilles(response.data.map(ville => ({ label: ville.nom_ville, value: ville.nom_ville, })));
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const handleVilleChange = async (value) => {
    // console.log(value);
    setSelectedVille(value);
    try {

      const quartiersResponse = await axios.get(`http://192.168.58.61:3000/api/villes/${value}/quartiers`);
      // console.log(quartiersResponse)
      setQuartiers(quartiersResponse.data.map(quartier => ({ label: quartier.nom_quartier, value: quartier.nom_quartier, id: quartier._id })));
    } catch (error) {
      console.error("Failed to fetch city or quartiers data:", error);
    }

  };
  const fetchSoinsData = async () => {
    try {

      const response = await axios.get('http://192.168.58.61:3000/api/soins');
      setSoins(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch soins data:", error);
      setIsLoadingSoins(false);
    }
  };

  // console.log(object)

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // Format the date as needed
    return `${year}-${month}-${day}`;
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    const dateT = formatDate(date);
    setSelectedDate(dateT);



  };

  const showStartTimePicker = () => setStartTimePickerVisible(true);
  const hideStartTimePicker = () => setStartTimePickerVisible(false);

  const formattime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Pad single digit hours and minutes with leading zeros
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Format the time as needed
    return `${formattedHours}:${formattedMinutes}`;
  };


  const handleStartTimeConfirm = (time) => {
    hideStartTimePicker();
    const timeTD = formattime(time)
    setSelectedStartTime(timeTD);
  };

  const showEndTimePicker = () => setEndTimePickerVisible(true);
  const hideEndTimePicker = () => setEndTimePickerVisible(false);
  const handleEndTimeConfirm = (time) => {
    hideEndTimePicker();
    const timeTF = formattime(time)
    setSelectedEndTime(timeTF);
  };


  // console.log(userDataId)

  // console.log(titre)
  // console.log(object)

  // console.log(selectedSoins)
  // console.log(selectedVille)
  // console.log(selectedQuartier)
  // console.log(selectedDate)
  // console.log(selectedStartTime)
  // console.log(selectedEndTime)


  const submitDemande = async () => {
    try {
      const demandeResponse = await axios.post('http://192.168.58.61:3000/api/demandes', {
        id_recruteur: userDataId,
        titre: titre,
        objet: object,
        ville: selectedVille,
        quartier: selectedQuartier,
        date: selectedDate,
        heure_debut: selectedStartTime,
        heure_fin: selectedEndTime,
      });

      const demandeId = demandeResponse.data._id;
      const demandeSoinsResponse = await axios.post(`http://192.168.58.61:3000/api/demandesoins/${demandeId}`, {
        soins: selectedSoins,
      });

      if (demandeSoinsResponse.status === 201) {
        // Reset state variables
        setTitre(null);
        setObject(null);
        setSelectedVille(null);
        setSelectedQuartier(null);
        setSelectedDate(null);
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setSelectedSoins([]);

        // Show success alert
        Alert.alert('Success', 'Le demande est enregestré avec succes!', [
          {
            text: 'OK',
            onPress: () => navigate('home2'),
          },
        ]);
      } else {
        Alert.alert('Error', 'An error occurred');
      }
    } catch (error) {
      console.error("Error submitting demande:", error.message);
      Alert.alert('Error', error.message || 'An error occurred');
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
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView
        style={{
          backgroundColor: "white",
          borderColor: "#E6E6E6",
          borderWidth: 1,
        }}
      >
        <View style={{ marginTop: 15, margin: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 10 }}>
            Votre demande
          </Text>
          <InfoSection
            title="Titre"
            description="Choisissez un titre précis et court"
            placeholder="  e.g Besoin d'une infirmière pour personne âgée"
            inputHeight={50}
            onChangeText={(text) => setTitre(text)} // Pass a function to update the titre state variable
          />

          <InfoSection
            title="Description de la demande"
            description="Précisez le profil de l'infirmière recherchée ( spécialité, type de soins, sexe etc. ) et la personne à qui sont destinés les soins."
            placeholder="  e.g J'ai besoin d'une infirmière pour faire des piqures à une personne âgée..."
            inputHeight={120}
            onChangeText={(text) => setObject(text)}
          />

          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 10,
              color: "#7BBCB5",
            }}
          >
            Soins et actes
          </Text>
          <Text
            style={{
              fontSize: 15,
              // fontWeight: "bold",
              marginTop: 10,
              // color: "#7BBCB5",
            }}
          >
            Précisez les soins que vous recherchez
          </Text>
          <View
            style={{
              // borderColor: "#C1C1C1",
              // borderWidth: 1,
              marginRight: 20,
              // paddingLeft: ,
              width: 370,
              color: "gray",
              marginTop: 10,
              marginLeft: 2,
              paddingRight: 20,
              textAlignVertical: "center",
              borderRadius: 5,
              fontSize: 17,
            }}
          >
            <View style={{ marginVertical: 10 }}>
              <MultiSelect
                items={soins.map(soin => ({ id: soin._id, name: soin.nom_soin }))}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedSoins}
                selectedItems={selectedSoins}
                selectText="Choisir des soins"
                searchInputPlaceholderText="Rechercher des soins..."
                displayKey="name"
                styleMainWrapper={{
                  borderColor: "#C1C1C1",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  marginTop: 10,
                }}
                styleDropdownMenuSubsection={{
                  paddingVertical: 10,
                }}
                styleTextDropdown={{ color: "grey" }}
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 10,
              color: "#7BBCB5",
            }}
          >
            Ville
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
              placeholder={{ label: "Choisir une ville", value: null }}
              onValueChange={(value, id) => handleVilleChange(value, id)}
              items={villes}
              value={selectedVille}
              style={{
                inputAndroid: {
                  color: "grey",
                },
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 10,
              color: "#7BBCB5",
            }}
          >
            Quartier
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
              fontSize: 14,
            }}
          >
            <RNPickerSelect
              placeholder={{ label: "Choisir un quartier", value: null }}
              onValueChange={(value) => setSelectedQuartier(value)}
              items={quartiers}
              value={selectedQuartier}
              style={{
                inputAndroid: {
                  color: "grey",
                },
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 10,
                color: "#7BBCB5",
              }}
            >
              Date et horaire
            </Text>
            <Text style={{ fontSize: 14, color: "#3f4040", paddingTop: 15 }}>
              Indiquez à quelle date et horaire vous avez besoin d'un(e)
              infirmier(ère)
            </Text>
          </View>



          {/* Date Picker */}
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={{ fontSize: 17, fontWeight: "bold", color: "#84c7c0" }}>Date : </Text>
              <Ionicons name="calendar-outline" size={24} color="blue" style={{ position: "absolute", top: 30 }} />
              <Text style={{ fontSize: 16, color: "black", marginTop: 5, marginLeft: 30 }}>{selectedDate ? formatDate(selectedDate) : 'Choisir une date'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
          </View>



          {/* Start Time Picker */}
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={showStartTimePicker}>
              <Text style={{ fontSize: 17, fontWeight: "bold", color: "#84c7c0" }}>Horaire de début : </Text>
              <Ionicons name="time-outline" size={24} color="blue" style={{ position: "absolute", top: 30 }} />
              <Text style={{ fontSize: 16, color: "black", marginTop: 5, marginLeft: 30 }}>{selectedStartTime ? selectedStartTime : 'Choisir une heure'}</Text>

            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={handleStartTimeConfirm}
              onCancel={hideStartTimePicker}
            />
          </View>

          {/* End Time Picker */}
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={showEndTimePicker}>
              <Text style={{ fontSize: 17, fontWeight: "bold", color: "#84c7c0" }}>Horaire de fin :  </Text>
              <Ionicons name="time-outline" size={24} color="blue" style={{ position: "absolute", top: 30 }} />
              <Text style={{ fontSize: 16, color: "black", marginTop: 5, marginLeft: 30 }}>{selectedEndTime ? selectedEndTime : 'Choisir une heure'}</Text>

            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleEndTimeConfirm}
              onCancel={hideEndTimePicker}
            />
          </View>
          {/* <Filtre show={false} /> */}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={(submitDemande)}
            >
              <Text style={styles.searchButtonText}>Valider la demande</Text>
            </TouchableOpacity>
          </View>


        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  searchButtonText: {
    color: "black",
    fontSize: 16,
  },
});
