import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './DetailsOfUser.scss'

import { json, useLoaderData, Link } from 'react-router-dom';
import { getAllDemandesOfUser, getInfirmierById, getUserById, updateUserDetails } from '../../data/users';
import { getQuartiersFromVilleName, getVilles } from '../../data/villesetquartiers';



export const loader = async ({ params }) => {
  const [data, villes, demandes] = await Promise.all([
    getUserById({ params }),
    getVilles(),
    getAllDemandesOfUser({ params })

  ]);
  console.log(demandes)
  return json({ data, villes, demandes });
}


const DetailsOfUser = () => {
  const { data, villes, demandes } = useLoaderData();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(data);
  const [quartiers, setQuartiers] = useState([]);
  const [specialite, setSpecialite] = useState([])
  const [soins, setSoins] = useState([])
  useEffect(() => {
    const fetchQuartiers = async () => {
      try {
        const quartiersByVilles = await getQuartiersFromVilleName(formData.ville);
        setQuartiers(quartiersByVilles);
        console.log(quartiersByVilles)
      } catch (error) {
        console.error('Error fetching quartiers:', error);
      }
    };
    const fetchInfirmiers = async () => {
      try {
        const infirmier = await getInfirmierById(formData._id);
        setSpecialite(infirmier.specialite)
        setSoins(infirmier.soins)
        console.log(infirmier)
      } catch (error) {
        console.error('Error fetching infirmier:', error);
      }
    };

    if (formData.ville) {
      fetchQuartiers();
    }
    if (formData.role === 'infirmier') {
      fetchInfirmiers()

    }
  }, [formData.ville, formData._id, formData.role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleEdit = (event) => {
    event.preventDefault();
    setEditMode(true);
  };
  const handleSave = (event) => {
    console.log(formData)
    updateUserDetails(formData, data._id)
    setEditMode(false);
    event.preventDefault();


  };

  return (
    <div className="usersPage">
      <Sidebar />
      <div className='usersContainer'>
        <Navbar />
        <div className="usersList">
          <h3>Profil utilisateur n°: {formData._id}</h3>
          <section>
            <div className="userProfile">
                  <div className="box2">
                    <form>
                      <div className="infoperso">
                        <p className="infoItem">
                          <label htmlFor="nom">Nom:</label>
                          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleInputChange} disabled={!editMode} />
                        </p>
                        <p className="infoItem">
                          <label htmlFor="prenom">Prénom:</label>
                          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleInputChange} disabled={!editMode} />
                        </p>
                        <p className="infoItem">
                          <label htmlFor="telephone">Telephone:</label>
                          <input type="text" id="telephone" name="telephone" value={formData.telephone} onChange={handleInputChange} disabled={!editMode} />
                        </p>
                      </div>
                      <div className="infoville">
                        <p className="infoItem">
                          <label htmlFor="ville">Ville:</label>
                          <select id="ville" name="ville" value={formData.ville} onChange={handleInputChange} disabled={!editMode}>
                          {villes.map((ville) => (
                            <option key={ville._id} value={ville.nom_ville}>{ville.nom_ville}</option>
                          ))}
                          </select>
                        </p>
                        <p className="infoItem">
                          <label htmlFor="quartier">Quartier:</label>
                          <select id="quartier" name="quartier" value={formData.quartier} onChange={handleInputChange} disabled={!editMode}>
                            { quartiers.map((quartier) => (
                              <option key={quartier._id} value={quartier.nom_quartier}>{quartier.nom_quartier}</option>
                            ))}
                          </select>
                        </p>
                      </div>
                      
                      <div className="infologin">
                        <p className="infoItem">
                          <label htmlFor="role">Role:</label>
                          <input type="text" id="role" name="role" value={formData.role} onChange={handleInputChange} disabled={!editMode} />
                        </p>
                        <p className="infoItem">
                          <label htmlFor="email">Email:</label>
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!editMode} />
                        </p>
                        <p className="infoItem">
                          <label htmlFor="mdp">Mot de passe:</label>
                          <input type="password" id="mdp" name="mdp" value={formData.mdp} onChange={handleInputChange} disabled={!editMode} />
                        </p>
                        <p className="infoItem">
                          <label htmlFor="estConnecte">Connecté:</label>
                          <input type="text" id="estConnecte" name="estConnecte" value={formData.estConnecte} onChange={handleInputChange} disabled={!editMode} />
                        </p>
                      </div>
                      {!editMode ?
                        <button onClick={handleEdit}>Edit</button>
                        : <button onClick={handleSave}>Save</button>
                      }
                    </form>
                  </div>
                </div>
                { formData.role === 'recruteur' ?(<div className="demandes">
                  <h3>Demandes</h3>
                  <div className="userProfile">
                  <table>
                      <thead>
                          <tr>
                            <th>Id</th>
                            <th>Intitulé</th>
                            <th>Objet</th>
                            <th>Détails</th>
                          </tr>
                      </thead>
                      <tbody>
                          { demandes && demandes.map((demande, rowIdx) => (
                            <tr key={demande._id}>
                              <td>{demande._id}</td>
                              <td>{demande.titre}</td>
                              <td>{demande.objet}</td>
                              <Link to={`/demandes/${demande._id}`}>
                                <td>Voir détail</td>
                              </Link>
                              {' '}
                            </tr>
                          ))}
                        </tbody>
                    </table>
                    </div>
                </div>): null}
                

          </section>
          {
            formData.role === 'infirmier' ? (
            
            <section>
              <h3>Spécialité et Soins</h3>
              <div className="userProfile">
                    <div className="box1">
                        <p className="infoInfirmier">
                            <p className='specialite'>Spécialités :</p>{specialite.length > 0 ?
                                <label htmlFor='specialite'>{specialite.join(', ')}</label> :
                                <span>Pas de spécialités trouvées,</span>
                            }
                        </p>
                        <p className="infoInfirmier">
                        <p className='soins'>Soins :</p>{soins.length > 0 ?
                                <label htmlFor='soins'>{soins.join(', ')}</label> :
                                <span>Pas de soins trouvés</span>
                            }
                        </p>
                    </div>
                      
                    </div>
                  
            </section>
            ) : null
          }



        </div>
      </div>
    </div>
  );
};


export default DetailsOfUser;