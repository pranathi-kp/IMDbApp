import '../App.css';
import React , {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchMovie, filterByGenre } from '../features/MoviesSlice';
import { FaRegCircleUser } from "react-icons/fa6";
import { logOut } from '../features/ModalSlice';
import UserProfile from './UserProfile';
const Navbar = () => {
    const dispatch = useDispatch();
    const  isLogin  = useSelector((store)=>store.modal.islogin);
    const  isAdmin  = useSelector((store)=>store.modal.isAdmin);
    const profDetails = useSelector((store) => store.user.profile);
    const [showProfile, setShowProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [genre, setgenre] = useState('');
    const navigate = useNavigate();
    const handleSearch = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          
          dispatch(searchMovie(searchQuery));
          console.log("Perform search with:", searchQuery);
        }
      };
      const handleChange = (e)=>{
        setgenre(e.target.value);
          console.log(genre, "genre");
      }
      const func = (e)=>{
        if(!isLogin){
          alert("Please login/sign");
        }else{
          setShowProfile(!showProfile);
        }
        

      }
    
  return (
    <nav className="navbar">
      <p className='name' style={{marginLeft:"30px",paddingBottom:"5px",marginBottom:"15px"}}>IMDb</p>
      <ul className="nav-list" >
        {
            <div className="input-container" >
            <select 
              name="genre"
              value={genre}
              onChange={handleChange}
              required
              style={{marginLeft:"30px",marginTop:"-15px",width:"100px"}}
            >
              <option value="">Genre</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value ="Fantasy">Fantasy</option>
              <option value="Sci-fi">Sci-fi</option>
              <option value="Horror">Horror</option>
              <option value ="Fantasy">Fantasy</option>
              <option value="Comedy">Comedy</option>
              <option value ="Crime">Crime</option>
              <option value ="Romance">Romance</option>
            </select>
            </div>
        }
        <button className='btn ' onClick={() =>{if(genre===''){alert("please select genre");}else{dispatch(filterByGenre(genre));}} }>Filter</button>

      
          <input
            type="text"
            value={searchQuery}
            placeholder='Search IMDb'
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        
        
        {!isLogin && (
          <>
            <li className="nav-item">
              <NavLink className='link' to="/login" ClassName="active-link">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className='link' to="/signup" ClassName="active-link">
                Signup
              </NavLink>
            </li>
          </>
        )}

        

        {isLogin && !isAdmin && (
          <>
            <li className="nav-item">
              <button onClick={()=>{navigate('/home');dispatch(logOut()); }}> LogOut</button>
            </li>
            <li className="nav-item">
              <button onClick={()=>alert("Please Add by selecting movie from home")}> Add Review</button>
            </li>
          </>
        )}

        {isAdmin && (
          <>
          <li className="nav-item">
            <NavLink className='link' to="/adminform" activeClassName="active-link">
              Add Movie
            </NavLink>
          </li>
          <li className="nav-item">
              <button onClick={()=>{navigate('/home');dispatch(logOut()); }}> LogOut</button>
            </li>
            
          </>
          
        )}

        
        <FaRegCircleUser className='user' onClick={ func }/>
        <div className="profile-container">
          {isLogin && showProfile && <UserProfile/>}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;


