import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import logo from '../../assets/SOS.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='top'>
        <img className="logo" src={logo} alt='SOSteto' />
      </div>
      <div className='center'>
        <ul>
          <p className="title">MAIN MENU</p>
          <li>
            <Link to={`/`}>
              <DashboardIcon className='icon' />
              <span>Dashboard</span>
            </Link>

          </li>
          <p className="title">LISTS MENU</p>
          <li>
            <Link to={`/users`}>
              <GroupIcon className='icon' />
              <span>Users</span>
            </Link>
          </li>
         

        </ul>
      </div>
      <div className='bottom'>
        <div className='colorOptions'></div>
        <div className='colorOptions'></div>
      </div>
    </div>
  )
}

export default Sidebar