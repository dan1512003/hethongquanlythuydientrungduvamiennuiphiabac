import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../slice/filter';
import provinceReducer from "../slice/province";
import hydroelectrictplantReducer from "../slice/hydroelectrictplant";
import hydrologicalstationReducer from "../slice/hydrologicalstation"
import districtReducer from "../slice/district"
import riverReducer from "../slice/river"
import lakeReducer from "../slice/lake"
import authReducer from "../slice/auth"
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    province: provinceReducer,
    hydroelectrictplant: hydroelectrictplantReducer,
    district:districtReducer,
    lake:lakeReducer,
    river: riverReducer,
    hydrologicalstation:hydrologicalstationReducer,
    auth:authReducer
  }
});