import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBarw from './components/NavBar';
import Home from './pages/home';
import CreateProfile from './components/profile/createProfile';
import Land from './components/land';
import AddEducation from './components/profile/addEdu';
import AddExp from './components/profile/addExp';
import AllProfile from './components/profile/allProfile';
import ProfilebyId from './components/profile/profilebyId';
import GetPost from './components/post/getPost';
import Landing from "./components/Landing";
import Login from './pages/login';
import EditExp from './components/profile/editExp';
import All from './components/profile/all';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <NavBarw />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/ho' element={<Home />} />
            <Route path="/createProfile" element={<CreateProfile />} />
            <Route path='/land' element={<Land />} />
            <Route path='/edu' element={<EditExp />} />
            <Route path='/exp' element={<AddExp />} />
            <Route path='/profile' element={<AllProfile />} />
            <Route path='/profile/:id' element={<ProfilebyId />} />
            {/* post */}
            <Route path='/post' element={<GetPost />} />
            <Route path='/all' element={<All />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
