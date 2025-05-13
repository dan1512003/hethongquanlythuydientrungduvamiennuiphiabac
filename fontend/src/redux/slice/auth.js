import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/Index'; 


export const login = createAsyncThunk('auth/login', async (data,{rejectWithValue}) => {
try {
   const res = await api.login(data); 
   localStorage.setItem('token', res.token); 
      return res.data.token;
} catch (err) {
    if (err.response && err.response.data) {
        return rejectWithValue(err.response.data); 
      } 
}
   



});



export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.register(data);
      return res.data; 
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data); 
      } 
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '',
    registerStatus: 'idle',
    loginStatus: 'idle',
    error: null,
  },

  extraReducers: (builder) => {
    builder
      
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.error = action.payload;
      })

   
      .addCase(register.pending, (state) => {
        state.registerStatus = 'loading';
      })
      .addCase(register.fulfilled, (state,action) => {
        state.registerStatus = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.error = action.payload;
      });
  },
});


export default authSlice.reducer;