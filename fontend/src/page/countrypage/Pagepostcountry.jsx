import React, { useState} from 'react';
import { useDispatch} from 'react-redux';
import { addProvince } from "../../redux/slice/province";
import { useNavigate } from 'react-router-dom';



function Pagegetcountry() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        adm1_en: '',
        adm1_vn: '',
        geom: '',
      });
    
      const dispatch = useDispatch();
    
      const handleChange = (e) => {
        setFormData({ 
          ...formData, 
          [e.target.name]: e.target.value 
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProvince(formData));
        navigate('/admin'); // Chuyển hướng ngay
      };
    
      return (
        <div className="container mt-4">
          <h2>ADD PROVINCE</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Province (EN):</label>
              <input 
                type="text" 
                className="form-control" 
                name="adm1_en" 
                onChange={handleChange}
              />
              <label>Province (VI):</label>
              <input 
                type="text" 
                className="form-control" 
                name="adm1_vn" 
                onChange={handleChange}
              />
              <label>Geometry:</label>
              <input 
                type="text" 
                className="form-control" 
                name="geom" 
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success mt-3">Add</button>
          </form>
        </div>
      );
}

export default Pagegetcountry;