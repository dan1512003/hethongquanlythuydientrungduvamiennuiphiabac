import { Outlet } from "react-router-dom";
import Header from "../../path/headeradmin/Headeradmin"
import Navbar from "../../path/navadmin/Navadmin"
import style from "./admin.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
const Admin = () => {

    return(

        <div   className="container-fluid">
     <Header/>
    <div  className={style.main}>
    <div  id={style.mainContainer} className="row">

<div className="col-3">
<Navbar/>

</div>
<div id={style.Main}  className="col-9">
   <div className="row"  >
   <div  className="col-12">
      <Outlet/>
</div>
</div>
</div>



    </div>
   </div>
</div>
    )
}
  


export default Admin;