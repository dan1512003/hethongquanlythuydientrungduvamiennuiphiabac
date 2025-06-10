import { createSlice } from "@reduxjs/toolkit";

const findhydroelectricplantSlice = createSlice({
    name: 'find',
    initialState: { 
        hydroelectricplant: {}, 
        findactive: false,  
    }, 
    reducers: {
        sethydroelectrict(state, action) {
            state.hydroelectricplant = action.payload;
        },
        setfindactive(state, action) {
            state.findactive = action.payload;
        }       
    }
});

export const { sethydroelectrict, setfindactive } = findhydroelectricplantSlice.actions;

export default findhydroelectricplantSlice.reducer;