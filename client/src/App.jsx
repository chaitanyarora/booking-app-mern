import { Route, Routes } from 'react-router-dom';
import './App.css'
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from "./Layout.jsx"
import RegisterPage from './pages/RegisterPage.jsx';
import PlacesPage from './pages/PlacesPage.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesFormPage from './pages/PlacesFormPage.jsx';

axios.defaults.baseURL = 'http://localhost:4000'; // here 127.0.0.1 is also possible
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
    
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
