import React, { useState } from 'react';

const AdminPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tutorAccess, setTutorAccess] = useState(false);
  const [learnerAccess, setLearnerAccess] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTutorAccessChange = (event) => {
    setTutorAccess(event.target.checked);
  };

  const handleLearnerAccessChange = (event) => {
    setLearnerAccess(event.target.checked);
  };

  const handleDeleteAccount = async () => {
    // Delete account logic here
    try {
        // Make a DELETE request to the server to delete the account
        const response = await fetch(`/api/admins/${adminId}`, {
          method: 'DELETE'
        });
    
        if (response.ok) {
          // Display a success message to the user
          alert('Account deleted successfully');
        } else {
          // Handle the error response
          const error = await response.json();
          alert(`Error deleting account: ${error.message}`);
        }
      } catch (error) {
        // Handle any network or server errors
        alert(`Error deleting account: ${error.message}`);
      }
  };

  const handleArchiveAccount = async () => {
    // Archive account logic here
    try {
        // Make a PUT request to the server to update the account status to "archived"
        const response = await fetch(`/api/admins/${adminId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'archived'
          })
        });
    
        if (response.ok) {
          // Display a success message to the user
          alert('Account archived successfully');
        } else {
          // Handle the error response
          const error = await response.json();
          alert(`Error archiving account: ${error.message}`);
        }
      } catch (error) {
        // Handle any network or server errors
        alert(`Error archiving account: ${error.message}`);
      }
  };

  return (
    <div>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={handleLastNameChange} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Tutor Access:
        <input type="checkbox" checked={tutorAccess} onChange={handleTutorAccessChange} />
      </label>
      <label>
        Learner Access:
        <input type="checkbox" checked={learnerAccess} onChange={handleLearnerAccessChange} />
      </label>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <button onClick={handleArchiveAccount}>Archive Account</button>
    </div>
  );
};

export default AdminPage;