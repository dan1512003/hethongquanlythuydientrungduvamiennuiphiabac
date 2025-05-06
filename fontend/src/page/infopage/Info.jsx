import React, {  useEffect } from 'react';
import style from "./info.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import { getUpdateHydroElectricPlant} from '../../redux/slice/hydroelectrictplant';
import { useNavigate } from 'react-router-dom';
function Info() {
  const dispatch = useDispatch();
 const navigate = useNavigate();
    const { data} = useSelector((state) => state.hydroelectrictplant);
    const { id } = useParams();
     useEffect(() => {
        dispatch(getUpdateHydroElectricPlant(id));
      }, [dispatch, id]);
  return (
    <div className={style.container}>

          <div className={style.tilteContainer}>
            
              <div  onClick={() => navigate(`/`)}  className={style.tiltefind}>TRA CỨU</div>
              <div className={style.tilteinfo}>THÔNG TIN</div>
              </div>
     <div className={style.divImage}>
     <img src={`http://localhost:3000/upload/${data.image}`} alt="Ảnh mẫu" />
     </div>
     <div className={style.divpoint}>
<div className={style.coordinates}> {data.latitude}, {data.longitude}</div>
<div className={style.adress}>{data.river}-{data.province},{data.district}</div>

     </div>
     <div className={style.infodetail}>
      <p className={style.tiltleInfo}> Thông tin chi tiết {data.name}</p>
<div className={style.info}>
  <p>Investor: {data.investor}</p>
  <p>Type:{data.type}</p>
  <p>Capacity:{data.capacity} MW</p>
<p>Generating_units: {data.generating_units}</p>
<p>Electricity_output: {data.electricity_output}kWh/year</p>
<p>Build state:{data.build_state}</p>
</div>
<div className={style.divdesciption}>
<p className={style.tiltleDes}>Description</p>
<p>
{data.description}

</p>

</div>
     </div>
    </div>
    
  );
}
export default Info;