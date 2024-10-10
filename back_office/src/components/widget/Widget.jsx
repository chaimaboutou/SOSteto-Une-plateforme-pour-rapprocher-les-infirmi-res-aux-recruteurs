import './widget.scss';
import { useEffect, useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Widget = ({ type }) => {
  let data;

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDemandes, setTotalDemandes] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/count");
        let data = await response.json();
        const nombreUtilisateurs = data.reduce((nbr1, nbr2) => nbr1 + nbr2, 0);
        console.log(nombreUtilisateurs)
        setTotalUsers(nombreUtilisateurs);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
    const fetchNombreDemandes = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/demandes/count");
          let data = await response.json();
          console.log('data', data)
          setTotalDemandes(data);
        } catch (error) {
          console.error('Error fetching user count:', error);
        }
      };

    fetchData();
    fetchNombreDemandes()
    setIsLoading(false)
  }, [totalDemandes]);
  console.log('total demandes',totalDemandes )
  

  switch (type) {
    case 'USERS':
      data = {
        title: 'USERS',
        icon: <PersonOutlinedIcon className='icon' />,
        content: `Total utilisateurs: ${totalUsers}`, 
      }
      break;
    case 'DEMANDES':
      data = {
        title: 'DEMANDES',
        icon: <ArticleIcon className='icon' />,
        content: `Total demandes: ${totalDemandes} `, // Display dynamic data here
      }
      break;
    default:
      break;
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log(data)
  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        
        
      </div>
      <div className="right">
        <span className='icon'>{data.icon}</span>
        <span className='counter'>{data.content}</span>
      </div>
    </div>
  )
}

export default Widget;
