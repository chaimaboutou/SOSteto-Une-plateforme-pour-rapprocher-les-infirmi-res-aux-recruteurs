import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLoaderData } from "react-router-dom";
import { getUsers, deleteUserDetails } from "../../data/users";
import './list.scss'

export async function loader() {
  const data = await getUsers()
  return { data }
}


const toDelete = async (e, userId) => {
  e.preventDefault();
  if (window.confirm('Are you sure you want to delete this user?')) {

    deleteUserDetails(userId);
  }
};


const List = () => {
  const { data } = useLoaderData();
  return (
    <div className="usersPage">
      <Sidebar />
      <div className='usersContainer'>
        <Navbar />
        <div className="usersList">
          <section>
            <h1>Users List</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, rowIdx) => (
                  <tr key={user._id}>
                    <td>{user.nom}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Link to={`/users/${user._id}`}>
                        <EditIcon className='iconEdit' />
                      </Link>
                      {' '}
                      <a
                        href="#"
                        onClick={(e) => {
                          toDelete(e, user._id);
                        }}
                      >
                        <DeleteIcon className='iconDelete' />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

        </div>
      </div>
    </div>
  );
};


export default List;