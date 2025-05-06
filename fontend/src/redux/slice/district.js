import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/Index';

export const getalldistrict = createAsyncThunk(
  'admin/getalldistrict',  
  async ({page = 1,adm1_vi,adm1_en}) => {
    const data = await api.getdistrict(page,adm1_vi,adm1_en); 
    return data;
  }
);

export const adddistrict = createAsyncThunk(
  'district/addDistrict',
  async (data) => {
    try {
      await api.adddistrict(data);
    } catch (error) {
      console.log(error);
    }
  }
);




export const getupdatedistrict = createAsyncThunk(
  'district/getupdatedistrict', 
  async (id,adm1_vi,adm1_en) => {
    const data = await api.getupdatedistrict(id); 
    return data; 
  }
);

export const updatedistrict= createAsyncThunk(
  'district/update',
  async ({ data, id }) => {
    try {
      await api.updatedistrict(data, id);
    } catch (error) {
      console.log(error);
    }
  }
);


export const deletedistrict= createAsyncThunk(
  'district/deletedistrict', 
  async (id) => {
    try {
      await api.deletedistrict(id); 
    } catch (err) {
      console.log(err);
    }
  }
);



// Slice
const districtSlice = createSlice({
  name: 'district',
  initialState: {
    districtdata: [],
    data: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET list
      .addCase(getalldistrict.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getalldistrict.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.districtdata= action.payload.items; 
        state.currentPage = action.payload.currentPage;  
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getalldistrict.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

   
      .addCase(adddistrict.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adddistrict.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(adddistrict.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  

      
      .addCase(getupdatedistrict.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getupdatedistrict.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.country;
      })
      .addCase(getupdatedistrict.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

   
      .addCase(updatedistrict.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatedistrict.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updatedistrict.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  
      .addCase(deletedistrict.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletedistrict.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deletedistrict.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      
  },
});

export default districtSlice.reducer;
