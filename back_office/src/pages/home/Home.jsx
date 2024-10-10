import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import Feature from '../../components/feature/Feature'
import UsersPieChart from "../../components/chart/Chart"


const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className='widgets'>
          <Widget type='USERS' />
          <Widget type='DEMANDES' />
        </div>
        <div className="charts">
          <div className="chart">
            <UsersPieChart/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home