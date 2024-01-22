import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './components/signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { useEffect } from 'react';
import axios from 'axios';
import AdminForm from './components/AdminForm';
import { addTask } from './features/UsersSlice';
import { addMovie, getItems } from './features/MoviesSlice';
import Navbar from './components/Navbar';
function App() {
  const isAdmin = useSelector((store)=>store.modal.isAdmin);
  const dispatch = useDispatch();
  const urlusers = 'http://localhost:8000/users';
  const urlmovies = 'http://localhost:8001/movies';
  const {users} = useSelector((store)=>store.user);
  const  posted = useSelector((store)=>store.movie.posted);
  const movieslist = useSelector((store)=>store.movie.movies);
  useEffect(()=>{
    dispatch(getItems('random'));
    console.log("final", movieslist);
    userdata();
  }, []);
 
  const userdata = async ()=>{
    const userslistdat = await axios.get(urlusers);
   // const movieslist = await axios.get(urlmovies);
    // const userslist = await userslistdat.json();
    //const movieslist = movies;
    dispatch(addTask(userslistdat.data));
   
  }
  
 
  return (
    <div className="App">
      <Router>
      
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/adminform" element={<AdminForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
