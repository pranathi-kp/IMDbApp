
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bcrypt from 'bcryptjs';
import {loggedIn, admin} from '../features/ModalSlice';
import { addProfile } from '../features/UsersSlice';
const Login = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((store)=>store.modal.isAdmin);
    const [logindata, setlogindata] = useState({
        email:'',
        password:''
    })
    const userslist = useSelector((store)=>store.user.users);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setlogindata({
          ...logindata,
          [e.target.name]: e.target.value,
        });
      };

        

    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userslist);
    const userfound = userslist[0].findIndex((t) => t.email.toLowerCase() === logindata.email.toLowerCase());
console.log(userfound);

    if (userfound !== -1) {
        try {
            // const isPasswordCorrect = if ( )
            const isPasswordCorrect = await bcrypt.compare( logindata.password, userslist[0][userfound].password);
            console.log(userslist[0][userfound].password);
            console.log(logindata.password);
            console.log("hey")
        if (isPasswordCorrect) {
            dispatch(loggedIn());
            dispatch(addProfile(userslist[0][userfound]));
            console.log("heyyy")
        if(userslist[0][userfound].usertype==='ADMIN'){
          console.log("heyu")
            dispatch(admin());
            navigate('/home')
        }
        else{
            navigate('/home')
        }
            
        } else {
            alert("Wrong Password");
        }
        } catch (error) {
        console.error('Error checking password:', error);
        alert("An error occurred during login");
        }
    } else {
        alert("User not found. Please sign up to continue.");
    }
    };
    return ( 

        <div className='LoginMaster'>
      <div className='Login'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="email"
              placeholder='email'
              value={logindata.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder='password'
              value={logindata.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Log in</button>
          
          {/* <NavLink to='/home'><button type="submit">Log in</button></NavLink> */}
        </form>
      </div>
      <div className='already'>
        <p>Don't have an account? <NavLink to='/signup'><span>Sign Up</span></NavLink></p>
      </div>
    </div>

     );
}
 
export default Login;