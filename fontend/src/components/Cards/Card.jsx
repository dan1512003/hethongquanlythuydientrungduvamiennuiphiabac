import React from 'react';
import style from './card.module.css'; 
import { useNavigate } from 'react-router-dom';
import thuyddiendongchay from '../../assets/thuydiendongchay.png'
import thuydientichnang from '../../assets/thuydientichnang.png'
function Card(feature) {
  const navigate = useNavigate();
  console.log('feature:', feature);
  const { gid, name, province,  river, capacity,build_state ,type} = feature.feature;
  return (
    <div
      className={style.card}
      onClick={() => navigate(`/info/${gid}`)} 
 
    >
      <div className={style.imageContainer}>

      <img src={type === 'Run-of-River Hydro' ? thuyddiendongchay : thuydientichnang} alt="Loại thủy điện" />
      </div>

      <div className={style.cardContainer}>
        <div className={style.headerCard}>
          <b className={style.Name}>{name}</b>
        </div>
        <div className={style.mainCard}>
          <p className={style.address}>{river} - {province}</p>
        </div>
        <div className={style.footerCard}>
          <p>{build_state}</p>
          <p>{capacity}MW</p>
        </div>
      </div>
    </div>
  );
}
export default Card