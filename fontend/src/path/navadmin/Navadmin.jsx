import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./navadmin.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse} from '@fortawesome/free-solid-svg-icons';


const Navadmin= () => {

return(<div  id={style.navbar} className="row">
    <div id={style.iconDashBoard} className="col-12">
    <FontAwesomeIcon icon={faHouse} /> <h8>Dashboard</h8> 
    </div>
<div id={style.navCate} className="col-12">
    <nav >
        <ul class={style.ulCate}>
            
            <li className={style.liCate} ><a className={style.aCate} href="/" >User</a></li>
            <li className={style.liCate}><a className={style.aCate} href="/admin/" >Province</a></li>
            <li  className={style.liCate}><a className={style.aCate} href="/admin/getRiver" >River</a></li>
            <li  className={style.liCate}><a className={style.aCate} href="/admin/getlake" >Lake</a></li>
            <li   className={style.liCate}><a className={style.aCate}  href="/admin/gethydrologicalstation">HydroeLogical Station</a></li>
            <li   className={style.liCate}><a className={style.aCate}  href="/admin/gethydroelectricplant">Hydroelectric Plant</a></li>
        
        </ul>
    </nav>
</div>
        
       


</div>)

};

export default Navadmin;