import style from "./header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {   
  setLocation,
  setRiver,
  setFilterRiver,
  setFilterProvince,
  setCheckFind,
  setCheckFilter
} from '../../redux/slice/filter'
function Header() {  
  const [geojsonprovince, setGeojsonprovince] = useState([]);
  const [geojsonriver, setGeojsonriver] = useState([]);
  const { checkFilter} = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:3000/admin/filter') 
    .then(response => response.json())       
    .then(data => {

      setGeojsonprovince(data.geojsonprovince || []);
      setGeojsonriver(data.geojsonriver || []);
    })
    .catch(error => {
      console.error('Có lỗi khi lấy dữ liệu:', error);
    });
  }, [])
  const handleClickSetProvince = (feature) => {
 dispatch(setLocation(feature.properties.adm1_en));  
 dispatch(setFilterRiver(false));
 dispatch(setFilterProvince(true));
   setCheck(prev => !prev)
  };

  const handleClickSetRiver = (feature) => {
 dispatch(setRiver(feature.properties.name));
 dispatch(setFilterRiver(true));
 dispatch(setFilterProvince(false));
    setCheck(prev => !prev)
    
  };
  const handleClick= () => {
 dispatch(setCheckFind(false));
 dispatch(setCheckFilter(true));
 setCheck(prev => !prev)
   
  };
  const [check, setCheck] = useState(false); 
    return (
      <div className={style.footerContainer} > 
      <div className={style.logoContainer}> </div>
      <div className={style.container}>
      <div className={style.authenticationContainer}>
      <p className={style.login}>Đăng nhập</p>
      <p className={style.register}>Đăng ký</p>
       </div>
       <div className={style.divRegion}>

         
         <div onClick={ handleClick} className={style.regionContainer}>

         <FontAwesomeIcon className={style.icon} icon={faMapLocation} />
         <p className={style.pregion}>Địa chỉ</p>
         </div>
       
       
       </div>
      </div>
      {check && checkFilter && (
      <div className={style.selectRegion}>

      <p style={{ color: '#00897B', fontWeight: 'bold', fontSize: '18px' }}>
  CHỌN ĐỊA ĐIỂM
</p>
<div style={{
  width: '100%',
  height: '1px',
  backgroundColor: 'gray',
  margin: '10px 0',
 
}}></div>
      <div className={style.selectRegionContainer}>

      {geojsonprovince.features.map((feature) =>(
        <span onClick={()=>handleClickSetProvince(feature)} className={style.buttonRgion}>{feature.properties.adm1_vi}</span>
      ))}
     
     
     </div>
     <p style={{ color: '#00897B', fontWeight: 'bold', fontSize: '18px' }}>
  CHỌN SÔNG
</p>
<div style={{
  width: '100%',
  height: '1px',
  backgroundColor: 'gray',
  margin: '10px 0',
 
}}></div>

<div className={style.selectRegionContainer}>
{geojsonriver.features.map((feature) =>(
        <span onClick={()=>handleClickSetRiver(feature)} className={style.buttonRgion}>{feature.properties.name}</span>
      ))}
     </div>

      </div>
      )}

       </div>
     
     
    );
  }
  export default Header