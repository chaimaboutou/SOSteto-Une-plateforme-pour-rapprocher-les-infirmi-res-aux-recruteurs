import { infirmiers } from './infirmiers'


// import axios from 'axios';


// export async function getInfirmierById({params}) {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/infirmiers/${params.userId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//       throw error; // Rethrow the error to be caught by the caller
//     }
//   }

//   export async function getAllInfirmiers() {
//     try {
//       const response = await fetch(`http://192.168.8.104:3000/api/infirmiers`);
//       const json = await response.json()
//       return json;
//     } catch (error) {
//       console.error('Error fetching infirmiers info:', error);
//       throw error; // Rethrow the error to be caught by the caller
//     }
//   }






export const posts = [
    {id: 1, infirmier: infirmiers[0], postOwner: 'Mohammed Boulija', ownerBio: "Infirmier Puériculteur Diplômé d'état", location: 'Rabat, Maroc', sourceImageProfile: require('../../assets/flower.jpg'), actif: 'True'},
    {id: 2, infirmier: infirmiers[1], postOwner: 'Mohammed Boulija', ownerBio: "Infirmier Puériculteur Diplômé d'état", location: 'Rabat, Maroc', sourceImageProfile:  require('../../assets/flower.jpg'), actif: 'True'},
    {id: 3, infirmier: infirmiers[2], postOwner: 'Mohammed Boulija', ownerBio: "Infirmier Puériculteur Diplômé d'état", location: 'Rabat, Maroc',  sourceImageProfile:  require('../../assets/flower.jpg'), actif: 'True'},
    {id: 4, infirmier: infirmiers[3],postOwner: 'Mohammed Boulija', ownerBio: "Infirmier Puériculteur Diplômé d'état", location: 'Rabat, Maroc', sourceImageProfile:  require('../../assets/flower.jpg'), actif: 'False'},
    {id: 5, infirmier: infirmiers[4],postOwner: 'Mohammed Boulija', ownerBio: "Infirmier Puériculteur Diplômé d'état", location: 'Rabat, Maroc', sourceImageProfile:  require('../../assets/flower.jpg'), actif: 'True'},
    {id: 6, infirmier: infirmiers[5],id_infirmier: 6,postOwner: 'Mohammed Boulija', ownerBio: "Infirmier Puériculteur Diplômé d'état", location: 'Rabat, Maroc', sourceImageProfile:  require('../../assets/flower.jpg'), actif: 'True'},
    {id: 7, infirmier: infirmiers[6],id_infirmier: 7,postOwner: 'Mohammed Boulija', ownerBio: "Infirmier Puériculteur Diplômé d'état", location: 'Rabat, Maroc', sourceImageProfile:  require('../../assets/flower.jpg'), actif: 'True'},
    {id: 8, infirmier: infirmiers[7],id_infirmier: 8,postOwner: 'Mohammed Boulija', ownerBio: "Infirmier Puériculteur Diplômé d'état", location: 'Rabat, Maroc', sourceImageProfile:  require('../../assets/flower.jpg'), actif: 'False'}

]