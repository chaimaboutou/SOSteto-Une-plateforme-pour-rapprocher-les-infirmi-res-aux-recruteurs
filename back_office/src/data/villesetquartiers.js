import axios from 'axios';


export async function getVilles() {
    try {
      const villes = await axios.get('http://localhost:3000/api/villes');
      return villes.data
    } catch (error) {
      console.error('Error fetching villes:', error);
    }
}

export async function getQuartiersFromVilleName(nom_ville) {
    try {
      const quartiers = await axios.get(`http://localhost:3000/api/villes/${nom_ville}/quartiers`);
      return quartiers.data
    } catch (error) {
      console.error('Error fetching villes:', error);
    }
}

