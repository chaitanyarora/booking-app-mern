import React, { useContext } from 'react'
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from 'axios';

const AccountPage = () => {

  const { ready, user } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) { subpage = 'profile'; }

  async function logout() {
    await axios.post('/logout');
  }

  if (!ready) {
    return 'Lodaing...';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />
  }



  function linkClasses(type = null) {
    let classes = 'py-2 px-6';

    if (type === subpage) {
      classes += ' rounded-full bg-primary text-white';
    }
    return classes;
  }

  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
        <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>My Accommodations</Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'> 
          Logged in as {user.name} ({user.email})
          <br/>
          <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}
    </div>
  )
}

export default AccountPage