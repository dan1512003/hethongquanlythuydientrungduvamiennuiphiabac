import React, { useState} from 'react';
import { useDispatch} from 'react-redux';
import { addriver ,getriver} from "../../redux/slice/river";
import { useNavigate } from 'react-router-dom';

const Postpageriver = () => {
    const [formData, setFormData] = useState({
        name: '',
        geom: '',
      });
        const navigate = useNavigate();
          
            const dispatch = useDispatch();
          
            const handleChange = (e) => {
              setFormData({ 
                ...formData, 
                [e.target.name]: e.target.value 
              });
            };
          
            const handleSubmit = (e) => {
              e.preventDefault();
              dispatch(addriver(formData));
              dispatch(getriver(1)); 
              navigate(`/admin/getRiver`);
            };
  return (
    <div className="container mt-4">
      <h2>ADD RIVER</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            className="form-control" 
            name="name" 
            value={formData.name}
            onChange={handleChange} 
          />

          <label>Geometry:</label>
          <input 
            type="text" 
            className="form-control" 
            name="geom" 
            value={formData.geom}
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">Add</button>
      </form>
    </div>
  );
}

export default Postpageriver;
