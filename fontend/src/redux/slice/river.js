import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/Index'; 


export const getriver = createAsyncThunk(
  'admin/getRiver', 
  async (page = 1) => {
    const data = await api.getriver(page); 
    return data; 
  }
);

export const addriver = createAsyncThunk(
  'river/addRiver',
  async (data) => {
    try {
     await api.addriver(data);
 
    } catch (error) {
     console.log(error)
    }
  }
);

export const getupdateriver = createAsyncThunk(
  'river/getupdateRiver', 
  async (id) => {
    const data = await api.getupdateriver(id); 
    return data; 
  }
);
export const updateriver = createAsyncThunk(
  'river/updateriver',
  async ({ data, id }) => {
    try {
     await api.updateriver(data,id);
 
    } catch (error) {
     console.log(error)
    }
  }
);

export const deleteriver = createAsyncThunk(
  'admin/deleteriver', 
  async (id) => {
    try{
      await api.deleteriver(id); 
    }catch(err){
      console.log(err)
    }
   

  }
);

const riverSlice = createSlice({
  name: 'river',
  initialState: {
    riverdata: [],
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
     
      .addCase(getriver.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(getriver.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.riverdata = action.payload.items;  
        state.currentPage = action.payload.currentPage;  
        state.totalPages = action.payload.totalPages;  
        state.totalCount = action.payload.totalCount;  
      })
      
      .addCase(getriver.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })

      .addCase(addriver.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(addriver.fulfilled, (state) => {
        state.status = 'succeeded'; 
  
      })
      
      .addCase(addriver.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })

      .addCase(getupdateriver.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(getupdateriver.fulfilled, (state,action) => {
        state.status = 'succeeded'; 
        state.data = action.payload.country;  
      })
      
      .addCase(getupdateriver.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })
      .addCase(updateriver.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(updateriver.fulfilled, (state) => {
        state.status = 'succeeded'; 
  
      })
      
      .addCase(updateriver.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      })
      .addCase(deleteriver.pending, (state) => {
        state.status = 'loading'; 
      })
     
      .addCase(deleteriver.fulfilled, (state) => {
        state.status = 'succeeded'; 
  
      })
      
      .addCase(deleteriver.rejected, (state, action) => {
        state.status = 'failed';  
        state.error = action.error.message;  
      });


      
  },
});

export default riverSlice.reducer;
