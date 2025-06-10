import React from "react";
import Find from "../page/findpage/Find";
import Info from "../page/infopage/Info";
import  Getcountry from "../page/countrypage/Pagegetcountry"
import Addcountry from"../page/countrypage/Pagepostcountry"
import Updatecountry from "../page/countrypage/Pageupdatecountry"
import GetHydroelectrictPlant from "../page/hydroelectricplant/pagegethydroelectricplant"
import AddHydroelectrictPlant from "../page/hydroelectricplant/pageposthyrdroelectricplant"
import UpdateHydroelectrictPlant from "../page/hydroelectricplant/pageupdatehydroelectricplant"


import GetDistrict from "../page/district/getpagedistrict"
import AddDistrict from "../page/district/postpagedistrict"
import UpdateDistrict from "../page/district/updatedistrict"
import Login from "../page/login/Login"
import Register from "../page/register/Register";
import Loginadmin from "../page/loginadmin/Loginadmin"
import Registeradmin from "../page/registeradmin/Registeradmin"
import GetLake from "../page/lake/getlake"
import AddLake from "../page/lake/postlake"
import UpdateLake from "../page/lake/updatelake"

import GetRiver from "../page/river/getpageriver"
import AddRiver  from "../page/river/postpageriver"
import UpdateRiver from "../page/river/updatepageriver"

import GetHydroLogicalStation from "../page/hydrologicalstation/getpagehydrologicalstation"
import AddHydroLogicalStation  from "../page/hydrologicalstation/postpagehydrologicalstation"
import UpdateHydroLogicalStation from "../page/hydrologicalstation/updatepagehydrologicalstation"

import User from "../page/userpage/User"
import Admin from "../page/adminpage/Admin"
import { BrowserRouter, Route, Routes } from "react-router-dom";
function Router() {
    return(

     <BrowserRouter>
     

     
     <Routes>

<Route path="/" element={<User />}>
  <Route index element={<Find />} />
  <Route path="info/:id" element={<Info />} 
  
  
  />
</Route>


<Route path="/admin" element={<Admin />}>
  <Route index element={<Getcountry />} />
  <Route path="addprovince" element={<Addcountry />}/>
  <Route path="updateprovince/:id" element={<Updatecountry />} />

  <Route path="gethydroelectricplant" element={<GetHydroelectrictPlant/>} />
  <Route path="addhydroelectricplant" element={<AddHydroelectrictPlant />}/>
  <Route path="updatehydroelectricplant/:id" element={<UpdateHydroelectrictPlant/>} />

  <Route path="getdistrict/:adm1_vi/:adm1_en" element={<GetDistrict/>} />
  <Route path="adddistrict/:adm1_vi/:adm1_en" element={<AddDistrict />}/>
  <Route path="updatedistrict/:adm1_vi/:adm1_en/:id" element={<UpdateDistrict/>} />

  <Route path="getlake" element={<GetLake/>} />
  <Route path="addlake" element={<AddLake />}/>
  <Route path="updatelake/:id" element={<UpdateLake/>} />

  <Route path="getRiver" element={<GetRiver/>} />
  <Route path="addRiver" element={<AddRiver />}/>
  <Route path="updateRiver/:id" element={<UpdateRiver/>} />

  <Route path="gethydrologicalstation" element={<GetHydroLogicalStation/>} />
  <Route path="addhydrologicalstation" element={<AddHydroLogicalStation/>}/>
  <Route path="updatehydrologicalstation/:id" element={<UpdateHydroLogicalStation/>} />
</Route>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
 
  <Route path="/loginadmin" element={<Loginadmin />} />
  <Route path="/registeradmin" element={<Registeradmin />} />
     </Routes>

     
     </BrowserRouter>
    )
}
export default Router;