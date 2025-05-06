import style from "./headeradmin.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp,faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { useState} from "react";
const Headeradmin = () => {
    const [up,setUp] =useState(false)
 function checkup(){

    setUp(prev=>!prev)
 }
    return(
        <div className="row">
        <div id={style.Header} className="col-12">
          <div id={style.iconHome}>
            <h5>WELCOME TO WEBGIS</h5> 
          </div>
    
          <div id={style.user}>
            <h5>Dan1512003</h5>
    
            <div className={style.buttonup}>
          
                <FontAwesomeIcon className={style.icon} icon={ up?faAngleDown:faAngleUp } onClick={()=>checkup()} />
      
       
           {up&&(<nav className={style.navSigninAndSignout}>
                <ul className={style.ulSigninAndSignout}>
                  <li className={style.liSigninAndSignout}>
                    <a href="http://localhost:3000/analysis">Going to frontend</a>
                  </li>
                  <li className={style.liSigninAndSignout}>
                    <a href="/todos/signin">Sign out</a>
                  </li>
                </ul>
              </nav>)}
    
              


            </div>
          </div>
        </div>
      </div>
    )
};

export default Headeradmin;