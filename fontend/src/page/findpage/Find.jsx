import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import style from "./find.module.css";
import Card from "../../components/Cards/Card";
import { useState} from "react";
function Find() {
 const [keyword, setKeyword] = useState('');
 const [results, setResults] = useState([]);
 

  const handleKeyChange= async(e)=>{
    e.preventDefault(); 
     setKeyword(e.target.value)
    fetch('http://localhost:3000/admin/findcard', {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ keyword: keyword })  
    })
      .then(res => res.json())  
      .then(data => {
   
        const features = data.data || [];
        setResults(features);
     
  
     
      })
      .catch(error => {
        console.error('Lỗi khi tìm kiếm:', error);
      });
  
     
  
  
  
  }


  return (
    <div class={style.findContainer}>
        <div className={style.tilteContainer}>
        <FontAwesomeIcon className={style.icon} icon={faMagnifyingGlass} />
        <p className={style.tilte}>TRA CỨU</p>
        </div>
      <div className={style.inputContainer}>

        <input className={style.input} type="text"   value={keyword} placeholder="Tìm trạm thuỷ điện"     onChange={handleKeyChange} />
      </div>
      <div className={style.listContainer}>

      {results.map((feature, index) => {

        return (
          
            <Card   feature={feature} />
       
        );
      })}
  
      </div>
    </div>
  );
}
export default Find;