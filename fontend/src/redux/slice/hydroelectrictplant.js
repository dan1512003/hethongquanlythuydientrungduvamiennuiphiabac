import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/Index';

export const gethydroelectricplant = createAsyncThunk(
  'admin/gethydroelectricplant',  
  async (page = 1) => {
    const data = await api.gethydroelectricplant(page); 
    return data;
  }
);
// POST thêm thủy điện
export const addHydroElectricplant = createAsyncThunk(
  'province/addProvince',
  async (data) => {
    try {
      await api.addhydroelectrictplant(data);
    } catch (error) {
      console.log(error);
    }
  }
);

// GET dữ liệu form để thêm thủy điện (đổi typePrefix để tránh lỗi trùng)
export const getaddHydroElectricplant = createAsyncThunk(
  'province/getAddProvinceFormData',
  async () => {
    try {
      const data = await api.getaddhydroelectrictplant();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// GET dữ liệu để cập nhật 1 thủy điện
export const getUpdateHydroElectricPlant = createAsyncThunk(
  'admin/getupdateProvinces', 
  async (id) => {
    const data = await api.getupdatehydroelectrictplant(id); 
    return data; 
  }
);

export const updateHydroElectricPlant = createAsyncThunk(
  'hydroelectricPlant/update',
  async ({ data, id }) => {
    try {
      await api.updatehydroelectrictplant(data, id);
    } catch (error) {
      console.log(error);
    }
  }
);

// DELETE thủy điện
export const deletehydroelectricplant = createAsyncThunk(
  'admin/deleteProvinces', 
  async (id) => {
    try {
      await api.deletehydroelectrictplant(id); 
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
const hydroelectrictplantSlice = createSlice({
  name: 'hydroelectrictplant',
  initialState: {
    hydroelectrictplantdata: [],
    data: [],
    district: [],
    river: [],
    province: [],
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
      .addCase(gethydroelectricplant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(gethydroelectricplant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hydroelectrictplantdata = action.payload.items; 
        state.currentPage = action.payload.currentPage;  
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(gethydroelectricplant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ADD
      .addCase(addHydroElectricplant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addHydroElectricplant.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addHydroElectricplant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // GET form data để add
      .addCase(getaddHydroElectricplant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getaddHydroElectricplant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.province = action.payload.country;
        state.river = action.payload.river;
      })
      .addCase(getaddHydroElectricplant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // GET data để update
      .addCase(getUpdateHydroElectricPlant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUpdateHydroElectricPlant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.province = action.payload.country;
        state.river = action.payload.river;
      })
      .addCase(getUpdateHydroElectricPlant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateHydroElectricPlant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateHydroElectricPlant.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateHydroElectricPlant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deletehydroelectricplant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletehydroelectricplant.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deletehydroelectricplant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // GET district
      .addCase(getdistrict.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getdistrict.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.district = action.payload.data;
      })
      .addCase(getdistrict.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default hydroelectrictplantSlice.reducer;
