import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const Users = () => {
  const [profiles, setProfiles] = useState([
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = createTheme();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/profiles');
      const data = await response.json();
      setProfiles([{
        id: 1,
        name: 'Advocate Maroga',
        email: 'tboymaroga7@gmail.com',
        password: 'Zxcvbnm2023',
        role: "Tutor"
      },
        {
          id: 2,
          name: 'John Due',
          email: 'johndue@gmail.com',
          password: 'Qwerty2023',
          role: "Learner"
        },
        {
          id: 3,
          name: 'Tshegofatso Maroga',
          email: 'tboymaroga@gmail.com',
          password: 'Zxcvbnm2023',
          role: "Tutor"
        },
        {
          id: 4,
          name: 'Johns Due',
          email: 'johndue@gmail.com',
          password: 'Qwerty2023',
          role: "Learner"
        }]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error retrieving profiles:', error);
      setError('Failed to retrieve profiles');
      setIsLoading(false);
    }
  };

  const updateProfile = async (id, updatedProfile) => {
    try {
      // await fetch(`/api/profiles/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updatedProfile),
      // });
      // fetchProfiles();
      const updateProfile = profiles.map((profile) =>
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      );
      setProfiles(updateProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  const deleteProfile = async (id) => {
    try {
      // await fetch(`/api/profiles/${id}`, {
      //   method: 'DELETE',
      // });
      // fetchProfiles();
      const deleteUser = profiles.filter((profile) => profile.id !== id);
      setProfiles(deleteUser);
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleNameChange = (e, id) => {
    const updatedProfiles = profiles.map((profile) =>
      profile.id === id ? { ...profile, updatedName: e.target.value } : profile
    );
    setProfiles(updatedProfiles);
  };

  const enableEdit = (id, name) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id ? { ...profile, isEditing: true, updatedName: name } : profile
      )
    );
  };

  const submitUpdate = (id) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id
          ? { ...profile, isEditing: false, name: profile.updatedName }
          : profile
      )
    );
  };

  const cancelEdit = (id) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id ? { ...profile, isEditing: false } : profile
      )
    );
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        {profiles.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Loaded Data</p>
        )}
      </div>
    </div>

  );
};

export default Users;


{/* <div className="vh-100 d-flex justify-content-center align-items-center">
  <div className="col-md-6">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Created_At</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>jhon</td>
          <td>Jon@gmail.com</td>
          <td>10/10/1995</td>
          <td>
            <button className="btn btn-sm btn-primary">Edit</button>
          </td>
          <td>
            <button className="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>mark</td>
          <td>mark@gmail.com</td>
          <td>10/10/1996</td>
          <td>
            <button className="btn btn-sm btn-primary">Edit</button>
          </td>
          <td>
            <button className="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Raj</td>
          <td>raj@gmail.com</td>
          <td>10/10/1997</td>
          <td>
            <button className="btn btn-sm btn-primary">Edit</button>
          </td>
          <td>
            <button className="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  ); */}