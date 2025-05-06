import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/Index'; 


export const getProvinces = createAsyncThunk(
  'admin/getProvinces', 
  async (page = 1) => {
    const data = await api.getprovince(page); 
    return data; 
  }
);

export const addProvince = createAsyncThunk(
  'province/addProvince',
  async (data) => {
    try {
     await api.addprovince(data);
 
    } catch (error) {
     console.log(error)
    }
  }
);

export const getupdateProvinces = createAsyncThunk(
  'admin/getupdateProvinces', 
  async (id) => {
    const data = await api.getupdateprovince(id); 
    return data; 
  }
);
export const updateProvinces = createAsyncThunk(
  'province/updateProvince',
  async ({ data, id }) => {
    try {
     await api.updateprovince(data,id);
 
    } catch (error) {
     console.log(error)
    }
  }
);

export const deleteProvinces = createAsyncThunk(
  'admin/deleteProvinces', 
  async (id) => {
    try{
      await api.deleteprovince(id); 
    }catch(err){
      console.log(err)
    }
   

  }
);

const provinceSlice = createSlice({
  name: 'province',
  initialState: {
    provinces: [],
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
     
      .addCase(getProvinces.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.provinces = action.payload.items;  
        state.currentPage = action.payload.currentPage;  
        state.totalPages = action.payload.totalPages;  
        state.totalCount = action.payload.totalCount;  
      })
      
      .addCase(getProvinces.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })

      .addCase(addProvince.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(addProvince.fulfilled, (state) => {
        state.status = 'succeeded'; 
  
      })
      
      .addCase(addProvince.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })

      .addCase(getupdateProvinces.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(getupdateProvinces.fulfilled, (state,action) => {
        state.status = 'succeeded'; 
        state.data = action.payload.country;  
      })
      
      .addCase(getupdateProvinces.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })
      .addCase(updateProvinces.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(updateProvinces.fulfilled, (state) => {
        state.status = 'succeeded'; 
  
      })
      
      .addCase(updateProvinces.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })
      .addCase(deleteProvinces.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(deleteProvinces.fulfilled, (state) => {
        state.status = 'succeeded'; 
  
      })
      
      .addCase(deleteProvinces.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      });


      
  },
});

export default provinceSlice.reducer;
