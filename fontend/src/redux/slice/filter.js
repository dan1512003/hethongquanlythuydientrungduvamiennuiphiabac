import {  createSlice } from "@reduxjs/toolkit"


const filterSlice = createSlice({
    name: 'counter',
    initialState: { 
        location: '', 
        river: '', 
        filterRiver: false, 
        filterProvincer: false, 
        checkFind: false, 
        checkFilter: false 
    }, 
    reducers: {
          setLocation(state, action) {
            state.location = action.payload;
          },
     
          setRiver(state, action) {
            state.river = action.payload;
          },
      
          setFilterRiver(state, action) {
            state.filterRiver = action.payload;
          },
        
          setFilterProvince(state, action) {
            state.filterProvincer = action.payload;
          },
        
          setCheckFind(state,action) {
            state.checkFind = action.payload;
          },
       
          setCheckFilter(state, action) {
            state.checkFilter = action.payload;
          }
    }
  })
  export const {
    setLocation,
    setRiver,
    setFilterRiver,
    setFilterProvince,
    setCheckFind,
    setCheckFilter
  } = filterSlice.actions

  export default filterSlice.reducer