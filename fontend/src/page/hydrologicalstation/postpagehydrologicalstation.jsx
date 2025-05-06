import React, { useState} from 'react';
import { useDispatch} from 'react-redux';
import { addhydrologicalstation ,gethydrologicalstation} from "../../redux/slice/hydrologicalstation";
import { useNavigate } from 'react-router-dom';

function Postpagehydrologicalstation() {
    const [formData, setFormData] = useState({
        name: '',
        water_flow: '',
        water_level: '',
        longitude: '',
        latitude: '',
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
                               dispatch(addhydrologicalstation(formData));
                               dispatch(gethydrologicalstation(1)); 
                               navigate(`/admin/gethydrologicalstation`);
                             };
  return (
    <div>
       <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>ADD HYDROLOGICAL STATION</h2>
      <div style={{ marginTop: '20px' }} className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
    
          onChange={handleChange}
        />

        <label htmlFor="water_flow">Water flow</label>
        <input
          type="text"
          className="form-control"
          name="water_flow"
  
          onChange={handleChange}
        />

        <label htmlFor="water_level">Water level</label>
        <input
          type="text"
          className="form-control"
          name="water_level"
       
          onChange={handleChange}
        />

        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          className="form-control"
          name="longitude"
  
          onChange={handleChange}
        />

        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          className="form-control"
          name="latitude"
      
          onChange={handleChange}
        />
      </div>

      <button style={{ marginTop: '10px' }} type="submit" className="btn btn-success">
        Add
      </button>
    </form>
    </div>
  );
}

export default Postpagehydrologicalstation;
