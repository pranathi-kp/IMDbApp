import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { addMovieAsync, postedMovie } from '../features/MoviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdminForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { islogin, isAdmin } = useSelector((store) => store.modal);
  const movies = useSelector((store) => store.movie.movies);
  const users = useSelector((store)=>store.user.users);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    team: '',
    imageUrl: '',
  });

  const [gennotif, setGenNotif] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = movies.some((u) => u.title === formData.title);
    if (found) {
      alert('Movie Already Exists');
    } else {
      const arr = users[0].filter((u)=>u.favgenre===formData.genre);
      
      dispatch(addMovieAsync({...formData, mail:arr}));
      
      dispatch(postedMovie());
      setFormData({
        title: '',
        description: '',
        genre: '',
        team: '',
        imageUrl: '',
      });
    }
  };
  if (!isAdmin) {
    return <h1> Only Admins can view this page</h1>;
  }

  return (
    islogin &&
    isAdmin && (
      <div className='admin-form-container'>
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <label>
                Title:
                <input type='text' name='title' value={formData.title} onChange={handleChange} required />
              </label>
            </div>
            <div className='input-container'>
              <label>
                Description:
                <textarea name='description' value={formData.description} onChange={handleChange} required />
              </label>
            </div>
            <div className='input-container'>
              <label>
                Genre:
                <input type='text' name='genre' value={formData.genre} onChange={handleChange} required />
              </label>
            </div>
            <div className='input-container'>
              <label>
                Team:
                <input type='text' name='team' value={formData.team} onChange={handleChange} required />
              </label>
            </div>
            <div className='input-container'>
              <label>
                Image URL:
                <input type='text' name='imageUrl' value={formData.imageUrl} onChange={handleChange} required/>
              </label>
            </div>
            <div className='button-container'>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
        <div className='back-button-container'>
          <button onClick={() => navigate('/home')}>Back to Home</button>
        </div>
      </div>
    )
  );
};

export default AdminForm;
