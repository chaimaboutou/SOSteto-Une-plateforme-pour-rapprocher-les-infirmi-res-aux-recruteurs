import React, {useEffect, useState} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './DetailsOfUser.scss'

import {json, useLoaderData } from 'react-router-dom';
import { getDemandeById } from '../../data/users';



export const loader = async ({params}) => {
  const [demande] = await Promise.all([
     getDemandeById({params}),
     ]);
     console.log(demande)
  return json({ demande });
}


const DetailsOfDemande = () => {
  const {demande} = useLoaderData();
  return (
    <div className="usersPage">
      <Sidebar />
      <div className='usersContainer'>
        <Navbar />
        <div className="usersList">
          <h3>Détail de la demande n°: {demande._id}</h3>
          <section>
            <div className="userProfile">
                  <div className="box1">
                  <p className='demande'>
                    <label htmlFor="demande">Intitulé:</label>
                    <p>{demande.titre}</p>
                  </p>
                  <p className='demande'>
                    <label htmlFor="demande">Objet:</label>
                    <p>{demande.objet}</p>
                  </p>
                  <p className='demande'>
                    <label htmlFor="demande">Date:</label>
                    <p>{demande.date}</p>
                  </p>
                  <p className='demande'>
                    <label htmlFor="demande">Heure de début de mission:</label>
                    <p>{demande.heure_debut}</p>
                  </p>
                  <p className='demande'>
                    <label htmlFor="demande">Heure de fin de mission:</label>
                    <p>{demande.heure_fin}</p>
                  </p>
                </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};


export default DetailsOfDemande;