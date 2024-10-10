import axios from 'axios';



export async function getUsers() {
  try {
    const users = await axios.get('http://localhost:3000/api/users');
    console.log(users.data)
    return users.data
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

export async function getUserById({ params }) {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${params.userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

export async function getfullUserDetails({ params }) {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${params.userId}/details`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
export async function updateUserDetails(userData, id) {
  try {
    const response = await axios.put(`http://localhost:3000/api/users/${id}`, userData);

    return response.data;
  } catch (error) {
    console.error('Error posting user details:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

export async function deleteUserDetails(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/api/users/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error deleting user details:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

export async function getInfirmierById(id){
  try {
    const response = await axios.get(`http://localhost:3000/api/infirmiers/${id}`)
    
    return response.data;
  } catch (error) {
    console.error('Error deleting user details:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

export async function getAllDemandesOfUser({params}) {
  try{
    const response = await axios.get(`http://localhost:3000/api/users/${params.userId}/demandes`)
    console.log(response.data)
    return response.data;
  }catch(error){
    console.error('Error retrieving demandes:', error);
    throw error;
  }
}

export async function getDemandeById({params}) {
  try{
    const response = await axios.get(`http://localhost:3000/api/demandes/${params.demandeId}`)
    console.log(response.data)
    return response.data;
  }catch(error){
    console.error('Error retrieving demandes:', error);
    throw error;
  }
}


export const countDemandesByUserId = async (userId) => {
  try {
    // Count all demandes with the specified user ID
    console.log(userId)
    const demandeCount = await axios.get(`http://localhost:3000/api/demandes/${userId}/count`)
    return demandeCount.data;
  } catch (error) {
    console.error('Error retrieving count of demandes:', error);
    throw error;
  }
};

export const getRecruteursIdsFromDemandes = async () => {
  try {
    const users = await axios.get('http://localhost:3000/api/demandes/users');
    console.log(users.data)
    return users.data
  } catch (error) {
    console.error('Error fetching users:', error);
  }

}