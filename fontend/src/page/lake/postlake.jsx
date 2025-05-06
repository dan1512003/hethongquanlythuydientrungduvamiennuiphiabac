import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
getaddlake,addlake,getlake
} from '../../redux/slice/lake';

const Postlake = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { hydroelectrictplantdata } = useSelector((state) => state.lake);
  
    const [formData, setFormData] = useState({
      name: '',
      dead_water_level: '',
      normal_water_level: '',
      longitude: '',
      latitude: '',
      geom: '',
      hydroelectrictplant: ''
    });
    useEffect(() => {
        dispatch(getaddlake());
      }, [dispatch]);
    
        const handleChange = (e) => {
                  setFormData({ 
                    ...formData, 
                    [e.target.name]: e.target.value 
                  });
                };
              
                const handleSubmit = (e) => {
                  e.preventDefault();
                  dispatch(addlake(formData));
                  dispatch(getlake(1)); 
                  navigate(`/admin/getlake`);
                };
    
  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="container mt-3">
      <h2>ADD LAKE</h2>

      <label>Name:</label>
      <input name="name" className="form-control my-2" onChange={handleChange} required />

      <label>Dead Water Level:</label>
      <input name="dead_water_level" className="form-control my-2" onChange={handleChange} required />

      <label>Normal Water Level:</label>
      <input name="normal_water_level" className="form-control my-2" onChange={handleChange} required />

      <label>Longitude:</label>
      <input name="longitude" className="form-control my-2" onChange={handleChange} required />

      <label>Latitude:</label>
      <input name="latitude" className="form-control my-2" onChange={handleChange} required />

      <label>Geometry:</label>
      <input name="geom" className="form-control my-2" onChange={handleChange} required />

      <label>Hydroelectric Plant:</label>
      <select name="hydroelectrictplant" className="form-control my-2" onChange={handleChange} required>
        <option value="">-- Select HydroElectrict Plant --</option>
        {hydroelectrictplantdata.map((plant, idx) => (
          <option key={idx} value={plant.properties.name}>
            {plant.properties.name}
          </option>
        ))}
      </select>

      <button type="submit" className="btn btn-success mt-2">Add</button>
    </form>
    </div>
  )
}

export default Postlake
