import React, { useEffect, useState } from 'react';

const Header = ({ changeUser }) => {
  const [username, setUsername] = useState('Guest');


  useEffect(() => {
    const raw = localStorage.getItem('loggedInUser');
    //  console.log(JSON.parse(raw).data);
     
     
    if (raw) {
      try {
        const parsed = JSON.parse(raw).data;
        console.log(parsed.firstName);
        setUsername(parsed.name || parsed.firstName || parsed.email?.split('@')[0] || 'Guest');
      } catch (error) {
        console.error("Failed to parse loggedInUser:", error);
      }
    }
  }, []);

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '');
    changeUser('');
  };

  return (
    <div className='flex items-end justify-between' style={{ backgroundColor: 'rgb(28, 28, 28)' }}>
      <h1 className='text-2xl'>
        Hello{" "}
        <p className='text-3xl font-semibold'>
          {username} ! 👋😄
        </p>
      </h1>
      <button
        onClick={logOutUser}
        style={{ backgroundColor: "red" }}
        className='px-5 py-2 text-lg font-medium text-white rounded-sm'
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
