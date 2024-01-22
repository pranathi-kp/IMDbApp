import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {changeflag, searchMovie, filterByGenre, addReviewAsync, handleReviewClick} from '../features/MoviesSlice';
import ReviewForm from "./ReviewForm";
const Home = () => {

    
  const {movies,foundmovie, filteredmovies, reviewflag, search, filter} = useSelector((store) => store.movie);
  
  const isLogin = useSelector((store) => store.modal.islogin);
  const isAdmin = useSelector((store)=> store.modal.isAdmin);
  const profDetails = useSelector((store) => store.user.profile);
  const filterflag = useSelector((store)=>store.movie.filterflag);
  const dispatch = useDispatch();
 
  useEffect(()=>{
    if(search || filter)
    alert("No Matches found");
    dispatch(changeflag());
  }, [search, filter]);
  if (movies.length === 0) {
    return <h1>No Data</h1>;
  }

  console.log(reviewflag, "third");
  console.log("homecheck,", movies);
  if(isLogin && !isAdmin && reviewflag){
    return <ReviewForm/>
  }else{
    // if (search || filter){
    //   alert("no matches found");
    //   dispatch((changeflag));   
  return (
    <div>
      <h2>Movies</h2>
      <div>
        
        {foundmovie.length>0 && 
        <div className="movie-container">
            <div key={foundmovie[0].id} className="movie-card">
                <h3>{foundmovie[0].title}</h3>
              <img src={foundmovie[0].imageUrl} alt={`Image for ${foundmovie[0].title}`} />
              
              <p>{foundmovie[0].genre}</p>
              <p>{foundmovie[0].description}</p>
            </div>

        </div> 
        }

        {filteredmovies.length>0 && foundmovie.length===0 &&
                    
            <div className="movie-container">
            {filteredmovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                    <h3>{movie.title}</h3>
                <img src={movie.imageUrl} alt={`Image for ${movie.title}`} />
                
                <p>{movie.genre}</p>
                <p>{movie.description}</p>
                </div>
            ))}
            </div>
            }
        {foundmovie.length===0 && filteredmovies.length===0 &&
            
        <div className="movie-container">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => {if(!isLogin){alert("Please Login/signup to Review")}else if(isLogin && isAdmin){alert("Admins cannot add reviews")} else{dispatch(handleReviewClick({id:movie.id, name:movie.title}))}}}>
                <h3>{movie.title}</h3>
              <img src={movie.imageUrl} alt={`Image for ${movie.title}`} />
              
              <p>{movie.genre}</p>
              <p>{movie.description}</p>
            </div>
          ))}
        </div>
        }
      </div>
    </div>
  );
      }
};


export default Home;
