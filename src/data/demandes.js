import { recruteurs } from "./recruteurs"
export const demandes = [
    {
        id : 1,
        id_recruteur : recruteurs[0].id,
        objet : "Besoin d'une infirmière pour personne âgée",
        corps: "J'ai besoin d'une infirmière pour faire des piqures à une personne âgée..",
        detail : {
            prix_par_jour : {
                min : 100,
                max : 200
            },
            ville : 'Rabat',
            quartier : 'Irfane',
            actes : [
                {
                    id: 1,
                    intitule : 'piqûre',
                },
                {
                    id: 2,
                    intitule: 'escarre'
                }
            ],
            date : '10/03/2024',
            horaire : {
                min : '8:00',
                max : '12:00'
            }

        }
    },
    {
        id : 2,
        id_recruteur : recruteurs[1].id,
        objet : "Besoin d'une infirmière pour personne âgée",
        corps: "J'ai besoin d'une infirmière pour faire des piqures à une personne âgée..",
        detail : {
            prix_par_jour : {
                min : 100,
                max : 200
            },
            ville : 'Rabat',
            quartier : 'Irfane',
            actes : [
                {
                    intitule : 'piqûre',
                },
                {
                    intitule: 'escarre'
                }
            ],
            date : '10/03/2024',
            horaire : {
                min : '8:00',
                max : '12:00'
            }

        }
    },
    {
        id : 3,
        id_recruteur : recruteurs[2].id,
        objet : "Besoin d'une infirmière pour personne âgée",
        corps: "J'ai besoin d'une infirmière pour faire des piqures à une personne âgée..",
        detail : {
            prix_par_jour : {
                min : 100,
                max : 200
            },
            ville : 'Rabat',
            quartier : 'Irfane',
            actes : [
                {
                    intitule : 'piqûre',
                },
                {
                    intitule: 'escarre'
                }
            ],
            date : '10/03/2024',
            horaire : {
                min : '8:00',
                max : '12:00'
            }

        }
    }
]