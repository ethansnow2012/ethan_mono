import React from 'react';
import { useUser } from '@/hook/myContext';


function UserProfile() {
  const { user, setUser } = useUser();

  const updateUserName = () => {
    setUser({ ...user, name: 'Jane Smith' });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={updateUserName}>Change Name</button>
    </div>
  );
}

export default UserProfile;