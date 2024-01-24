import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import emailjs from "emailjs-com";
import axios from "axios";
const initialState = {
    movies:[],
    isLoading:false,
    status: 'idle',
    error: null,
    posted:false,
    foundmovie:[],
    filteredmovies:[],
    reviews:[],
    rstatus:'idle',
    rerror:null,
    filterflag:false,
    reviewflag:false,
    reviewid:null,
    reviewname:'',
    search:false,
    filter:false,
}

const apiUrl = process.env.REACT_APP_API_URL;

const addMovieAsync = createAsyncThunk('movie/addMovie', async (movieinfo, thunkAPI) => {
  try {
    const reqinfo = {...movieinfo};
    const toExcluse = ['mail'];
    toExcluse.forEach((key)=>delete reqinfo[key]); 
    const response = await axios.post(`${apiUrl}/movies`, reqinfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let emailsArray;
    console.log(typeof(movieinfo.mail), 'checktype');
    if (Array.isArray(movieinfo.mail)) {
      
      emailsArray = movieinfo.mail.map((item) => item.email);
    } else if (typeof movieinfo.mail === 'object') {
      
      emailsArray = [movieinfo.mail.email];
    } else {
      
      emailsArray = [];
    }

    console.log(emailsArray, 'checkagian');
    if(emailsArray.length >0){
      const emailData = {
        to_email: emailsArray,
        subject: 'New Movie added',
        message: `New Movie added of your favourite genre has been added: Title of movie is ${movieinfo.title}, here goes the description: ${movieinfo.description}`,
      };
  
      await emailjs.send(
        'service_uj9nybk',
        'template_3bnujdz',
        emailData,
        'hDjg-2tiPkTPubw79'
      );
    }
    

    return response;
  } catch (error) {
    
    console.error('Error adding movie:', error);
    throw error; 
  }
});


const addReviewAsync = createAsyncThunk('movie/addReview', async (reviewinfo, thunkAPI) => {
  try {
    const reqinfo = {...reviewinfo};
    const toExcluse = ['mail', 'name'];
    toExcluse.forEach((key)=>delete reqinfo[key]); 
    const response = await axios.post(`${apiUrl}/ratings`, reqinfo, { 
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    // const data = await response.json();
    const mail = reviewinfo.email;
    const emailData = {
      to_email: reviewinfo.mail,
      subject: `New Review Added on ${reviewinfo.name}`,
      message: `A new review has been added by you: ${reviewinfo.rating} stars - comments: ${reviewinfo.comments}`,
    };

    await emailjs.send(
      'service_uj9nybk',
      'template_3bnujdz',
      emailData,
      'hDjg-2tiPkTPubw79'
    );

    return response.data;
  } catch (error) {
    
    console.error('Error adding review:', error);
    throw error; 
};
});

const url = `${apiUrl}/movies`;
const getItems = createAsyncThunk(
  'movie/getItems',
  async (name, thunkAPI) => {
    try {
      
      const resp = await axios(url);
     
      console.log(resp.data, "data");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const moviesSlice = createSlice({
    name:'movie',
    initialState,
    reducers:{
        
        postedMovie: (state, action)=>{
            state.posted = true;
        },
        searchMovie: (state, action) => {
            console.log(state.movies);
          
            
            if (Array.isArray(state.movies)) {
              state.foundmovie = state.movies.filter((item) => {
                
                if (item && item.title) {
                  return item.title.toLowerCase() === action.payload.toLowerCase();
                }
                return false;
              });
              if(state.foundmovie.length===0){
                state.search = true;
              }
            }
          
            console.log(action.payload);
            console.log(state.movies);
          },
        filterByGenre: (state, action) => {
          console.log(action.payload);
          state.filterflag= true;
          if (Array.isArray(state.movies)) {
              state.filteredmovies = state.movies.filter((item) => {
                  if (item && item.genre) {
                      return item.genre.toLowerCase() === action.payload.toLowerCase();
                  }

                  return false;
              });
              if(state.filteredmovies.length===0){
                state.filter = true;
              }
              console.log("filter", state.filter);
              
          }
          console.log(state.filteredmovies);
      },
      handleReviewClick: (state, action)=>{
        console.log(state.reviewflag, 1);
        state.reviewflag = true;
        state.reviewid = action.payload.id;
        state.reviewname = action.payload.name;
        console.log(state.reviewflag, 2);
      },
      backClick: (state, action) =>{
        console.log(state.reviewflag, 3);
        state.reviewflag = false;
        console.log(state.reviewflag, 4);
      },
      changeflag:(state, action) =>{
        state.filter = false;
        state.search = false;
      }
          
          
          
    },
    extraReducers: (builder) => {
        builder
          .addCase(addMovieAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(addMovieAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.movies.push(action.payload.data);
            console.log(action.payload.data);
          })
          .addCase(addMovieAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(addReviewAsync.pending, (state) => {
            state.rstatus = 'loading';
          })
          .addCase(addReviewAsync.fulfilled, (state, action) => {
            state.rstatus = 'succeeded';
            state.reviewflag = false;
            state.reviews.push(action.payload);
            
            console.log(action.payload, "payload");
            console.log(state.reviewflag, "second");
          })
          .addCase(addReviewAsync.rejected, (state, action) => {
            state.rstatus = 'failed';
            state.rerror = action.error.message;
          })
          .addCase(getItems.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getItems.fulfilled, (state, action) => {
            // console.log(action);
            console.log("slice,", action.payload);
            state.isLoading = false;
            state.movies = action.payload;
          })
          .addCase(getItems.rejected, (state, action) => {
            console.log(action);
            state.isLoading = false;
          });
      },
})
export {addMovieAsync, addReviewAsync, getItems};
export const {changeflag,  postedMovie, searchMovie, filterByGenre, handleReviewClick, backClick} = moviesSlice.actions;
export default moviesSlice.reducer;