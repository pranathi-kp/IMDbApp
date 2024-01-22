import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  islogin:false,
  isAdmin:false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action)=>{
      state.isOpen = true;
    },
    closeModal: (state, action)=>{
      state.isOpen = false;
    },
    loggedIn: (state, action)=>{
        state.islogin = true;
    },
    logOut: (state, action)=>{
        state.islogin = false;
        state.isAdmin = false;
    },
    admin: (state, action)=>{
      state.isAdmin = true;
  },
  },
});

export const { openModal, closeModal, loggedIn, logOut,admin } = modalSlice.actions;

export default modalSlice.reducer;
