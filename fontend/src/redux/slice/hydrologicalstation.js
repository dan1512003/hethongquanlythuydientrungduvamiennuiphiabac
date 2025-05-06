import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/Index'; 


export const gethydrologicalstation = createAsyncThunk(
  'admin/gethydrologicalstation', 
  async (page = 1) => {
    const data = await api.gethydrologicalstation(page); 
    return data; 
  }
);

export const addhydrologicalstation = createAsyncThunk(
  'hydrologicalstation/addhydrologicalstation',
  async (data) => {
    try {
     await api.addhydrologicalstation(data);
 
    } catch (error) {
     console.log(error)
    }
  }
);

export const getupdatehydrologicalstation = createAsyncThunk(
  'hydrologicalstation/getupdatehydrologicalstation', 
  async (id) => {
    const data = await api.getupdatehydrologicalstation(id); 
    return data; 
  }
);
export const updatehydrologicalstation = createAsyncThunk(
  'hydrologicalstation/updatehydrologicalstation',
  async ({ data, id }) => {
    try {
     await api.updatehydrologicalstation(data,id);
 
    } catch (error) {
     console.log(error)
    }
  }
);

export const deletehydrologicalstation= createAsyncThunk(
  'hydrologicalstation/deletehydrologicalstation', 
  async (id) => {
    try{
      await api.deletehydrologicalstation(id); 
    }catch(err){
      console.log(err)
    }
   

  }
);

const hydrologicalstationSlice = createSlice({
  name: 'hydrologicalstation',
  initialState: {
    hydrologicalstationdata: [],
    data:[],  
    status: 'idle',  
    error: null,    
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(gethydrologicalstation.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(gethydrologicalstation.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.hydrologicalstationdata = action.payload.items;  
        state.currentPage = action.payload.currentPage;  
        state.totalPages = action.payload.totalPages;  
        state.totalCount = action.payload.totalCount;  
      })
      
      .addCase(gethydrologicalstation.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })

      .addCase(addhydrologicalstation.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(addhydrologicalstation.fulfilled, (state) => {
        state.status = 'succeeded'; 
  
      })
      
      .addCase(addhydrologicalstation.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })

      .addCase(getupdatehydrologicalstation.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(getupdatehydrologicalstation.fulfilled, (state,action) => {
        state.status = 'succeeded'; 
        state.data = action.payload.country;  
      })
      
      .addCase(getupdatehydrologicalstation.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })
      .addCase(updatehydrologicalstation.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(updatehydrologicalstation.fulfilled, (state) => {
        state.status = 'succeeded'; 
  
      })
      
      .addCase(updatehydrologicalstation.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })
      .addCase(deletehydrologicalstation.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(deletehydrologicalstation.fulfilled, (state) => {
        state.status = 'succeeded'; 
  
      })
      
      .addCase(deletehydrologicalstation.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      });


      
  },
});

export default hydrologicalstationSlice.reducer;
