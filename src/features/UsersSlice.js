import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import bcrypt from 'bcryptjs';
const initialState = {
  users: [],
  status: 'idle',
  error: null,
  profile:{}
};
const apiUrl = process.env.REACT_APP_API_URL;
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

 const addUserAsync = createAsyncThunk('users/addUser', async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  const modifiedUserData = {
    ...userData,
    password: hashedPassword,
  };
  const response = await axios.post(`${apiUrl}/users`, modifiedUserData, { 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.data;
  return data;
});


// const addUserAsync = createAsyncThunk('users/addUser', async (userData) => {
//     // userData.password= hpass;
//     // console.log(userData);
//   const response = await axios.post('http://localhost:8000/users', userData, { 
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();
//   return data;
// });


const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addTask: (state, action) => {
        state.users.push(action.payload);
    },
    addProfile: (state, action)=>{
      state.profile = action.payload;
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
        console.log(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export { addUserAsync };
export const {addTask, addProfile} = usersSlice.actions;
export default usersSlice.reducer;
