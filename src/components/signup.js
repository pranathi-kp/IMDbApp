import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState} from 'react';
import bcrypt from 'bcryptjs';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAsync, addTask, addProfile } from '../features/UsersSlice';
import { openModal, admin,loggedIn } from '../features/ModalSlice';
const Signup = () => {
  const isAdmin = useSelector((store)=>store.modal.isAdmin);
  const status = useSelector((store)=>store.user.status);
    const [formData, setFormData] = useState({
      username:'',
      email:'',
      password:'',
      usertype:'',
      favgenre:''
    });
    const dispatch = useDispatch();
    const userslist = useSelector((store)=>store.user.users);
    const navigate = useNavigate();

  const handleChange = (e) => {
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if formData is defined and has an email property
    if (!formData || !formData.email) {
      alert("Email is required");
      return;
    }
  
    const found = userslist[0].some((u) => u.email.toLowerCase() === formData.email.toLowerCase());
  console.log(userslist);
    if (found) {
      alert("User Already Exists");
    } else {
      const hpass = await bcrypt.hash(formData.password, 10);
      console.log(hpass);
  
      // Update formData.password with the hashed password
      //formData.password = hpass;
  
      console.log(formData.password);
      dispatch(addUserAsync(formData));
  
      dispatch(loggedIn());
      dispatch(addProfile(formData));
      dispatch(openModal());
  
      if (formData.usertype === "ADMIN") {
        dispatch(admin());
      }
      navigate("/home");
    }
  };
  
  

  return (

    <div className='signup-container'>
<div className='LoginMaster'>
      
      <div className='Login'>
        <h2>SignUp</h2>
        <form onSubmit={handleSubmit}>

        <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              name="email"
              placeholder='Email '
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
          <select
            name="usertype"
            value={formData.usertype}
            onChange={handleChange}
            required
          >
            <option value="">Please choose one option</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          </div>
          <div className="input-container">
          <select
            name="favgenre"
            value={formData.favgenre}
            onChange={handleChange}
            required
          >
            <option value="">Please choose Favourite Genre</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value ="Fantasy">Fantasy</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Horror">Horror</option>
            <option value ="Fantasy">Fantasy</option>
            <option value="Comedy">Comedy</option>
            <option value ="Crime">Crime</option>
            <option value ="Romance">Romance</option>
            <option value ="Thriller">Thriller</option>
          </select>
          </div>

          <button type="submit">Sign Up</button>

          {/* <NavLink to='/home'><button type="submit">Sign Up</button></NavLink> */}
        </form>
      </div>
      <div className='already'>
        <p>Already have an account? <NavLink to='/login'><span>Login</span></NavLink></p>
      </div>
    </div>

    {/* <form className='signup-form' onSubmit={handleSubmit }> */}

      {/* <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <label >
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>Select an option:</label>
      <select
        name="usertype"
        value={formData.usertype}
        onChange={handleChange}
        required
      >
        <option value="">Please choose one option</option>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <button type="submit" >Submit</button>
    </form> */}

    </div>
    
  );
};

export default Signup;
