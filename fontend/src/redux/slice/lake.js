import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/Index';

export const getlake = createAsyncThunk(
  'admin/getlake',  
  async (page = 1) => {
    const data = await api.getlake(page); 
    return data;
  }
);

export const addlake = createAsyncThunk(
  'lake/addLake',
  async (data) => {
    try {
      await api.addlake(data);
    } catch (error) {
      console.log(error);
    }
  }
);


export const getaddlake = createAsyncThunk(
  'lake/getAddLake',
  async () => {
    try {
      const data = await api.getaddlake();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);


export const getupdatelake = createAsyncThunk(
  'lake/getupdatelake', 
  async (id) => {
    const data = await api.getupdatelake(id); 
    return data; 
  }
);

export const updatelake = createAsyncThunk(
  'lake/update',
  async ({ data, id }) => {
    try {
      await api.updatelake(data, id);
    } catch (error) {
      console.log(error);
    }
  }
);


export const deletelake = createAsyncThunk(
  'lake/deletelake', 
  async (id) => {
    try {
      await api.deletelake(id); 
    } catch (err) {
      console.log(err);
    }
  }
);

// GET danh sách quận/huyện theo tỉnh
export const getdistrict = createAsyncThunk(
  'admin/getdistrict', 
  async (adm1_en) => {
    try {
      const data = await api.getapidistrict(adm1_en); 
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Slice
const lakeSlice = createSlice({
  name: 'lake',
  initialState: {
    lakedata:[],
    hydroelectrictplantdata: [],
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
      .addCase(getlake.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getlake.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lakedata= action.payload.items; 
        state.currentPage = action.payload.currentPage;  
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getlake.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(addlake.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addlake.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addlake.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

    
      .addCase(getaddlake.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getaddlake.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hydroelectrictplantdata = action.payload.hydroelectrictplant;
        
      })
      .addCase(getaddlake.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

     
      .addCase(getupdatelake.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getupdatelake.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.country;
        state.hydroelectrictplantdata = action.payload.hydroelectrictplant;
      })
      .addCase(getupdatelake.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(updatelake.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatelake.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updatelake.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

 
      .addCase(deletelake.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletelake.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deletelake.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

   
  },
});

export default lakeSlice.reducer;
